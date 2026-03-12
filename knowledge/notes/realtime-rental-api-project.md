# Realtime Rental API Project

Created: 2026-03-12

## Purpose
Evaluate the Real Time Rental (RTR) API as a foundation for vacation rental automation, operational reporting, owner communication, and direct-booking growth.

## Core Question
Can the RTR API support practical workflows that improve operations, guest experience, owner updates, revenue visibility, and long-term direct-booking strategy?

## Practical Top 10 Workflows to Build First

### 1. Weekly arrivals / departures report
A Monday summary of:
- all check-ins this week
- all check-outs this week
- same-day turns
- occupancy gaps
- properties needing attention

**Why first:** instant visibility, low complexity, broadly useful.

### 2. Daily turnover report
Each morning, generate:
- today’s departures
- today’s arrivals
- same-day turns
- special notes
- properties with tight cleaning windows

**Why first:** directly useful for operations.

### 3. Low-occupancy / vacancy gap alerts
Flag:
- open dates in the next 7/14/30 days
- cancellations
- weak occupancy pacing

**Why first:** helps protect revenue.

### 4. Automated guest messaging queue
Prepare or automate:
- booking confirmation follow-up
- pre-arrival instructions
- check-in day reminder
- mid-stay check-in
- checkout instructions
- post-stay review / rebook message

**Why first:** improves guest experience and systematizes communication.

### 5. Owner update summary
Generate a weekly or monthly owner-facing summary with:
- upcoming bookings
- occupancy snapshot
- revenue snapshot
- maintenance issues
- guest concerns worth noting

**Why first:** improves owner communication without manual effort.

### 6. Cleaner / housekeeping task board
Turn reservation data into:
- cleaning schedule by day
- same-day turn priority list
- property-by-property checklist
- flags for early arrival / late departure conflicts

**Why first:** high operational value.

### 7. Maintenance issue tracking by stay/property
Track:
- guest-reported issues
- repeat issues by property
- open issues before next arrival
- severity / urgency ranking

**Why first:** reduces repeat problems and improves accountability.

### 8. Booking source and channel mix dashboard
Track:
- Airbnb / Vrbo / direct / other source mix
- revenue by source
- occupancy by source
- fee drag by source
- repeat guest behavior

**Why first:** shows where business comes from and where margin is lost.

### 9. Direct booking opportunity workflow
Identify:
- repeat guests
- high-value guests
- OTA guests to remarket direct
- properties best suited for direct-booking growth

**Why first:** supports direct-booking strategy.

### 10. Weekly executive summary
One digest with:
- occupancy this week
- problem properties
- cancellations
- booking pace
- maintenance items
- owner issues
- direct booking opportunities

**Why first:** keeps leadership informed without digging through systems.

## Recommended Build Order

### Phase 1: Immediate wins
- weekly arrivals / departures
- daily turnover report
- low-occupancy alerts
- weekly executive summary

### Phase 2: Ops automation
- guest messaging queue
- cleaner task board
- maintenance issue tracking

### Phase 3: Growth + strategy
- owner updates
- booking source dashboard
- direct booking opportunity workflow

## RTR API Call Prep Sheet

### Goal of the Call
Figure out whether the RTR API can support:
- operational automation
- guest and owner workflows
- reporting and dashboards
- direct booking growth
- CRM / lead capture crossover

### Priority workflows to mention
- weekly arrivals / departures report
- daily turnover / cleaning report
- vacancy and low-occupancy alerts
- guest messaging workflows
- owner update summaries
- maintenance tracking
- booking source / revenue dashboard
- direct booking opportunity tracking

### Top Questions to Ask

#### 1. API Access & Setup
- Do you offer API access for property managers like us?
- Is it included in our plan or an added cost?
- Do we get our own credentials?
- Is there a sandbox or test environment?
- Do you have full documentation and example requests?

#### 2. Reservation Data
- Can we pull all reservations through the API?
- What fields are included?
- Do we get:
  - check-in / check-out
  - booking status
  - guest count
  - booking source
  - balance due
  - cancellation / modification history
- Can we access both current and historical reservations?

#### 3. Property Data
- Can we pull all property records?
- Do we get:
  - property name / ID
  - address
  - amenities
  - occupancy limits
  - notes
  - availability calendar
- Can we tell when a property is blocked for owner use or maintenance?

#### 4. Guest Data
- What guest information is accessible?
- Can we get:
  - name
  - phone
  - email
  - stay history
- Are there privacy restrictions on guest contact data?
- Can we identify repeat guests across bookings?

#### 5. Financial Data
- Can we access:
  - nightly rate
  - total rent
  - taxes
  - fees
  - commissions
  - owner payout data
  - payment status
  - balance due
- Can we separate direct bookings from OTA bookings financially?
- Can we pull historical revenue data?

#### 6. Operational Workflows
- Does the API expose housekeeping / turnover information?
- Can we access arrival/departure-based task data?
- Is maintenance or work-order data available?
- Can we create or update tasks through the API?
- Can we attach notes to reservations or properties?

#### 7. Messaging / Automation
- Can guest communications be triggered through the API?
- Is there support for email or SMS?
- Can communication logs be read or written through the API?
- If not, is the API good enough for us to run messaging outside RTR?

#### 8. Real-Time Updates
- Do you support webhooks?
- If yes, for what events?
  - reservation created
  - reservation updated
  - reservation cancelled
  - payment received
  - property availability changed
- If no webhooks, what polling frequency is recommended?

#### 9. Read vs Write Access
- Is the API read-only?
- Can we write anything back into RTR?
- Can we:
  - update reservations
  - add notes
  - create tasks
  - create maintenance items
  - update guest info

#### 10. Direct Booking Fit
- Can the API support a custom direct-booking website?
- Can we sync property availability and rates to our own site?
- Can we distinguish OTA bookings from direct bookings cleanly?
- Can website inquiries or leads flow into RTR?
- Is the API strong enough for us to build around long-term?

### Good outcome criteria
Best case:
- strong read access
- financial + source data available
- property + reservation + guest data available
- webhook support
- decent documentation
- flexibility to support direct-booking workflows

Acceptable case:
- good read-only reporting API
- enough data for dashboards, alerts, and operations
- limited write functionality

Weak case:
- poor docs
- limited fields
- no booking source visibility
- no financial detail
- no real-time event support
- hard to build meaningfully on top of

### Suggested positioning statement
“We want to use the API to build operational reporting, automate arrivals/departures and turnover workflows, improve owner communication, and eventually support direct booking and portfolio-level reporting.”

### Final 5 must-get answers
1. Can we pull reservation, property, guest, and financial data?
2. Can we distinguish booking source and direct vs OTA?
3. Do you support webhooks or only polling?
4. Is the API read-only or can we write back into RTR?
5. Is the documentation solid enough to build on?

## Current Take
If the API provides reservations + properties + financials + source data + webhooks, it is worth building around.

If it is mostly read-only, poorly documented, and missing source/financial detail, it should be treated as a reporting feed rather than the backbone of a serious automation stack.
