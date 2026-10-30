# Foundry — submission draft

Status: draft. The existing Devpost entry has the approved name and elevator pitch saved. It has not been submitted.

## Event fit

Recommended track: **Best Apps and Agents**.

Official deadline observed on the event website: **31 October 2026, 1:00 a.m. GMT+8 / Malaysia time**.

Official requirement: “All submissions must run on either Nebius Token Factory or Nebius AI Cloud and use at least one NVIDIA open source model.”

Required deliverables observed: working project; selected track; description; working demo URL; public YouTube demo of three minutes or less; public repository with open-source license and setup README; feedback on the sponsor tools actually used; explanation of significant new work if the project predates the submission period.

Source: https://nebiusglobalaihackathon.devpost.com/ (read in signed-in browser on 30 October 2026). The project details form permits YouTube or Vimeo, but the event overview specifically asks for public YouTube; follow the stricter event requirement.

## Name

Foundry

## Elevator pitch

Turn a messy business process into a working workflow, test it against real rules, and prove every improvement.

## Inspiration

A working-looking tool can still lose an enquiry, accept a duplicate, or schedule a follow-up before the enquiry arrived. Small service businesses need to see whether a workflow survives everyday problems before relying on it. Foundry makes those failures visible and turns improvement into something people can inspect.

## What it does

Foundry is a workflow laboratory for training providers. Describe an enquiry-handling problem, create a constrained interactive board, run five executable scenarios, inspect expected versus observed behaviour, and apply a reviewed repair. Every version faces the same tests. Previously passing tests must stay passing.

The prepared example starts with an intentionally incomplete configuration. It passes two of five scenarios. After enabling duplicate review, chronological date validation, and the unassigned queue, all five pass. These are measured local test results on synthetic fixtures, not claims about customer outcomes.

## How it is built

The React and TypeScript interface uses one shared workflow engine for both real form actions and the test runner. A Node backend supports structured configuration proposals through Nebius Token Factory. Zod validates model output against an allowlisted schema; no model-generated code is executed. A regression gate protects already-passing scenarios, and users can export the evidence as JSON.

**Live NVIDIA model integration is pending verification. Do not remove this disclosure or claim the entry meets the sponsor requirement until a real NVIDIA model call on Nebius succeeds.**

## Challenges

The core design challenge was separating a convincing proposal from evidence that it works. Tests therefore keep fixed expectations and execute against the same functions as the enquiry board. A second challenge is demonstrating a repair honestly: sample mode clearly labels its prepared baseline and repair rather than presenting them as live inference.

## Accomplishments

A complete local interaction loop, five inspectable scenarios, regression protection, browser persistence, editable enquiries, desktop and mobile layouts, and downloadable evidence. Seven automated engine tests pass, including configuration validation and regression rejection.

## What we learned

A modest workflow with a clear test contract makes improvement easier to judge than a broad promise of autonomous application generation. Visible assumptions, reviewable changes, and expected-versus-observed evidence make model proposals more useful.

## What's next

Validate the workflow with training providers, add customer-defined scenarios, support additional constrained templates, and evaluate secure multi-user storage. These are future plans, not shipped features.

## Built with

TypeScript, React, Vite, Node.js, Zod, Lucide. Add Nebius Token Factory and the exact NVIDIA model after live verification.

## Submission blockers

- Verify usable Nebius credits and obtain authorized API access.
- Complete and record a real NVIDIA Nemotron inference path.
- Deploy and test the public working demo.
- Publish and verify the licensed source repository.
- Record and upload a public YouTube demo no longer than three minutes.
- Complete Additional info using actual tool feedback, not invented claims.
- Review final eligibility, rules, and submission attestations with the user where required.
