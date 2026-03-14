# Workflow Outline

## Objective
Use PMS reservation reports plus the property master to produce cleaner schedules, linen schedules, guest messaging queues, and exception handling with minimal manual work.

## Inputs
### 1. Reservation data
Preferred sources, in order:
- checkout/departure report
- check-in report
- reservation changes/cancellations report

Minimum usable input:
- property name
- arrival date
- departure date
- guest/reservation name
- lease/reservation ID
- reservation type
- address

### 2. Property master
From `../2026-vacation-rental-quick-reference-master-internal.csv`
Needed fields:
- property name
- address
- cleaner
- linens
- bedrooms/bathrooms
- bed mix
- access notes

## Logic
### Step 1. Normalize booking records
Put each active reservation into `data/bookings-current.csv`.
One row per stay.

### Step 2. Enrich with property data
Match each booking by property name.
Attach:
- cleaner
- linens vendor
- bed mix
- location
- address

### Step 3. Build turnover events
For each reservation, the turnover anchor is the departure date.
Then calculate:
- next arrival for same property
- gap days
- same-day turn yes/no
- owner reservation yes/no
- priority

### Step 4. Group outputs
Generate:
- cleaner schedules grouped by cleaner
- linen orders grouped by vendor
- exception list grouped by issue type

### Step 5. Human review
Review in this order:
1. same-day turns
2. missing bed mix / cleaner / linens
3. owner reservations
4. changed bookings

### Step 6. Send ops messages
After review:
- send cleaner schedules
- send linen orders
- queue guest messages

## Priority rules
### High priority
- same-day turn
- gap of 1 day or less
- missing cleaner
- missing linens vendor
- changed booking inside 72 hours

### Medium priority
- owner reservation needing custom handling
- unknown bed mix
- property with access-note questions

### Low priority
- long-gap cleanings
- routine future turns

## Messaging workflows to add next
### Guest pre-arrival
Trigger: 3 days before arrival
Include:
- check-in time
- address
- access instructions
- Wi‑Fi
- quick house notes

### Guest checkout reminder
Trigger: evening before departure
Include:
- checkout time
- trash / linens / lock-up notes

### Post-stay thank-you
Trigger: same day or next day after checkout
Include:
- thank-you
- invite to book direct next time
- 10% offer if appropriate by channel policy

## Implementation notes
- Keep PMS as booking source of truth
- Keep property master as ops source of truth
- Never send schedules without reviewing exceptions first
- Prefer deltas midweek instead of resending full schedules
