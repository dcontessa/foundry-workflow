# Foundry demonstration — target 2:30

This is a recording guide, not a claim that a video exists. Record actual application states. If sample mode is shown, say it is a prepared example. Include real NVIDIA-on-Nebius execution before claiming hackathon compliance.

## 0:00–0:20 — The problem

“An app can look finished and still lose a customer enquiry. Foundry turns a messy business process into a workflow you can test, then shows whether a proposed improvement actually works.”

Show the product name, problem brief, and interactive board.

## 0:20–0:50 — Build and inspect

“Our first workflow handles enquiries for a training provider. The scope is deliberately specific: contact details, course interest, owner, status, and follow-up dates.”

Show the working board, edit an enquiry, and explain the mode displayed. For a verified live demo, show Nebius live, the exact NVIDIA model, and actual request evidence.

## 0:50–1:20 — Find failures

“This prepared baseline is intentionally incomplete. The same engine powers the form and the tests. Here, two of five scenarios pass. The failures expose duplicate records, invalid follow-up dates, and an enquiry hidden because it has no owner.”

Run the tests and expand the duplicate scenario. Show expected versus observed behaviour.

## 1:20–1:55 — Repair with proof

“Foundry proposes bounded rule changes. A person reviews them. The model cannot rewrite the tests to improve its score, and a repair cannot regress a previously passing scenario.”

Review the proposed rules, apply, and show the unchanged test suite passing five of five. The unassigned enquiry becomes visible.

## 1:55–2:15 — Real interaction

Attempt to save an enquiry with a missing email; show the validation. Show a valid enquiry saving to the visible queue. Export evidence.

## 2:15–2:30 — Close

“Foundry makes improvement inspectable. Start with one real process, test its assumptions, and keep the evidence. This prototype uses synthetic data; customer validation and additional workflow templates are next.”

Do not claim autonomous code generation, production readiness, ROI, or integrations that have not run. Keep all sponsor explanation within the first three minutes.
