# Reimbursements

Send receipts to Max via Telegram as photos, PDFs, screenshots, or forwarded emails.

## Intake workflow

When a receipt arrives:
1. Save the original file under `reimbursements/YYYY/MM/`.
2. Confirm visible extracted fields with Ben before finalizing the tracker entry.
3. Ask only for any missing info needed to store it well.
4. Log the receipt in `reimbursements/tracker.csv`.

## What to confirm from the receipt

Visible fields to confirm back before saving:
- vendor/merchant
- transaction date
- total amount
- payment method shown (if visible)
- last 4 digits of card (if visible)
- receipt/invoice number (if visible)

## Extra info to ask for if missing

- business purpose / what it was for
- reimbursement owner / who should reimburse Ben
- property, client, transaction, or job it belongs to
- category
- whether tax should be tracked separately if not clear

## Filename format

`YYYY-MM-DD_vendor_amount_submitter.ext`

Example:
`2026-03-16_home-depot_84.22_ben.jpg`

## Status values

- received
- needs_info
- ready_for_reimbursement
- submitted
- reimbursed
