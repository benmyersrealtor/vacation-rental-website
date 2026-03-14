#!/usr/bin/env python3
from pathlib import Path
import csv
from datetime import date
from collections import defaultdict

BASE = Path(__file__).resolve().parent
PROPERTY_MASTER = BASE.parent / '2026-vacation-rental-quick-reference-master-internal.csv'
BOOKINGS = BASE / 'data' / 'bookings-current.csv'
OUTPUT = BASE / 'output'


def load_properties():
    with PROPERTY_MASTER.open() as f:
        return {row['name']: row for row in csv.DictReader(f)}


def load_bookings():
    rows = []
    with BOOKINGS.open() as f:
        for row in csv.DictReader(f):
            row['arrival_date'] = date.fromisoformat(row['arrival_date'])
            row['departure_date'] = date.fromisoformat(row['departure_date'])
            rows.append(row)
    return rows


def build_bed_mix(prop):
    bits = []
    for label, key in [('K', 'king'), ('Q', 'queen'), ('F', 'full'), ('T', 'twin'), ('S', 'sleeper')]:
        try:
            value = int(float(prop.get(key, 0) or 0))
        except ValueError:
            value = 0
        if value:
            bits.append(f'{value}{label}')
    return ', '.join(bits) if bits else 'unknown'


def generate():
    OUTPUT.mkdir(parents=True, exist_ok=True)
    props = load_properties()
    bookings = load_bookings()

    turnovers = []
    for booking in sorted(bookings, key=lambda r: (r['property_name'], r['arrival_date'])):
        prop = props.get(booking['property_name'], {})
        future = [b for b in bookings if b['property_name'] == booking['property_name'] and b['arrival_date'] > booking['departure_date']]
        next_arrival = min([b['arrival_date'] for b in future], default=None)
        gap_days = (next_arrival - booking['departure_date']).days if next_arrival else ''
        same_day_turn = 'yes' if next_arrival and gap_days == 0 else 'no'
        priority = 'high' if same_day_turn == 'yes' or (gap_days != '' and gap_days <= 1) else 'normal'
        turnovers.append({
            'turnover_id': f"TURN-{booking['lease_id']}",
            'property_name': booking['property_name'],
            'address': booking['address'],
            'checkout_date': booking['departure_date'].isoformat(),
            'next_arrival_date': next_arrival.isoformat() if next_arrival else '',
            'gap_days': gap_days,
            'same_day_turn': same_day_turn,
            'cleaner': prop.get('cleaner', ''),
            'linens_vendor': prop.get('linens', ''),
            'bedrooms': prop.get('bedrooms', ''),
            'bathrooms': prop.get('bathrooms', ''),
            'bed_mix': build_bed_mix(prop),
            'reservation_type': booking['reservation_type'],
            'owner_reservation': booking['owner_reservation'],
            'priority': priority,
            'cleaning_status': 'pending',
            'linens_status': 'pending',
            'notes': booking['notes'],
        })

    turnover_path = OUTPUT / 'turnovers-current.csv'
    with turnover_path.open('w', newline='') as f:
        writer = csv.DictWriter(f, fieldnames=list(turnovers[0].keys()))
        writer.writeheader()
        writer.writerows(turnovers)

    by_cleaner = defaultdict(list)
    by_linens = defaultdict(list)
    exceptions = {
        'Same-day turns': [],
        'Owner reservations': [],
        'Missing cleaner assignment': [],
        'Missing linens vendor': [],
        'Missing bed mix': [],
        'Changed bookings / manual review': [],
    }

    for turnover in sorted(turnovers, key=lambda r: r['checkout_date']):
        by_cleaner[turnover['cleaner'] or 'UNASSIGNED'].append(turnover)
        by_linens[turnover['linens_vendor'] or 'UNASSIGNED'].append(turnover)
        if turnover['same_day_turn'] == 'yes':
            exceptions['Same-day turns'].append(turnover)
        if turnover['owner_reservation'] == 'yes':
            exceptions['Owner reservations'].append(turnover)
        if not turnover['cleaner']:
            exceptions['Missing cleaner assignment'].append(turnover)
        if not turnover['linens_vendor']:
            exceptions['Missing linens vendor'].append(turnover)
        if turnover['bed_mix'] == 'unknown':
            exceptions['Missing bed mix'].append(turnover)

    week_of = date.today().isoformat()

    cleaner_lines = ['# Cleaner Schedules', '', f'Week of: {week_of}', 'Generated from: data/bookings-current.csv + property master', '', '## Pending review', '- Review same-day turns first', '- Confirm any owner reservations', '- Confirm any new/changed bookings since Monday send']
    for cleaner in sorted(by_cleaner):
        cleaner_lines += ['', f'## {cleaner}']
        for turnover in by_cleaner[cleaner]:
            cleaner_lines.append(f"- {turnover['checkout_date']} — {turnover['property_name']} — {turnover['address']}")
            cleaner_lines.append(f"  - Checkout: {turnover['checkout_date']}")
            cleaner_lines.append(f"  - Next arrival: {turnover['next_arrival_date'] or 'none scheduled'}")
            cleaner_lines.append(f"  - Gap days: {turnover['gap_days'] if turnover['gap_days'] != '' else 'unknown'}")
            cleaner_lines.append(f"  - Pets: {props.get(turnover['property_name'], {}).get('pets', 'unknown')}")
            cleaner_lines.append(f"  - Notes: {turnover['reservation_type']}; owner reservation={turnover['owner_reservation']}")
    (OUTPUT / 'cleaner-schedules.md').write_text('\n'.join(cleaner_lines) + '\n')

    linen_lines = ['# Linen Orders', '', f'Week of: {week_of}', 'Generated from: data/bookings-current.csv + property master', '', '## Pending review', '- Confirm same-day turns', '- Confirm any owner reservations that should be handled differently', '- Confirm bed mix is present for every property']
    for vendor in sorted(by_linens):
        linen_lines += ['', f'## {vendor}']
        for turnover in by_linens[vendor]:
            linen_lines.append(f"- {turnover['checkout_date']} — {turnover['property_name']} — {turnover['address']}")
            linen_lines.append(f"  - Bed mix: {turnover['bed_mix']}")
            linen_lines.append(f"  - Next arrival: {turnover['next_arrival_date'] or 'none scheduled'}")
            linen_lines.append(f"  - Gap days: {turnover['gap_days'] if turnover['gap_days'] != '' else 'unknown'}")
            linen_lines.append(f"  - Notes: {turnover['reservation_type']}; owner reservation={turnover['owner_reservation']}")
    (OUTPUT / 'linen-orders.md').write_text('\n'.join(linen_lines) + '\n')

    exception_lines = ['# Exceptions', '', f'Week of: {week_of}']
    for heading, items in exceptions.items():
        exception_lines += ['', f'## {heading}']
        if not items:
            exception_lines.append('- None')
        else:
            for turnover in items:
                exception_lines.append(f"- {turnover['checkout_date']} — {turnover['property_name']} — {turnover['address']} — {turnover['notes']}")
    (OUTPUT / 'exceptions.md').write_text('\n'.join(exception_lines) + '\n')

    queue_rows = []
    for booking in sorted(bookings, key=lambda r: r['arrival_date']):
        queue_rows.append({'message_id': f"MSG-{booking['lease_id']}-PRE", 'property_name': booking['property_name'], 'guest_name': booking['guest_name'], 'booking_id': booking['booking_id'], 'arrival_date': booking['arrival_date'].isoformat(), 'departure_date': booking['departure_date'].isoformat(), 'message_type': 'pre_arrival', 'send_date': booking['arrival_date'].isoformat(), 'send_channel': 'review', 'status': 'pending', 'template_name': 'pre-arrival-standard', 'notes': 'Set final send timing by source/channel'})
        queue_rows.append({'message_id': f"MSG-{booking['lease_id']}-POST", 'property_name': booking['property_name'], 'guest_name': booking['guest_name'], 'booking_id': booking['booking_id'], 'arrival_date': booking['arrival_date'].isoformat(), 'departure_date': booking['departure_date'].isoformat(), 'message_type': 'post_stay', 'send_date': booking['departure_date'].isoformat(), 'send_channel': 'review', 'status': 'pending', 'template_name': 'thank-you-direct-offer', 'notes': 'Review OTA/direct rules before sending'})

    with (OUTPUT / 'guest-message-queue.csv').open('w', newline='') as f:
        writer = csv.DictWriter(f, fieldnames=list(queue_rows[0].keys()))
        writer.writeheader()
        writer.writerows(queue_rows)

    print('Generated ops outputs in', OUTPUT)


if __name__ == '__main__':
    generate()
