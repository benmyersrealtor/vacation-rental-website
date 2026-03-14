# Vacation Rental Ops System

Internal workflow kit for weekly vacation-rental operations.

## Goal
Turn reservation reports into clean operational outputs:
- turnover master list
- cleaner schedules
- linen schedules
- exception list
- guest messaging queue

## Core idea
Your PMS/reporting tool remains the booking source of truth.
This ops system becomes the workflow layer on top of it.

## Folder structure
- `data/`
  - raw and normalized booking data
- `templates/`
  - reusable CSV and markdown templates
- `output/`
  - generated weekly schedules and exception lists

## Weekly workflow
1. Export current reservation/check-in report from the rental software.
2. Enter or convert each stay into `data/bookings-current.csv`.
3. Match bookings against the property master:
   - `../2026-vacation-rental-quick-reference-master-internal.csv`
4. Generate/update:
   - `output/turnovers-current.csv`
   - `output/cleaner-schedules.md`
   - `output/linen-orders.md`
   - `output/exceptions.md`
   - `output/guest-message-queue.csv`
5. Review exceptions first.
6. Send cleaner and linen schedules.
7. Track changes midweek and send only deltas when possible.

## Source files this system depends on
- Property master:
  - `../2026-vacation-rental-quick-reference-master-internal.csv`
- Reservation input:
  - `data/bookings-current.csv`

## Recommended rhythm
- Monday morning: import bookings and build schedules
- Monday mid-day: send cleaner and linen instructions
- Midweek: run a changes-only pass if bookings changed
- Friday: optional pre-weekend review for same-day turns and exceptions

## Output definitions
### `turnovers-current.csv`
One row per operational turnover event.
Use this as the main internal ops sheet.

### `cleaner-schedules.md`
Grouped by cleaner, sorted by date.
This is the fastest staff-facing view.

### `linen-orders.md`
Grouped by linen vendor, sorted by date.
Designed for Holiday Linens / Sweet Dreams coordination.

### `exceptions.md`
Anything that needs human review:
- same-day turns
- missing cleaner
- missing linens vendor
- missing bed mix
- owner reservations
- changed dates
- suspicious gaps or overlaps

### `guest-message-queue.csv`
A queue of timed guest communications:
- booking confirmation
- pre-arrival/check-in
- checkout reminder
- thank-you/direct-booking follow-up

## Suggested future automation
Once the CSV workflow is stable, automate:
- PDF/CSV reservation import
- turnover generation
- grouped schedule generation
- delta change detection
- timed guest messages

## Design principles
- one source of truth per reservation
- one source of truth per property
- group outputs by the person/vendor doing the work
- surface exceptions separately
- automate repetitive work, not edge cases first
