# Foundry

Working name. Trademark and domain availability have not been checked.

**From business problem to working proof.**

## Product decision

Foundry lets a service business describe a broken workflow, try a working prototype, watch it encounter realistic test cases, and compare a corrected version against the same tests. The initial customer hypothesis is a small training provider managing enquiries. Demand and willingness to pay remain unvalidated.

The first release supports one constrained workflow: enquiry intake, ownership, status, and follow-up. It does not promise to generate arbitrary applications.

## Demo story

Input: “My training enquiries are scattered across messages and spreadsheets. I lose track of who needs a reply.”

1. Foundry proposes a structured workflow and displays its assumptions.
2. The user reviews the proposed fields and rules.
3. Foundry creates a working enquiry board from a safe application template.
4. A tester runs five explicitly synthetic scenarios through the same application logic used by the interface.
5. Results show expected versus actual outcomes, including failures if present.
6. Foundry proposes a bounded configuration change. The user applies it and reruns the identical tests.
7. A comparison shows results for each version, with execution time and model usage where available.

Never force a failure to make the story work. A prepared example with a deliberately incomplete configuration may be used if clearly labelled. Recordings must distinguish actual execution from illustrative animation.

## Smallest complete product

Three views:

- **Describe:** problem input, sample problem, extracted requirements, visible assumptions, review button.
- **Workbench:** interactive enquiry board, create/edit form, owner assignment, follow-up dates, status changes, version label.
- **Prove:** scenario runner, expected/actual results, evidence, proposed repair, apply-and-rerun action, version comparison.

Data fields: enquiry ID, customer name, email, course interest, received date, follow-up date, owner, status, notes. Use synthetic names and reserved example email domains for the demo.

Statuses: new, contacted, qualified, closed. The prototype stores structured records locally for the initial demonstration; persistent storage is a later deployment decision.

## Test contract

| Scenario | Expected behaviour |
| --- | --- |
| Valid enquiry | Creates exactly one record with a stable ID and initial status |
| Same email and course submitted again | Flags a possible duplicate for review rather than silently creating a second record |
| Missing contact email | Blocks save and explains the missing field |
| Follow-up date before received date | Blocks the invalid date with a useful message |
| Unassigned new enquiry | Remains visible in an unassigned queue; never disappears from the board |

Rules are deterministic and versioned. The model proposes configuration; it cannot redefine expected results merely to make a test pass. A repair must preserve previously passing scenarios.

## Implementation approach

Proposed stack: React, TypeScript, and Vite for the interface; a small server for model calls; schema validation for model output; one shared workflow engine for UI actions and test execution. Final dependencies are selected and checked when implementation begins.

Use one model with distinct structured tasks: requirements extraction, workflow configuration, and repair proposal. Separate autonomous agents are unnecessary for the first build. Never execute arbitrary model-generated code. Restrict changes to an allowlisted configuration schema with validation and explicit user application.

Provider integration sits behind a server-side adapter. Nebius/NVIDIA deployment, supported models, credits, and mandatory technology usage are unverified. Do not claim a sponsor integration until a real request succeeds and the full demo uses it. Keep secrets server-side.

If live inference is unavailable, an explicitly labelled sample mode can demonstrate the workflow engine and tests. It cannot count as proof of live model integration.

## Delivery sequence

These are effort estimates, not calendar commitments. Replan once the event deadline and platform access are verified.

| Phase | Estimated focused effort | Exit condition |
| --- | --- | --- |
| 1. Scope and fixtures | 2–3 hours | Reviewed workflow, five fixtures, expected results, and demo script |
| 2. Working prototype | 4–6 hours | A user can create, assign, edit, and filter enquiries |
| 3. Evidence engine | 3–5 hours | Five tests execute against shared logic with inspectable outcomes |
| 4. Model integration | 4–6 hours | Real structured requirements and configuration pass validation |
| 5. Improvement loop | 4–6 hours | Proposed repair applies as a new version and regression tests rerun |
| 6. Polish and handoff | 3–5 hours | Usable interface, reproducible setup, accessible states, reliable demo |

Build the deterministic loop before the model integration. Stop feature expansion if the main demo is unreliable. Optional features: downloadable evidence report and a second workflow template. Defer messaging integrations, payments, multi-tenant accounts, arbitrary code generation, and marketplace features.

## Visual direction

An industrial design studio: warm off-white, charcoal text, restrained copper accents, large readable type, and clear side-by-side version comparisons. Keep the customer's workflow central. Show technical logs only in expandable evidence panels. Avoid robot imagery and exaggerated intelligence claims.

## Validation and success

- All five scenarios have reproducible results with shared UI/test logic.
- Repairs cannot change test expectations or regress passing scenarios unnoticed.
- Invalid model output produces a clear recoverable error.
- A fresh user can run the example and understand the comparison without coaching.
- Report actual latency and usage; do not invent speed, savings, ROI, or customer traction.
- Before commercial positioning, interview three prospective users and observe their current enquiry handling. Treat interview counts as a plan until completed.

## Submission preparation

Prepare a repository with setup instructions, architecture diagram, synthetic-data notice, limitations, and a reproducible example. Prepare a short demo video showing the full loop, screenshots, concise project description, and judge testing instructions. These are proposed assets; the actual required deliverables, video limits, eligibility, originality window, and deadline await official verification.

Target entry: https://devpost.com/submit-to/30790-nebius-x-nvidia-global-ai-hackathon/manage/submissions/1168182/project-overview

Devpost connector returned UNAUTHORIZED on 30 October 2026. Existing project content and submission status have not been inspected. No Devpost fields were edited or submitted. The parent workspace state references a different event and has been left unchanged.

## Next action

Implement the deterministic enquiry board and scenario runner in this dedicated Foundry directory. Before entering the guided hackathon build flow, reconnect Devpost, fetch the official requirements, and complete the required rules review. Any cloud spending, publication, or final submission needs the user's authorization.
