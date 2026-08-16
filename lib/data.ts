// Padma Bank PLC (Demo) — mock data for the Bank Internal Audit / GRC / CAAT clickable prototype.
// Fictitious data only. Structured to mirror the SRS/Blueprint entity model (Section 5 of blueprint).

export type Severity = 'Critical' | 'High' | 'Medium' | 'Low'
export type FindingStatus = 'Open' | 'In Progress' | 'Pending Response' | 'Pending Validation' | 'Overdue' | 'Closed'
export type EngagementStatus = 'Scoping' | 'Fieldwork' | 'Review' | 'Draft Report' | 'Management Response' | 'Report Issued' | 'Closed'
export type PersonaId = 'cae' | 'manager' | 'auditor' | 'branch' | 'board'

export interface Persona {
  id: PersonaId
  name: string
  title: string
  initials: string
  blurb: string
  journeys: string[]
  readOnly?: boolean
}

export const personas: Persona[] = [
  {
    id: 'cae',
    name: 'Ayesha Rahman',
    title: 'Chief Audit Executive',
    initials: 'AR',
    blurb: 'Owns the audit universe, risk methodology, annual plan and final sign-off.',
    journeys: ['UJ-01 Annual Planning', 'UJ-04 Finding to Closure', 'UJ-08 Board Reporting'],
  },
  {
    id: 'manager',
    name: 'Shafiq Rahman',
    title: 'Audit Manager',
    initials: 'SR',
    blurb: 'Runs engagement setup, fieldwork review and finding sign-off for assigned engagements.',
    journeys: ['UJ-02 New Audit Engagement', 'UJ-03 Auditor Fieldwork (reviewer view)'],
  },
  {
    id: 'auditor',
    name: 'Nusrat Akter',
    title: 'Senior Auditor',
    initials: 'NA',
    blurb: 'Executes procedures, tests samples, attaches evidence and drafts findings.',
    journeys: ['UJ-03 Auditor Fieldwork', 'Branch Audit Workspace'],
  },
  {
    id: 'branch',
    name: 'Kamal Hossain',
    title: 'Branch Manager, Gulshan Branch',
    initials: 'KH',
    blurb: 'Responds to findings, uploads remediation evidence, tracks branch audit status.',
    journeys: ['Finding response', 'Action plan submission'],
    readOnly: false,
  },
  {
    id: 'board',
    name: 'Dr. Farida Yasmin',
    title: 'Audit Committee Member',
    initials: 'FY',
    blurb: 'Read-only oversight of plan status, high-risk findings and remediation trends.',
    journeys: ['UJ-08 Board Reporting (read-only)'],
    readOnly: true,
  },
]

export const bank = {
  name: 'Padma Bank PLC (Demo)',
  tagline: 'Internal Audit, Risk & Compliance — Prototype Workspace',
  divisions: ['Dhaka Division', 'Chattogram Division', 'Sylhet Division'],
  branches: [
    { id: 'BR-01', name: 'Motijheel Corporate Branch', division: 'Dhaka Division', isHeadOffice: true },
    { id: 'BR-02', name: 'Gulshan Branch', division: 'Dhaka Division' },
    { id: 'BR-03', name: 'Uttara Branch', division: 'Dhaka Division' },
    { id: 'BR-04', name: 'Agrabad Branch', division: 'Chattogram Division' },
    { id: 'BR-05', name: 'GEC Circle Branch', division: 'Chattogram Division' },
    { id: 'BR-06', name: 'Zindabazar Branch', division: 'Sylhet Division' },
  ],
}

// ---------------------------------------------------------------------------
// AU — Audit Universe
// ---------------------------------------------------------------------------
export interface UniverseItem {
  id: string
  name: string
  category: 'Branch Operations' | 'Credit & Loans' | 'Treasury' | 'IT & Security' | 'HR & Payroll' | 'Procurement' | 'Trade Finance' | 'AML/CFT' | 'Digital Banking'
  owner: string
  inherentRisk: number // 1-5
  residualRisk: number // 1-5
  lastAudited: string
  coverage: 'Covered' | 'Gap' | 'Stale assessment'
  linkedRisks: string[]
  priorFindings: number
}

export const universeItems: UniverseItem[] = [
  { id: 'AU-101', name: 'Credit Underwriting & NPL Management', category: 'Credit & Loans', owner: 'Head of Credit', inherentRisk: 5, residualRisk: 4, lastAudited: '2025-03-10', coverage: 'Covered', linkedRisks: ['RISK-01', 'RISK-06'], priorFindings: 4 },
  { id: 'AU-102', name: 'Branch Operations — Motijheel Corporate', category: 'Branch Operations', owner: 'Branch Manager, Motijheel', inherentRisk: 3, residualRisk: 2, lastAudited: '2025-06-02', coverage: 'Covered', linkedRisks: ['RISK-02'], priorFindings: 2 },
  { id: 'AU-103', name: 'Branch Operations — Gulshan', category: 'Branch Operations', owner: 'Branch Manager, Gulshan', inherentRisk: 3, residualRisk: 3, lastAudited: '2024-11-18', coverage: 'Stale assessment', linkedRisks: ['RISK-02', 'RISK-08'], priorFindings: 3 },
  { id: 'AU-104', name: 'Treasury & Market Risk', category: 'Treasury', owner: 'Head of Treasury', inherentRisk: 4, residualRisk: 3, lastAudited: '2025-05-21', coverage: 'Covered', linkedRisks: ['RISK-03'], priorFindings: 1 },
  { id: 'AU-105', name: 'IT & Information Security', category: 'IT & Security', owner: 'CIO Office', inherentRisk: 5, residualRisk: 4, lastAudited: '2025-01-15', coverage: 'Covered', linkedRisks: ['RISK-04', 'RISK-09'], priorFindings: 3 },
  { id: 'AU-106', name: 'HR & Payroll Administration', category: 'HR & Payroll', owner: 'Head of HR', inherentRisk: 2, residualRisk: 2, lastAudited: '2024-09-30', coverage: 'Gap', linkedRisks: ['RISK-05'], priorFindings: 0 },
  { id: 'AU-107', name: 'Procurement & Vendor Management', category: 'Procurement', owner: 'Head of Procurement', inherentRisk: 3, residualRisk: 2, lastAudited: '2024-08-12', coverage: 'Gap', linkedRisks: ['RISK-07'], priorFindings: 1 },
  { id: 'AU-108', name: 'Trade Finance Operations', category: 'Trade Finance', owner: 'Head of Trade', inherentRisk: 4, residualRisk: 3, lastAudited: '2025-02-04', coverage: 'Covered', linkedRisks: ['RISK-03'], priorFindings: 2 },
  { id: 'AU-109', name: 'AML/CFT Compliance', category: 'AML/CFT', owner: 'Chief Compliance Officer', inherentRisk: 5, residualRisk: 3, lastAudited: '2025-04-27', coverage: 'Covered', linkedRisks: ['RISK-09', 'RISK-01'], priorFindings: 2 },
  { id: 'AU-110', name: 'Card & Digital Banking Channels', category: 'Digital Banking', owner: 'Head of Digital Banking', inherentRisk: 4, residualRisk: 4, lastAudited: '2024-07-09', coverage: 'Stale assessment', linkedRisks: ['RISK-04', 'RISK-08'], priorFindings: 1 },
]

// ---------------------------------------------------------------------------
// RISK — Risk Register / Assessment / Heatmap
// ---------------------------------------------------------------------------
export interface Risk {
  id: string
  statement: string
  category: string
  owner: string
  likelihood: number // 1-5
  impact: number // 1-5
  inherentScore: number
  residualScore: number
  controlEffectiveness: 'Effective' | 'Partially Effective' | 'Ineffective' | 'Not Tested'
  linkedControls: string[]
  universeItems: string[]
}

export const risks: Risk[] = [
  { id: 'RISK-01', statement: 'Credit underwriting exceeds delegated approval authority', category: 'Credit Risk', owner: 'Head of Credit', likelihood: 4, impact: 5, inherentScore: 20, residualScore: 12, controlEffectiveness: 'Partially Effective', linkedControls: ['CTRL-01', 'CTRL-02'], universeItems: ['AU-101', 'AU-109'] },
  { id: 'RISK-02', statement: 'Branch cash and vault controls not consistently performed', category: 'Operational Risk', owner: 'COO Office', likelihood: 3, impact: 4, inherentScore: 12, residualScore: 8, controlEffectiveness: 'Partially Effective', linkedControls: ['CTRL-03'], universeItems: ['AU-102', 'AU-103'] },
  { id: 'RISK-03', statement: 'Treasury dealing limits breached without timely escalation', category: 'Market Risk', owner: 'Head of Treasury', likelihood: 2, impact: 5, inherentScore: 10, residualScore: 6, controlEffectiveness: 'Effective', linkedControls: ['CTRL-04'], universeItems: ['AU-104', 'AU-108'] },
  { id: 'RISK-04', statement: 'Privileged IT access not recertified on schedule', category: 'IT / Cyber Risk', owner: 'CIO Office', likelihood: 4, impact: 4, inherentScore: 16, residualScore: 12, controlEffectiveness: 'Partially Effective', linkedControls: ['CTRL-05'], universeItems: ['AU-105', 'AU-110'] },
  { id: 'RISK-05', statement: 'Terminated employee data not deactivated promptly', category: 'HR Risk', owner: 'Head of HR', likelihood: 2, impact: 2, inherentScore: 4, residualScore: 3, controlEffectiveness: 'Effective', linkedControls: ['CTRL-06'], universeItems: ['AU-106'] },
  { id: 'RISK-06', statement: 'Loan restructuring used to mask delinquency', category: 'Credit Risk', owner: 'Head of Credit', likelihood: 3, impact: 4, inherentScore: 12, residualScore: 9, controlEffectiveness: 'Not Tested', linkedControls: ['CTRL-02'], universeItems: ['AU-101'] },
  { id: 'RISK-07', statement: 'Vendor selection lacks segregation of duties', category: 'Operational Risk', owner: 'Head of Procurement', likelihood: 2, impact: 3, inherentScore: 6, residualScore: 4, controlEffectiveness: 'Effective', linkedControls: ['CTRL-07'], universeItems: ['AU-107'] },
  { id: 'RISK-08', statement: 'Digital banking transaction monitoring gaps for new channels', category: 'IT / Cyber Risk', owner: 'Head of Digital Banking', likelihood: 4, impact: 3, inherentScore: 12, residualScore: 9, controlEffectiveness: 'Partially Effective', linkedControls: ['CTRL-05'], universeItems: ['AU-110', 'AU-103'] },
  { id: 'RISK-09', statement: 'AML/CFT alert backlog exceeds regulatory SLA', category: 'Compliance Risk', owner: 'Chief Compliance Officer', likelihood: 3, impact: 5, inherentScore: 15, residualScore: 10, controlEffectiveness: 'Partially Effective', linkedControls: ['CTRL-08'], universeItems: ['AU-109', 'AU-105'] },
]

// 5x5 heatmap: rows = impact (5 at top .. 1 at bottom), cols = likelihood (1..5)
export const heatmapCells: number[][] = [
  [2, 3, 4, 5, 5],
  [1, 2, 3, 4, 5],
  [1, 2, 3, 3, 4],
  [1, 1, 2, 3, 3],
  [1, 1, 1, 2, 2],
]

// ---------------------------------------------------------------------------
// PLAN — Annual Audit Plan
// ---------------------------------------------------------------------------
export interface PlanItem {
  id: string
  universeItemId: string
  title: string
  quarter: 'Q1' | 'Q2' | 'Q3' | 'Q4'
  riskRationale: string
  leadAuditor: string
  effortDays: number
  status: 'Proposed' | 'Approved'
}

export const planItems: PlanItem[] = [
  { id: 'PLN-01', universeItemId: 'AU-101', title: 'Credit Risk & NPL Management', quarter: 'Q1', riskRationale: 'Highest inherent risk (20); repeat findings in last 2 cycles', leadAuditor: 'S. Rahman', effortDays: 18, status: 'Approved' },
  { id: 'PLN-02', universeItemId: 'AU-105', title: 'IT & Information Security', quarter: 'Q1', riskRationale: 'Privileged access recertification gap; regulatory ICT guideline', leadAuditor: 'N. Akter', effortDays: 15, status: 'Approved' },
  { id: 'PLN-03', universeItemId: 'AU-109', title: 'AML/CFT Compliance', quarter: 'Q2', riskRationale: 'Alert backlog risk; Bangladesh Bank regulatory exposure', leadAuditor: 'M. Hossain', effortDays: 12, status: 'Approved' },
  { id: 'PLN-04', universeItemId: 'AU-104', title: 'Treasury & Market Risk', quarter: 'Q2', riskRationale: 'High impact risk category despite effective controls', leadAuditor: 'M. Hossain', effortDays: 10, status: 'Approved' },
  { id: 'PLN-05', universeItemId: 'AU-103', title: 'Branch Operations — Gulshan', quarter: 'Q3', riskRationale: 'Stale risk assessment; 3 prior findings outstanding', leadAuditor: 'A. Karim', effortDays: 8, status: 'Approved' },
  { id: 'PLN-06', universeItemId: 'AU-110', title: 'Card & Digital Banking Channels', quarter: 'Q3', riskRationale: 'Stale assessment; monitoring gap on new channels', leadAuditor: 'A. Karim', effortDays: 10, status: 'Approved' },
  { id: 'PLN-07', universeItemId: 'AU-108', title: 'Trade Finance Operations', quarter: 'Q4', riskRationale: 'High inherent risk; supports coverage cadence', leadAuditor: 'S. Rahman', effortDays: 9, status: 'Proposed' },
  { id: 'PLN-08', universeItemId: 'AU-107', title: 'Procurement & Vendor Management', quarter: 'Q4', riskRationale: 'Coverage gap; no audit in 18 months', leadAuditor: 'N. Akter', effortDays: 7, status: 'Proposed' },
]

export const annualPlan = {
  period: 'FY2025-26',
  version: 'v1.3',
  status: 'Pending Board Approval' as 'Draft' | 'Pending Board Approval' | 'Approved',
  submittedBy: 'Ayesha Rahman, CAE',
  submittedOn: '2026-07-28',
  approver: 'Audit Committee — Padma Bank PLC',
  totalUniverseItems: 10,
  plannedCoveragePct: 80,
  totalEffortDays: 89,
  comments: [
    { author: 'Dr. Farida Yasmin (Audit Committee)', date: '2026-08-02', text: 'Please confirm resourcing for Q1 given two high-effort engagements run concurrently.' },
    { author: 'Ayesha Rahman (CAE)', date: '2026-08-04', text: 'Confirmed — IT & AML leads are cross-trained; no resourcing conflict expected.' },
  ],
}

// ---------------------------------------------------------------------------
// ENG — Engagements
// ---------------------------------------------------------------------------
export interface Engagement {
  id: string
  title: string
  universeItemId: string
  type: string
  owner: string
  team: string[]
  status: EngagementStatus
  risk: Severity
  progress: number
  period: string
  objective: string
  scope: string
  startDate: string
  dueDate: string
  linkedRisks: string[]
}

export const engagements: Engagement[] = [
  { id: 'ENG-26-018', title: 'Credit Risk & NPL Management', universeItemId: 'AU-101', type: 'Credit Audit', owner: 'S. Rahman', team: ['N. Akter', 'R. Islam'], status: 'Fieldwork', risk: 'Critical', progress: 72, period: 'Q1 FY2025-26', objective: 'Assess adequacy of credit underwriting controls and NPL classification accuracy.', scope: 'Corporate & SME loan book originated Jul 2025 – Jun 2026, Motijheel & Gulshan branches.', startDate: '2026-07-06', dueDate: '2026-09-18', linkedRisks: ['RISK-01', 'RISK-06'] },
  { id: 'ENG-26-021', title: 'IT & Information Security', universeItemId: 'AU-105', type: 'IT/IS Audit', owner: 'N. Akter', team: ['K. Chowdhury'], status: 'Review', risk: 'High', progress: 91, period: 'Q1 FY2025-26', objective: 'Evaluate privileged access management and ICT Security Guideline 2023 alignment.', scope: 'Core banking privileged accounts, access recertification logs, Jan–Jun 2026.', startDate: '2026-06-01', dueDate: '2026-08-21', linkedRisks: ['RISK-04', 'RISK-09'] },
  { id: 'ENG-26-014', title: 'AML/CFT Compliance', universeItemId: 'AU-109', type: 'Compliance Audit', owner: 'M. Hossain', team: ['A. Karim', 'R. Islam'], status: 'Draft Report', risk: 'High', progress: 88, period: 'Q2 FY2025-26', objective: 'Test AML alert disposition timeliness against regulatory SLA.', scope: 'STR/SAR alert queue and disposition records, Jan–Jun 2026.', startDate: '2026-06-15', dueDate: '2026-09-21', linkedRisks: ['RISK-09'] },
  { id: 'ENG-26-023', title: 'Branch Operations — Gulshan', universeItemId: 'AU-103', type: 'Branch Audit', owner: 'A. Karim', team: ['N. Akter'], status: 'Scoping', risk: 'Medium', progress: 18, period: 'Q3 FY2025-26', objective: 'Assess cash management, account opening and clearing controls.', scope: 'Gulshan Branch operations, Apr–Sep 2026.', startDate: '2026-08-10', dueDate: '2026-10-16', linkedRisks: ['RISK-02', 'RISK-08'] },
]

// ---------------------------------------------------------------------------
// ENG-3 — Audit Program (procedures)
// ---------------------------------------------------------------------------
export interface Procedure {
  id: string
  engagementId: string
  title: string
  linkedRisk: string
  method: 'Sample testing' | 'Full population' | 'Walkthrough' | 'Inquiry'
  status: 'Not started' | 'In progress' | 'Under review' | 'Cleared'
  assignedTo: string
}

export const procedures: Procedure[] = [
  { id: 'PRC-01', engagementId: 'ENG-26-018', title: 'Test sample of loans above delegated approval authority for correct sign-off', linkedRisk: 'RISK-01', method: 'Sample testing', status: 'Cleared', assignedTo: 'N. Akter' },
  { id: 'PRC-02', engagementId: 'ENG-26-018', title: 'Recompute NPL classification against BB guidelines for 25 accounts', linkedRisk: 'RISK-01', method: 'Sample testing', status: 'Under review', assignedTo: 'N. Akter' },
  { id: 'PRC-03', engagementId: 'ENG-26-018', title: 'Review restructured loans for evergreening indicators', linkedRisk: 'RISK-06', method: 'Full population', status: 'In progress', assignedTo: 'R. Islam' },
  { id: 'PRC-04', engagementId: 'ENG-26-018', title: 'Walkthrough of credit approval workflow with Head of Credit', linkedRisk: 'RISK-01', method: 'Walkthrough', status: 'Cleared', assignedTo: 'S. Rahman' },
  { id: 'PRC-05', engagementId: 'ENG-26-021', title: 'Test privileged account recertification evidence for Q1-Q2', linkedRisk: 'RISK-04', method: 'Sample testing', status: 'Cleared', assignedTo: 'K. Chowdhury' },
  { id: 'PRC-06', engagementId: 'ENG-26-021', title: 'Confirm terminated employees deactivated within SLA', linkedRisk: 'RISK-05', method: 'Full population', status: 'Cleared', assignedTo: 'N. Akter' },
]

// ---------------------------------------------------------------------------
// FIELD — Workpapers & Evidence
// ---------------------------------------------------------------------------
export interface Workpaper {
  id: string
  procedureId: string
  engagementId: string
  title: string
  preparer: string
  reviewer: string
  reviewStatus: 'Not submitted' | 'Pending review' | 'Returned' | 'Cleared'
  version: number
  sampleSize?: number
  populationSize?: number
  result: 'Not started' | 'No exceptions' | 'Exceptions noted'
  notes: string
  reviewerComment?: string
}

export const workpapers: Workpaper[] = [
  { id: 'WP-101', procedureId: 'PRC-01', engagementId: 'ENG-26-018', title: 'Delegated authority sign-off testing', preparer: 'N. Akter', reviewer: 'S. Rahman', reviewStatus: 'Cleared', version: 3, sampleSize: 30, populationSize: 214, result: 'No exceptions', notes: 'All 30 sampled loans had appropriate sign-off within delegated authority limits.' },
  { id: 'WP-102', procedureId: 'PRC-02', engagementId: 'ENG-26-018', title: 'NPL classification recomputation', preparer: 'N. Akter', reviewer: 'S. Rahman', reviewStatus: 'Pending review', version: 2, sampleSize: 25, populationSize: 25, result: 'Exceptions noted', notes: '3 of 25 accounts classified as Standard should be Sub-Standard per days-past-due criteria.', reviewerComment: 'Please attach the BB classification circular reference and re-confirm days-past-due source.' },
  { id: 'WP-103', procedureId: 'PRC-03', engagementId: 'ENG-26-018', title: 'Restructured loan evergreening review', preparer: 'R. Islam', reviewer: 'S. Rahman', reviewStatus: 'Not submitted', version: 1, populationSize: 47, result: 'Not started', notes: '' },
  { id: 'WP-104', procedureId: 'PRC-05', engagementId: 'ENG-26-021', title: 'Privileged access recertification testing', preparer: 'K. Chowdhury', reviewer: 'N. Akter', reviewStatus: 'Cleared', version: 2, sampleSize: 18, populationSize: 42, result: 'Exceptions noted', notes: '5 of 18 privileged accounts had no recertification evidence for Q2.' },
  { id: 'WP-105', procedureId: 'PRC-06', engagementId: 'ENG-26-021', title: 'Terminated employee access deactivation', preparer: 'N. Akter', reviewer: 'N. Akter', reviewStatus: 'Cleared', version: 1, populationSize: 12, result: 'No exceptions', notes: 'All 12 terminated employees deactivated within 24 hours per HRMS export.' },
]

export interface EvidenceItem {
  id: string
  workpaperId: string
  fileName: string
  type: 'Scanned voucher' | 'Screenshot' | 'Exported report' | 'Policy document'
  uploadedBy: string
  uploadedOn: string
  sizeKb: number
  checksum: string
}

export const evidence: EvidenceItem[] = [
  { id: 'EVD-01', workpaperId: 'WP-101', fileName: 'Loan_Approval_Signoff_Sample_30.pdf', type: 'Scanned voucher', uploadedBy: 'N. Akter', uploadedOn: '2026-08-01', sizeKb: 4820, checksum: 'a1f9…3d2c' },
  { id: 'EVD-02', workpaperId: 'WP-102', fileName: 'NPL_Classification_CBS_Export.xlsx', type: 'Exported report', uploadedBy: 'N. Akter', uploadedOn: '2026-08-03', sizeKb: 210, checksum: 'b77e…9a41' },
  { id: 'EVD-03', workpaperId: 'WP-102', fileName: 'DPD_Ageing_Screenshot.png', type: 'Screenshot', uploadedBy: 'N. Akter', uploadedOn: '2026-08-03', sizeKb: 640, checksum: 'c204…1177' },
  { id: 'EVD-04', workpaperId: 'WP-104', fileName: 'IAM_Recertification_Log_Q2.xlsx', type: 'Exported report', uploadedBy: 'K. Chowdhury', uploadedOn: '2026-07-22', sizeKb: 95, checksum: 'd450…0e88' },
  { id: 'EVD-05', workpaperId: 'WP-105', fileName: 'HRMS_Termination_Export.csv', type: 'Exported report', uploadedBy: 'N. Akter', uploadedOn: '2026-07-19', sizeKb: 38, checksum: 'e912…44bc' },
]

// ---------------------------------------------------------------------------
// BRANCH — Branch Audit Workspace
// ---------------------------------------------------------------------------
export interface BranchChecklistItem {
  id: string
  section: 'Cash & Vault' | 'Account Opening' | 'Clearing' | 'Loan Operations' | 'AML/CFT' | 'IT & Physical Security'
  question: string
  status: 'Not started' | 'Compliant' | 'Exception'
  note?: string
}

export const branchChecklist: BranchChecklistItem[] = [
  { id: 'BC-01', section: 'Cash & Vault', question: 'Dual custody maintained for vault access at all times', status: 'Compliant' },
  { id: 'BC-02', section: 'Cash & Vault', question: 'Surprise cash counts performed and evidenced monthly', status: 'Exception', note: 'No surprise count evidence for May 2026.' },
  { id: 'BC-03', section: 'Account Opening', question: 'KYC documents complete for sampled new accounts', status: 'Compliant' },
  { id: 'BC-04', section: 'Clearing', question: 'Outward clearing cheques authorised by two signatories', status: 'Compliant' },
  { id: 'BC-05', section: 'Loan Operations', question: 'Collateral documents held in fire-proof safe with register', status: 'Not started' },
  { id: 'BC-06', section: 'AML/CFT', question: 'Suspicious transaction alerts cleared within branch SLA', status: 'Exception', note: '2 alerts open beyond 5-day branch SLA.' },
  { id: 'BC-07', section: 'IT & Physical Security', question: 'CCTV coverage operational for vault and teller counters', status: 'Compliant' },
]

export const branchRiskGrade = { branch: 'Gulshan Branch', grade: 'Amber', score: 62, trend: 'down' as 'up' | 'down' | 'flat', priorGrade: 'Green' }

// ---------------------------------------------------------------------------
// FIND — Findings
// ---------------------------------------------------------------------------
export interface Finding {
  id: string
  title: string
  engagementId: string
  area: string
  severity: Severity
  status: FindingStatus
  owner: string
  raisedOn: string
  dueOn: string
  ageDays: number
  slaDays: number
  condition: string
  criteria: string
  cause: string
  consequence: string
  recommendation: string
  managementResponse?: string
  repeatFinding: boolean
}

export const findings: Finding[] = [
  { id: 'FND-2601', title: 'Credit underwriting exceptions above delegated authority', engagementId: 'ENG-26-018', area: 'Credit Risk', severity: 'Critical', status: 'Overdue', owner: 'Head of Credit', raisedOn: '2026-07-20', dueOn: '2026-08-03', ageDays: 24, slaDays: 7, condition: '3 of 30 sampled loans were approved by an officer without delegated authority for that exposure band.', criteria: 'Credit Policy Manual v4.2, Section 6.3 — delegated approval matrix.', cause: 'System does not hard-stop approvals outside the delegated authority matrix.', consequence: 'Increased credit risk exposure and potential regulatory criticism.', recommendation: 'Implement system-enforced approval routing tied to the delegated authority matrix.', managementResponse: 'Agreed. IT change request raised, targeted for Sep 2026 release.', repeatFinding: false },
  { id: 'FND-2602', title: 'NPL classification understated for 3 accounts', engagementId: 'ENG-26-018', area: 'Credit Risk', severity: 'Critical', status: 'Overdue', owner: 'Head of Credit', raisedOn: '2026-08-05', dueOn: '2026-08-12', ageDays: 8, slaDays: 7, condition: '3 accounts classified as Standard should be Sub-Standard based on days-past-due.', criteria: 'Bangladesh Bank loan classification circular; internal classification SOP.', cause: 'Manual days-past-due calculation error during month-end classification run.', consequence: 'Understated provisioning and misstated asset quality reporting.', recommendation: 'Automate days-past-due calculation from CBS feed; remove manual step.', repeatFinding: true },
  { id: 'FND-2603', title: 'Privileged access recertification not evidenced', engagementId: 'ENG-26-021', area: 'Technology', severity: 'High', status: 'In Progress', owner: 'CIO Office', raisedOn: '2026-07-28', dueOn: '2026-08-27', ageDays: 16, slaDays: 15, condition: '5 of 18 privileged accounts sampled had no recertification evidence for Q2 2026.', criteria: 'IT Access Management Policy — quarterly recertification requirement.', cause: 'Recertification reminders not tracked centrally; relies on manual email follow-up.', consequence: 'Elevated risk of unauthorised or stale privileged access.', recommendation: 'Introduce automated recertification workflow with escalation.', managementResponse: 'Access review tool being evaluated; interim manual tracker deployed.', repeatFinding: false },
  { id: 'FND-2604', title: 'AML alert disposition backlog beyond SLA', engagementId: 'ENG-26-014', area: 'Compliance', severity: 'High', status: 'Pending Response', owner: 'Chief Compliance Officer', raisedOn: '2026-08-10', dueOn: '2026-08-25', ageDays: 3, slaDays: 15, condition: '212 alerts remained open beyond the 5-day internal SLA during the review period.', criteria: 'AML/CFT Compliance Manual — alert disposition SLA.', cause: 'Alert volume increased 40% after new digital channel launch; staffing not scaled.', consequence: 'Potential regulatory exposure for delayed STR/SAR assessment.', recommendation: 'Scale compliance analyst capacity and prioritise high-risk alert triage.', repeatFinding: false },
  { id: 'FND-2605', title: 'Branch cash surprise counts not consistently performed', engagementId: 'ENG-26-023', area: 'Operations', severity: 'Medium', status: 'Open', owner: 'COO Office', raisedOn: '2026-08-11', dueOn: '2026-09-10', ageDays: 2, slaDays: 30, condition: 'No evidence of surprise cash count at Gulshan Branch for May 2026.', criteria: 'Branch Operations Manual — monthly surprise cash count requirement.', cause: 'Branch manager on extended leave; no delegate assigned the task.', consequence: 'Reduced deterrence against cash misappropriation.', recommendation: 'Formalise delegate assignment for control tasks during manager absence.', repeatFinding: false },
  { id: 'FND-2606', title: 'AML/CFT alerts open beyond branch SLA', engagementId: 'ENG-26-023', area: 'Compliance', severity: 'Medium', status: 'In Progress', owner: 'Branch Manager, Gulshan', raisedOn: '2026-08-09', dueOn: '2026-09-08', ageDays: 4, slaDays: 30, condition: '2 suspicious transaction alerts open beyond the 5-day branch SLA.', criteria: 'AML/CFT Compliance Manual — branch-level alert SLA.', cause: 'Branch compliance officer role vacant since June 2026.', consequence: 'Delayed escalation of potentially suspicious activity.', recommendation: 'Backfill branch compliance officer role; interim coverage from regional team.', repeatFinding: true },
  { id: 'FND-2607', title: 'Collateral register not maintained for sampled loans', engagementId: 'ENG-26-023', area: 'Credit Risk', severity: 'Medium', status: 'Open', owner: 'Branch Manager, Gulshan', raisedOn: '2026-08-11', dueOn: '2026-09-10', ageDays: 2, slaDays: 30, condition: 'Collateral safe-custody register incomplete for 4 of 15 sampled loan files.', criteria: 'Loan Operations Manual — collateral register requirement.', cause: 'Register updates not enforced as part of loan disbursement checklist.', consequence: 'Difficulty tracing collateral documents if required for recovery.', recommendation: 'Add register update as a mandatory disbursement checklist step.', repeatFinding: false },
  { id: 'FND-2608', title: 'Vendor onboarding missing segregation of duties evidence', engagementId: 'ENG-26-018', area: 'Procurement', severity: 'Low', status: 'Closed', owner: 'Head of Procurement', raisedOn: '2026-05-14', dueOn: '2026-06-28', ageDays: 45, slaDays: 45, condition: 'Vendor onboarding approvals lacked documented second-reviewer sign-off for 2 vendors.', criteria: 'Procurement Policy — segregation of duties requirement.', cause: 'Manual approval form did not have a mandatory second-signature field.', consequence: 'Reduced assurance over vendor selection integrity.', recommendation: 'Update vendor onboarding form to require second-reviewer signature.', managementResponse: 'Form updated and rolled out 20 Jun 2026.', repeatFinding: false },
  { id: 'FND-2609', title: 'Odd-hour teller transactions not reviewed', engagementId: 'ENG-26-023', area: 'Operations', severity: 'Low', status: 'Closed', owner: 'Branch Manager, Gulshan', raisedOn: '2026-04-22', dueOn: '2026-06-06', ageDays: 45, slaDays: 45, condition: '6 teller transactions posted outside normal branch hours without supervisor review note.', criteria: 'Branch Operations Manual — after-hours transaction review requirement.', cause: 'Supervisor review checklist did not explicitly flag after-hours transactions.', consequence: 'Reduced oversight of unusual-timing transactions.', recommendation: 'Add after-hours flag to daily supervisor review checklist.', managementResponse: 'Checklist updated 30 May 2026; reviewed for one month with no repeat exceptions.', repeatFinding: false },
  { id: 'FND-2610', title: 'Suspense account entries aged beyond policy', engagementId: 'ENG-26-014', area: 'Finance', severity: 'Medium', status: 'Pending Validation', owner: 'Head of Finance', raisedOn: '2026-06-30', dueOn: '2026-07-30', ageDays: 44, slaDays: 30, condition: '11 suspense account entries aged beyond the 30-day policy threshold.', criteria: 'GL & Suspense Account Policy — 30-day clearance requirement.', cause: 'Reconciliation backlog during system migration period.', consequence: 'Reduced accuracy of financial position reporting.', recommendation: 'Clear backlog and implement automated ageing alerts.', managementResponse: 'Backlog cleared; automated alert configured, evidence submitted for validation.', repeatFinding: false },
  { id: 'FND-2611', title: 'Terminated employee retained system access beyond 24h', engagementId: 'ENG-26-021', area: 'Technology', severity: 'High', status: 'Closed', owner: 'CIO Office', raisedOn: '2026-05-02', dueOn: '2026-05-17', ageDays: 15, slaDays: 15, condition: 'One terminated employee retained core banking access for 3 days post-termination.', criteria: 'IT Access Management Policy — same-day deactivation requirement.', cause: 'HRMS-to-IAM deactivation feed delayed due to a batch job failure.', consequence: 'Unauthorised access risk during the exposure window.', recommendation: 'Add monitoring alert for HRMS-IAM feed failures.', managementResponse: 'Monitoring alert implemented 10 May 2026; validated by IT audit.', repeatFinding: false },
]

export interface ActionPlanItem {
  findingId: string
  owner: string
  dueDate: string
  status: 'Not started' | 'In progress' | 'Evidence submitted' | 'Validated'
  milestones: { title: string; done: boolean; date: string }[]
  evidenceFiles: string[]
}

export const actionPlans: ActionPlanItem[] = [
  { findingId: 'FND-2601', owner: 'Head of Credit', dueDate: '2026-09-15', status: 'In progress', milestones: [
    { title: 'IT change request approved', done: true, date: '2026-08-05' },
    { title: 'System-enforced routing built in UAT', done: false, date: '2026-08-30' },
    { title: 'Deployed to production', done: false, date: '2026-09-15' },
  ], evidenceFiles: ['CR_Approval_Email.pdf'] },
  { findingId: 'FND-2603', owner: 'CIO Office', dueDate: '2026-08-27', status: 'In progress', milestones: [
    { title: 'Interim manual tracker deployed', done: true, date: '2026-08-01' },
    { title: 'Recertification workflow tool selected', done: true, date: '2026-08-12' },
    { title: 'Automated workflow live', done: false, date: '2026-08-27' },
  ], evidenceFiles: ['Manual_Tracker_v1.xlsx'] },
  { findingId: 'FND-2610', owner: 'Head of Finance', dueDate: '2026-07-30', status: 'Evidence submitted', milestones: [
    { title: 'Backlog cleared', done: true, date: '2026-07-20' },
    { title: 'Automated ageing alert configured', done: true, date: '2026-07-28' },
    { title: 'Validation evidence submitted', done: true, date: '2026-07-30' },
  ], evidenceFiles: ['Suspense_Clearance_Report.pdf', 'Alert_Config_Screenshot.png'] },
]

// ---------------------------------------------------------------------------
// Dashboard aggregates (board-pack style)
// ---------------------------------------------------------------------------
export const dashboardStats = {
  planCoveragePct: 85,
  riskCoveragePct: 78,
  activeEngagements: 4,
  openFindings: findings.filter((f) => f.status !== 'Closed').length,
  overdueCriticalFindings: findings.filter((f) => f.severity === 'Critical' && f.status === 'Overdue').length,
  overdueActions: findings.filter((f) => f.status === 'Overdue').length,
  closedThisQuarter: findings.filter((f) => f.status === 'Closed').length,
  findingsBySeverity: {
    Critical: findings.filter((f) => f.severity === 'Critical').length,
    High: findings.filter((f) => f.severity === 'High').length,
    Medium: findings.filter((f) => f.severity === 'Medium').length,
    Low: findings.filter((f) => f.severity === 'Low').length,
  },
  topRisks: risks.slice().sort((a, b) => b.residualScore - a.residualScore).slice(0, 5),
}

export const severityOrder: Severity[] = ['Critical', 'High', 'Medium', 'Low']

export function severityTone(s: Severity) {
  return s.toLowerCase()
}

export function daysUntil(dateStr: string) {
  const diff = (new Date(dateStr).getTime() - new Date('2026-08-13').getTime()) / 86400000
  return Math.round(diff)
}
