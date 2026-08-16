# Clickable Prototype Brief & Client Validation Script

**Bank Internal Audit, Risk, Compliance & CAAT Platform — Bangladesh**

| Document control | Value |
|---|---|
| Title | Clickable Prototype Brief & Client Validation Script |
| Version | v1.0 |
| Purpose | Guide the design and build of a clickable prototype, and structure the client walkthrough used to finalise the SRS |
| Predecessor documents | Bank Audit Platform Product Blueprint v1.0; Bank Internal Audit GRC SRS Bangladesh v1.0; Bank Audit Platform Development Backlog v1.0 |
| Audience | UX/UI designer, Product/BA, Engineering lead, Client-facing team |
| Status | Draft — for use before SRS is finalised |

---

## 1. Purpose of This Document

The Product Blueprint and SRS (v1.0) were built from public research on local and international audit/GRC products, plus the IIA 2024 Global Internal Audit Standards. They are a strong architecture and requirements baseline, but they are still an internal hypothesis — several open questions in the SRS (Section 26) can only be answered by the client.

This document defines what to build into a clickable prototype and exactly how to run the client walkthrough, so that feedback is captured in a structured, SRS-traceable way rather than as loose meeting notes. The output of this phase is a finalised SRS (v1.1) and a locked MVP scope that development can commit to.

### Where this fits in the project sequence

| Step | What happens |
|---|---|
| 1. Done | Blueprint + SRS v1.0 drafted from local/global research (TAHQIQ, CTrends, MetricStream, IIA 2024 Standards). |
| 2. This document | Define exactly what the prototype must contain and how the client walkthrough will be run and captured. |
| 3. Build | UX designer builds a clickable, mid-fidelity prototype (Figma or clickable HTML) covering the journeys in Section 6. |
| 4. Walk through | Run structured sessions with the client's Internal Audit / Compliance / IT stakeholders using the script in Section 11. |
| 5. Capture | Log every confirmation, correction and new requirement against the SRS section it affects. |
| 6. Finalise | Update SRS to v1.1 (Client-Validated), lock MVP scope, re-groom the Development Backlog, then start Sprint 1. |

---

## 2. Prototype Objectives

- Validate that the core audit workflow (plan → engage → fieldwork → finding → remediation) matches how this bank actually works today.
- Validate the approval hierarchy and segregation-of-duties assumptions in the RBAC matrix.
- Validate terminology — "engagement" vs "audit", "finding" vs "observation", severity labels, SLA days — against the client's own language.
- Confirm which P0 screens are genuinely must-have for Day 1, and which can move to Phase 2.
- Surface anything specific to this bank that the generic research-based blueprint could not have known.
- Build client confidence and internal buy-in ahead of commercial sign-off.

*This prototype is not intended to validate visual branding, performance, real integrations, or the accuracy of CAAT/AI logic — those are addressed later, after core scope is locked.*

---

## 3. Scope of the Prototype

| In scope for the prototype | Out of scope for the prototype |
|---|---|
| Core audit lifecycle: planning → engagement → fieldwork → findings → remediation | CAAT rule engine, data ingestion, exception queue (show 1 static "vision" screen only) |
| Branch audit workspace and one concurrent-audit example | AI/ML alert queue, model registry, GenAI Copilot (show 1 static "vision" screen only) |
| CAE, Board and Branch dashboards (with static sample data) | Real CBS/HRMS integration or live data |
| Role-based navigation for 5 personas (Section 4) | Pixel-perfect visual branding (mid-fidelity is enough to test workflow, not skin) |
| Approval/review steps and status changes, clickable end to end | Performance, security, mobile/offline behaviour |

---

## 4. Personas to Design For

Design and rehearse the walkthrough around these five personas rather than a single generic "user" — each will judge the prototype by different criteria.

| Persona | Journeys they should walk through | What they will be judging |
|---|---|---|
| Chief Audit Executive (CAE) | UJ-01 Annual Planning, UJ-04 Finding to Closure, UJ-08 Board Reporting | Whether planning logic and board reporting match how they actually justify audit coverage today |
| Audit Manager | UJ-02 New Audit Engagement, UJ-03 Auditor Fieldwork (reviewer view) | Whether engagement setup and review steps match their current file structure and sign-off habits |
| Auditor | UJ-03 Auditor Fieldwork, Branch Audit Workspace | Whether workpaper and evidence handling is faster than their current spreadsheet/Word process |
| Branch / Process Owner | Finding response and action plan submission | Whether responding to a finding and uploading evidence is simple enough for non-audit staff |
| Board / Audit Committee member | UJ-08 Board Reporting (read-only) | Whether the dashboard gives them what they currently get in a printed board pack, faster |

---

## 5. Journeys to Prototype

These map directly to the user journeys already defined in the Blueprint (Section 3). CAAT (UJ-05) and AI (UJ-06) are intentionally excluded from interactive scope — see Section 3 above.

| ID | Journey | Screens involved | What it must prove to the client |
|---|---|---|---|
| UJ-01 | Annual risk-based planning: Audit Universe → Risk Assessment → Ranking → Proposed Plan → Approval | Audit Universe, Universe Detail, Risk Register, Risk Assessment, Risk Heatmap, Annual Audit Plan, Plan Approval, Coverage Map | The plan visibly shows why each engagement was chosen and which risks it covers — this is the single most important workflow to validate |
| UJ-02 | New audit engagement: select plan item → scope → team → audit program → approval | Engagement Register, Engagement Setup, Audit Program | Engagement setup matches the fields the client actually fills in today (objective, scope, period, risks/controls mapped) |
| UJ-03 | Auditor fieldwork: procedure → sample/test → evidence → finding draft → reviewer clearance | Workpaper Workspace, Evidence Vault, Sampling, Review Queue | Every conclusion is traceable to a procedure and evidence, and the reviewer loop feels natural, not bureaucratic |
| UJ-04 | Finding to closure: draft → issue → management response → action plan → validation → close | Findings Register, Finding Detail, Action Plan, Closure Validation | The finding lifecycle and severity/escalation rules match the client's real definitions of "critical", "closed", "reopened" |
| UJ-08 | Board reporting: aggregated view → drill-down → export | CAE Dashboard, Board Dashboard, Branch Dashboard | Board members can self-serve the information they currently wait for in a printed pack |
| Optional / stretch | Branch audit and one regulatory-obligation example (UJ-07), only if time allows | Branch Audit Workspace; Regulatory Obligation Register (static) | Directional only — confirms appetite before committing GRC/CAAT scope |

---

## 6. Site Map / Navigation Flow

Structure the clickable prototype's navigation as follows so reviewers can move between journeys without a scripted-only path:

- Login → MFA → Role Dashboard (branches by persona selected for the session)
- Role Dashboard → Audit Universe → Risk Register/Assessment → Risk Heatmap → Annual Audit Plan → Plan Approval → Coverage Map *(UJ-01)*
- Coverage Map / Plan → Engagement Register → Engagement Setup → Audit Program *(UJ-02)*
- Audit Program → Workpaper Workspace → Evidence Vault → Sampling → Review Queue *(UJ-03)*
- Review Queue → Findings Register → Finding Detail → Action Plan → Closure Validation *(UJ-04)*
- Any screen → CAE / Board / Branch Dashboard (always reachable via top navigation) *(UJ-08)*
- Branch Audit Workspace reachable from both Audit Universe and Branch Dashboard (optional/stretch)
- One static "coming soon" screen for CAAT and AI, reachable from the main navigation, clearly labelled Phase 2

---

## 7. Screen States to Design

For the ~10 highest-traffic screens (Annual Plan, Engagement Setup, Workpaper Workspace, Findings Register, Finding Detail), design at least these states so the walkthrough feels real rather than a single static happy path:

| State | When it is shown | Example to design |
|---|---|---|
| Empty / first use | A new engagement or plan with no data entered yet | Blank Annual Audit Plan with a "Start from Audit Universe" call to action |
| Populated / standard | Normal day-to-day use with realistic sample data | Findings Register showing a mixed list of open, in-progress and closed findings |
| Pending approval | Record submitted and waiting on the next role in the workflow | Engagement scope in "Pending CAE Approval" with a visible approver and due date |
| Validation / error | Required field missing, or an action blocked by workflow rules | Attempt to submit fieldwork with an unreviewed workpaper |
| Read-only | A role that can view but not edit | Board member viewing the CAE Dashboard with no edit controls visible |

---

## 8. Sample Data Set to Prepare

Use a fictitious bank so no real client data is ever at risk, but make the data realistic enough (in BDT, with Bangladeshi branch names) that the client recognises the shape of their own operations.

- One fictitious bank, e.g. "Padma Bank PLC (Demo)", with a head office and 5–6 branches across 2–3 divisions
- 8–10 audit universe items spanning branch operations, credit/loans, treasury, IT, HR/payroll and procurement
- 8–10 risks with inherent/residual scores populating a heatmap with visible spread (not all the same colour)
- One approved annual plan with 6–8 line items, each showing which risk it addresses
- 2–3 engagements at different lifecycle stages (fieldwork in progress, in review, report issued)
- A handful of populated workpapers with sample evidence placeholders (scanned voucher, screenshot, exported report)
- 10–12 findings spread across severities (critical/high/medium/low) and statuses (open, in progress, overdue, closed)
- One board-pack-style dashboard snapshot with figures that tell a coherent story (e.g. 2 overdue critical findings, 85% plan coverage)

---

## 9. Tooling & Deliverable Format

- Recommended: Figma, built as a clickable, mid-fidelity prototype (grey/blue placeholder styling is fine — the goal is workflow validation, not visual design sign-off).
- Alternative: a clickable HTML prototype, useful if the same team will carry it forward into the real frontend.
- Deliver a shareable link plus a 10–15 minute recorded walkthrough, for stakeholders who cannot attend live sessions (this matters for Board-level reviewers).
- Keep the prototype file organised by journey (one Figma page/frame group per UJ) so it is easy to jump to a specific step during a live session.

---

## 10. Timeline & Effort Guide

- Prototype build: approximately 2–3 weeks with one UX designer supported part-time by a developer/BA for content accuracy.
- Client walkthrough sessions: allow 1 week to schedule and run 3–5 sessions (one per persona group is often more productive than one large mixed session).
- Feedback consolidation and SRS update: 3–5 working days after the last session.

*This is a lightweight planning guide, not a committed schedule — confirm actual dates against team availability.*

---

## 11. Client Walkthrough & Validation Script

Run one structured session per persona group where possible. For each screen shown, ask the question below, and record the answer directly against the SRS section it affects — this table becomes the working input to SRS v1.1.

| Screen / step shown | Question to ask the client | SRS impact (confirmed / changed / new) |
|---|---|---|
| Audit Universe | Is this how you currently group auditable branches/processes/products? What's missing? | |
| Risk Assessment & Heatmap | Does this scoring approach resemble your current risk methodology? What factors are we missing? | |
| Annual Audit Plan & Approval | Who actually approves this today — CAE only, or Board/Audit Committee too? What happens if it's rejected? | |
| Engagement Setup | Are these the right fields for scope/objective? What do you currently call an "engagement"? | |
| Workpaper Workspace | Is this close to your current Excel/Word workpaper structure? What would auditors resist changing? | |
| Review Queue | How many review levels do you have today (team lead, manager, CAE)? Can a workpaper be returned more than once? | |
| Findings Register & Finding Detail | Does condition/criteria/cause/consequence/recommendation match your report format? What severity labels do you use? | |
| Action Plan & Closure Validation | Who validates evidence before a finding is closed? Can branches reopen their own findings? | |
| Branch Audit Workspace | Is this usable by a branch manager with no audit background? | |
| CAE / Board Dashboards | What does your current board pack contain that isn't shown here? | |
| CAAT / AI "vision" screen | Is this direction of interest for phase 2, or should we deprioritise it? | |

*For every answer, tag the impact as Confirmed (no SRS change), Changed (existing SRS requirement needs updating), or New (a requirement not currently in the SRS). Anything tagged Changed or New should be traced back to the specific SRS requirement ID or section before sign-off.*

---

## 12. Exit Criteria for This Phase

- All 5 core journeys (UJ-01, UJ-02, UJ-03, UJ-04, UJ-08) walked through with at least one representative from each of the 5 personas.
- Every row in the validation script (Section 11) has a captured answer and an SRS impact tag.
- Terminology and severity/SLA definitions confirmed and reflected in the SRS glossary.
- MVP screen list confirmed — P0 vs P1 vs deferred, per the Blueprint's screen list.
- The 8 architecture decisions in Blueprint Section 16 (e.g. single-bank vs multi-tenant, evidence storage, rules engine DSL) are answered, at least directionally.
- SRS updated and reissued as v1.1 "Client-Validated"; MVP Development Backlog re-groomed against the confirmed scope.
- Only after this is the backlog ready for story-level estimation and Sprint 1 planning.

---

## Appendix A — Prototype Screen Catalog

25 screens covering the five core journeys plus one static Phase-2 preview. Each row is a working brief for the UX designer and a validation prompt for the client session.

| ID | Screen | Purpose | Key elements / primary actions | Client validation question |
|---|---|---|---|---|
| AUTH-1 | Login | Entry point for all roles | Employee ID/email + password, SSO button, MFA prompt | Does the bank already have SSO/AD the prototype should visually reference? |
| HOME-1 | Role Dashboard | Landing page per role, shows tasks/alerts | KPI tiles, task list, shortcuts — content differs by persona | Which 3–4 numbers matter most to each role on day one? |
| AU-1 | Audit Universe | List of all auditable entities/processes | Filterable list/tree, risk indicator per item, "add engagement" shortcut | Is the hierarchy branch-first, process-first, or both? |
| AU-2 | Universe Detail | Single entity's risk/control/audit history | Risk score trend, linked controls, prior findings, coverage flag | What history do auditors expect to see before scoping? |
| RISK-1 | Risk Register | All risks with scores and owners | List with inherent/residual score, owner, linked controls | Are risk owners individuals or departments in your structure? |
| RISK-2 | Risk Assessment | Score a risk via questionnaire | Factor questionnaire, computed score, evidence attach, approval | What scoring formula/weights do you currently use, if any? |
| RISK-3 | Risk Heatmap | Visual risk distribution | Matrix by branch/process/category, click-through to detail | Which two axes matter most — likelihood/impact, or something else? |
| PLAN-1 | Annual Audit Plan | Build the risk-ranked plan | Ranked universe list, proposed engagements, resourcing, timing | How far in advance is the plan usually built and revised? |
| PLAN-2 | Plan Approval | Review/approve the plan | Comment thread, approve/reject, version history | Single approver or a committee sign-off? |
| PLAN-3 | Coverage Map | Risk coverage vs. planned audits | Gap indicator, stale-assessment flag | How do you currently spot an under-audited area? |
| ENG-1 | Engagement Register | Search/filter all engagements | Status/type/branch/risk filters, list view | What statuses do you track today beyond open/closed? |
| ENG-2 | Engagement Setup | Define a new engagement | Objective, scope, period, team, linked risks/controls | What must be locked before fieldwork can start? |
| ENG-3 | Audit Program | Procedures mapped to risks/controls | Procedure list, template picker, customise per engagement | Do you already have standard procedure templates we should mirror? |
| FIELD-1 | Workpaper Workspace | Execute a test/procedure | Procedure, sample, result, notes, reviewer status | What does a completed workpaper look like today — can you share one? |
| FIELD-2 | Evidence Vault | Upload/view evidence | Upload, metadata, version history, access log | What evidence formats are most common (scans, exports, screenshots)? |
| FIELD-3 | Review Queue | Reviewer clears/returns workpapers | Queue list, comment, clear/return, sign-off | How many review rounds are typical before sign-off? |
| BRANCH-1 | Branch Audit Workspace | Digital branch checklist | Checklist, risk grade, exceptions, findings | Would branch managers use this directly, or only auditors on-site? |
| FIND-1 | Findings Register | All findings by severity/status/owner | Filterable list, severity/status/due-date columns | What severity labels and SLA days do you use today? |
| FIND-2 | Finding Detail | Single finding write-up | Condition/criteria/cause/consequence/recommendation, response | Does this match your current report paragraph structure? |
| FIND-3 | Action Plan | Remediation tracking | Owner, milestones, due date, evidence, status | Who typically owns remediation — branch, department, or individual? |
| FIND-4 | Closure Validation | Validate evidence, close/reopen | Evidence review, close/reopen approval | Who has authority to reopen a closed finding? |
| REPORT-1 | CAE Dashboard | Plan progress, coverage, findings, overdue actions | KPI tiles, charts, drill-down links | What does the CAE currently check first thing each morning? |
| REPORT-2 | Board Dashboard | Executive, read-only view | High-risk findings, top risks, overdue remediation, trend | What does today's printed board pack include that we're missing? |
| REPORT-3 | Branch Dashboard | Branch-level status | Risk grade, findings, exceptions, audit status | Would branch managers want to see peer branches, or only their own? |
| VISION-1 | CAAT / AI Preview (static) | Show direction only, not interactive | Sample exception queue and AI alert mock-up, labelled "Phase 2" | Confirm interest level before we commit build effort here |
