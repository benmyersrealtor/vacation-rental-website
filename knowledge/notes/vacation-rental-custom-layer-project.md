# Vacation Rental Custom Layer Project

_Date saved: 2026-03-19_

## Purpose
Create a custom layer around Realtime Rental so Myers Realty can use RTR as the operational backend while controlling:
- website experience
- direct booking strategy
- lead capture
- SEO / marketing
- reporting
- automation workflows
- business-specific operational logic

## Core idea
Treat Realtime Rental as:
- property / rate / availability source
- reservation management backend
- rental operations system of record

Treat the custom layer as:
- custom website frontend
- API / integration layer
- automation layer
- reporting layer
- marketing and analytics layer
- local business logic layer

## What the custom layer would include

### 1. Custom website frontend
Guest-facing site for:
- property pages
- search
- availability display
- direct booking flow
- landing pages
- local SEO pages
- remarketing funnels

### 2. API integration layer
A small service/app that pulls and normalizes:
- properties
- rates
- availability
- bookings/reservations if available
- owner blocks / owner reservations if available
- fees, taxes, restrictions

### 3. Local business logic layer
Handle custom rules such as:
- cleaner scheduling logic
- linen rules
- owner reservation handling
- custom pricing/promo logic
- lead routing
- reporting logic
- status flags and operational workflows

### 4. Workflow automation layer
Use for:
- weekly cleaning reports
- linen reports
- owner reservation alerts
- Telegram summaries
- report filing
- abandoned inquiry follow-up
- CRM sync
- booking/ops dashboards

### 5. Database / cache / index
Maintain a local normalized layer for:
- properties
- bookings
- owner reservations
- media
- leads
- pricing snapshots (if useful)

This reduces dependence on live RTR responses and makes reporting/automation easier.

### 6. Analytics / marketing layer
Track and optimize:
- GA4
- Meta Pixel
- conversion tracking
- call tracking
- SEO performance
- remarketing audiences
- abandoned inquiry / abandoned booking flows

## Why this matters
RTR may be strong as a backend system, but not necessarily as the best tool for:
- custom web experience
- SEO-driven growth
- lead capture
- automation flexibility
- business-specific workflows

The custom layer allows Myers Realty to keep RTR as the engine while owning the customer experience and operational leverage.

## Strategic use cases for Myers Realty
- grow direct bookings
- reduce platform dependence over time
- improve local SEO and content targeting
- automate cleaner and linen workflows
- track owner reservations and maintenance blocks
- capture inquiry leads who do not book immediately
- reuse guest leads for broader sales / investment / property management funnels

## Architecture concept
Realtime Rental
→ source system for rental data

Custom integration layer
→ normalizes and syncs data

Myers Realty website + workflows
→ direct bookings, lead capture, reporting, automation, analytics

## Questions to revisit after Realtime call
1. What API data is actually available?
2. Are bookings/reservations exposed or only property/rate/availability?
3. Are owner reservations and maintenance blocks exposed cleanly?
4. Are webhooks available?
5. Can website-originated bookings sync back into RTR?
6. Is RTR strong enough to power direct booking growth directly, or do we need a custom frontend?
7. Which parts should be phase 1 vs later?

## Next step after the call
Revisit this note and turn it into an implementation brainstorm based on what Realtime confirms they can provide.
