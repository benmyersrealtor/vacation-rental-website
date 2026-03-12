# Realtime Rental API Project Brief

Created: 2026-03-12  
Last updated: 2026-03-12

## Overview
This project evaluates the Real Time Rental (RTR) API as a potential foundation for vacation rental operations, automation, reporting, owner communication, and direct-booking growth.

The goal is not to build technology for its own sake. The goal is to use RTR data to reduce manual work, improve visibility, tighten operations, and create a cleaner path toward more direct bookings and better portfolio management.

---

## Project Objective 🎯
Determine whether the RTR API is strong enough to support practical, high-value workflows across:
- operations
- guest communication
- owner reporting
- revenue visibility
- maintenance coordination
- direct-booking strategy
- CRM / lead capture crossover

---

## Strategic Value
If the API is solid, this project could turn RTR from a booking system into an operational data backbone.

That would allow Myers Realty to:
- automate recurring admin work
- improve turnover coordination
- catch problems earlier
- communicate with owners more consistently
- identify revenue gaps faster
- support direct-booking growth with real data
- connect vacation rental activity into the broader real estate pipeline

---

## Core Questions
1. Can we reliably extract reservation, property, guest, and financial data?

2. Can we get near-real-time updates via webhooks, or will this require polling?

3. Is the API read-only, or can we push useful data back into RTR?

4. Can it support direct-booking workflows, not just reporting?

5. Is the documentation and access model good enough to build on without turning the project into a maintenance headache?

---

## Recommended Initial Use Cases
These are the most practical workflows to build first if the API supports them.

### 1. Weekly arrivals / departures report
A Monday summary of:
- all check-ins this week
- all check-outs this week
- same-day turns
- occupancy gaps
- properties needing attention

**Why it matters:** fast visibility, low complexity, high usefulness.

### 2. Daily turnover report 🧹
Each morning, generate:
- today’s departures
- today’s arrivals
- same-day turns
- special notes
- properties with tight cleaning windows

**Why it matters:** directly improves day-to-day operations.

### 3. Low-occupancy / vacancy gap alerts
Flag:
- open dates in the next 7 / 14 / 30 days
- cancellations
- weak booking pace

**Why it matters:** helps protect revenue and identify underperforming inventory.

### 4. Guest messaging queue
Prepare or automate:
- booking confirmation follow-up
- pre-arrival instructions
- check-in day reminders
- mid-stay check-ins
- checkout instructions
- post-stay review / rebook prompts

**Why it matters:** improves consistency and guest experience.

### 5. Owner update summary
Generate a recurring owner-facing summary with:
- upcoming bookings
- occupancy snapshot
- revenue snapshot
- maintenance issues
- notable guest concerns

**Why it matters:** better owner communication without hand-building every update.

### 6. Cleaner / housekeeping task board
Turn reservation data into:
- cleaning schedules by day
- same-day turn priority lists
- property-by-property checklists
- flags for early arrival / late departure conflicts

**Why it matters:** high operational leverage.

### 7. Maintenance issue tracking
Track:
- guest-reported issues
- repeat issues by property
- open issues before next arrival
- urgency / severity

**Why it matters:** reduces repeat problems and protects guest experience.

### 8. Booking source and channel mix dashboard 📊
Track:
- Airbnb / Vrbo / direct / other source mix
- revenue by source
- occupancy by source
- fee drag by source
- repeat guest behavior

**Why it matters:** shows where business comes from and where margin gets lost.

### 9. Direct-booking opportunity workflow
Identify:
- repeat guests
- high-value guests
- OTA guests worth remarketing direct
- properties best suited for direct-booking growth

**Why it matters:** supports the long-term goal of reducing platform dependence.

### 10. Weekly executive summary
One digest with:
- occupancy this week
- problem properties
- cancellations
- booking pace
- maintenance items
- owner issues
- direct-booking opportunities

**Why it matters:** keeps leadership informed without digging through multiple systems.

---

## Recommended Build Plan

### Phase 1 — Immediate Wins 🚀
Focus on visibility and lightweight reporting.

**Target outputs:**
- weekly arrivals / departures report
- daily turnover report
- low-occupancy alerts
- weekly executive summary

**Why Phase 1 first:**
- lowest complexity
- fastest value
- helps validate data quality quickly
- gives operational benefit even if API is mostly read-only

### Phase 2 — Operations Automation
Focus on reducing manual coordination work.

**Target outputs:**
- guest messaging queue
- cleaner / housekeeping task board
- maintenance issue tracking

**Why Phase 2 next:**
- builds on reservation and property data foundations
- creates visible process improvements
- exposes where write access or external tools may be needed

### Phase 3 — Growth + Strategy
Focus on revenue mix, owner communication, and direct booking.

**Target outputs:**
- owner update summaries
- booking source dashboard
- direct-booking opportunity workflow

**Why Phase 3 last:**
- depends on cleaner data models
- benefits from historical data
- has more strategic than operational value

---

## Dependencies
For this project to be worth building, RTR should ideally expose most of the following:

### Required data access
- reservations
- properties
- guest records
- booking source
- availability calendars
- rates / fees / balances

### High-value data access
- owner data
- payout / statement data
- maintenance records
- housekeeping or task data
- communication events

### Platform capabilities
- stable authentication
- usable documentation
- historical data access
- reasonable rate limits
- webhook support, or at least reliable polling patterns

---

## Success Criteria ✅
This project is worth pursuing if we can confidently do most of the following:
- pull reservation, property, guest, and financial data
- distinguish direct bookings from OTA bookings
- generate recurring operational reports automatically
- identify vacancies, turnover pressure, and problem properties
- support owner and executive summaries from real data
- create a path toward direct-booking analytics and follow-up workflows

---

## Risk Factors
The project becomes less attractive if:
- the API is poorly documented
- access is expensive or restricted
- key fields are missing
- booking source data is incomplete
- financial data is weak
- there is no webhook support and polling is fragile
- the API is too limited to support anything beyond basic reporting

---

## Recommended First Build
If the API checks out, the best first implementation is:

## Weekly + Daily Operations Reporting Bundle
This would include:
- weekly arrivals / departures report
- daily turnover report
- low-occupancy alerting
- weekly executive summary

**Why this first:**
- quick to prove value
- low implementation risk
- useful even with read-only access
- creates immediate operational visibility
- sets the foundation for later automation

---

## Questions for the RTR Representative
Use these during the call to quickly determine whether the API is operationally useful or just technically available.

### 1. API access and setup 🔐
- Do you offer API access for property managers like us?
- Is API access included in our plan or billed separately?
- Do we get our own credentials?
- Is there a sandbox or test environment?
- Do you provide complete documentation and sample requests?

### 2. Reservation data
- Can we pull all reservations through the API?
- What reservation fields are included?
- Are check-in, check-out, status, guest count, booking source, and balances available?
- Can we pull cancelled and modified reservations?
- Can we access historical reservation data?

### 3. Property data 🏡
- Can we pull all property records?
- Are amenities, occupancy limits, notes, addresses, and calendars available?
- Can we tell when properties are blocked for owner use or maintenance?

### 4. Guest data
- What guest details are exposed?
- Can we access name, phone, email, and stay history?
- Are there privacy limitations on guest contact data?
- Can repeat guests be identified across bookings?

### 5. Financial data 💵
- Are nightly rate, rent, taxes, fees, commissions, balances, and payout data available?
- Can we separate direct bookings from OTA bookings financially?
- Is historical revenue data available?

### 6. Operational workflows
- Does the API expose housekeeping, turnover, or task data?
- Is maintenance or work-order data available?
- Can tasks or notes be created or updated?

### 7. Messaging / automation
- Can guest communications be triggered through the API?
- Is there support for email or SMS?
- Can communication history be read or written?
- If not, is the API sufficient to run messaging outside RTR?

### 8. Real-time updates ⚡
- Do you support webhooks?
- For which event types?
- If webhooks are unavailable, what polling pattern do you recommend?

### 9. Read vs write access
- Is the API read-only?
- Can we write anything useful back into RTR?
- Can we add notes, tasks, maintenance items, or updates to guest/reservation data?

### 10. Direct-booking fit 🌐
- Can the API support a custom direct-booking site?
- Can we sync rates and availability externally?
- Can we distinguish direct bookings from OTA bookings cleanly?
- Can external website inquiries or leads flow into RTR?

---

## What a Good Outcome Looks Like

### Best case
- strong read access
- solid financial and source data
- reservation + property + guest visibility
- webhook support
- decent documentation
- enough flexibility to support direct-booking workflows

### Acceptable case
- strong read-only reporting API
- enough data for dashboards, alerts, and operational summaries
- limited or no write functionality

### Weak case
- thin data fields
- poor documentation
- no booking source visibility
- weak financial detail
- no event model
- difficult integration path

---

## Suggested Positioning Statement
If asked what we want from the API, use this:

> We want to use the API to build operational reporting, automate arrivals, departures, and turnover workflows, improve owner communication, and eventually support direct booking and portfolio-level reporting.

---

## Current Take
If RTR gives us reservations, properties, financials, booking source data, and webhooks, it is worth building around.

If it is mostly read-only, poorly documented, and missing source or financial depth, then we should treat it as a reporting feed rather than the foundation of a serious automation stack.
