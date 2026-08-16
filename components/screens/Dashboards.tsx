'use client'

import {
  Activity, ArrowUpRight, CircleAlert, ClipboardCheck, Download, FileBarChart, Network, Target,
  TrendingDown, Zap,
} from 'lucide-react'
import {
  dashboardStats, engagements, findings, heatmapCells, risks, branchRiskGrade, branchChecklist,
  bank, type Persona,
} from '@/lib/data'
import { Badge, Panel, PanelHead, ProgressBar, StatusBadge } from '../shell/ui'
import { useToast } from '../shell/toast'

function Metric({ label, value, change, icon: Icon, tone }: { label: string; value: string; change: string; icon: any; tone: string }) {
  return (
    <div className="metric-card">
      <div className="metric-top"><div className={`metric-icon ${tone}`}><Icon /></div><span className="metric-change">{change}</span></div>
      <div className="metric-value">{value}</div><div className="metric-label">{label}</div>
    </div>
  )
}

export function HomeDashboard({ persona, onNavigate }: { persona: Persona; onNavigate: (id: string) => void }) {
  if (persona.id === 'cae') return <CaeDashboardScreen onNavigate={onNavigate} />
  if (persona.id === 'board') return <BoardDashboardScreen />
  if (persona.id === 'branch') return <BranchDashboardScreen />
  return <OperationalOverview persona={persona} onNavigate={onNavigate} />
}

// ---------------- Manager / Auditor operational overview ----------------
function OperationalOverview({ persona, onNavigate }: { persona: Persona; onNavigate: (id: string) => void }) {
  const priority = findings.filter((f) => f.status !== 'Closed').slice(0, 4)
  return (
    <>
      <section className="metric-grid">
        <Metric label="My open procedures" value="6" change="2 due this week" icon={ClipboardCheck} tone="cyan" />
        <Metric label="Workpapers pending review" value="1" change="Awaiting your clearance" icon={Activity} tone="violet" />
        <Metric label="Findings I own" value={String(priority.length)} change="Needs attention" icon={CircleAlert} tone="orange" />
        <Metric label="Engagements assigned" value={String(engagements.length)} change="1 in review" icon={Zap} tone="rose" />
      </section>
      <div className="dashboard-grid lower-grid">
        <Panel>
          <PanelHead kicker="EXECUTION PIPELINE" title="Active engagements" action={<button className="text-btn" onClick={() => onNavigate('engagements')}>View all <ArrowUpRight /></button>} />
          <div className="table-wrap">
            <table>
              <thead><tr><th>Engagement</th><th>Lead</th><th>Status</th><th>Progress</th><th>Due</th></tr></thead>
              <tbody>{engagements.map((e) => <tr key={e.id} onClick={() => onNavigate('engagements')}><td><b>{e.title}</b><span>{e.id} · {e.risk} risk</span></td><td>{e.owner}</td><td><StatusBadge value={e.status} /></td><td><ProgressBar value={e.progress} /></td><td>{e.dueDate}</td></tr>)}</tbody>
            </table>
          </div>
        </Panel>
        <Panel>
          <PanelHead kicker="ATTENTION REQUIRED" title="Priority findings" action={<button className="text-btn" onClick={() => onNavigate('findings')}>{priority.length} open <ArrowUpRight /></button>} />
          {priority.map((f) => (
            <button className="finding-row" key={f.id} onClick={() => onNavigate('findings')}>
              <span className={`severity severity-${f.severity.toLowerCase()}`} />
              <div><b>{f.title}</b><span>{f.area} · {f.owner}</span></div>
              <StatusBadge value={f.severity} />
            </button>
          ))}
        </Panel>
      </div>
    </>
  )
}

// ---------------- REPORT-1 : CAE Dashboard ----------------
export function CaeDashboardScreen({ onNavigate }: { onNavigate: (id: string) => void }) {
  return (
    <>
      <section className="metric-grid">
        <Metric label="Plan coverage" value={`${dashboardStats.planCoveragePct}%`} change="FY2025-26 baseline" icon={Target} tone="cyan" />
        <Metric label="Open findings" value={String(dashboardStats.openFindings)} change={`${dashboardStats.overdueCriticalFindings} overdue critical`} icon={CircleAlert} tone="orange" />
        <Metric label="Active engagements" value={String(dashboardStats.activeEngagements)} change="1 in draft report" icon={ClipboardCheck} tone="violet" />
        <Metric label="Overdue actions" value={String(dashboardStats.overdueActions)} change="Needs attention" icon={Zap} tone="rose" />
      </section>
      <div className="dashboard-grid">
        <Panel>
          <PanelHead kicker="PORTFOLIO SIGNAL" title="Enterprise risk posture" action={<button className="text-btn" onClick={() => onNavigate('risk-heatmap')}>Open heatmap <ArrowUpRight /></button>} />
          <div className="risk-summary">
            <div className="risk-score">3.6<span>/5.0</span><small>Weighted risk score</small></div>
            <div className="risk-bars">
              <div><span>Inherent risk</span><div className="bar"><i style={{ width: '76%' }} /></div><b>High</b></div>
              <div><span>Residual risk</span><div className="bar residual"><i style={{ width: '52%' }} /></div><b>Moderate</b></div>
            </div>
          </div>
          <div className="heatmap-mini">{heatmapCells.flat().map((v, i) => <button key={i} className={`heat-${v}`} onClick={() => onNavigate('risk-heatmap')} />)}</div>
          <div className="heatmap-legend"><span><i className="dot low" /> Low</span><span><i className="dot medium" /> Medium</span><span><i className="dot high" /> High</span><span><i className="dot critical" /> Critical</span></div>
        </Panel>
        <Panel>
          <PanelHead kicker="ANNUAL PLAN" title="Plan progress" />
          <div className="ai-card">
            <div className="ai-card-top"><Network /><Badge tone="info">FY2025-26 · v1.3</Badge></div>
            <h3>{dashboardStats.riskCoveragePct}% of ranked risk universe covered</h3>
            <p>8 engagements planned across 4 quarters; Q1 engagements are in fieldwork, Q3–Q4 items are pending final resourcing confirmation.</p>
            <button className="btn-dark" onClick={() => onNavigate('annual-plan')}>Open annual plan <ArrowUpRight /></button>
          </div>
          <div className="mini-activity"><Activity /><span><b>{dashboardStats.closedThisQuarter}</b> findings closed this quarter</span></div>
          <div className="mini-activity"><TrendingDown /><span><b>{dashboardStats.overdueCriticalFindings}</b> overdue critical finding(s) need escalation</span></div>
        </Panel>
      </div>
      <div className="dashboard-grid lower-grid">
        <Panel>
          <PanelHead kicker="EXECUTION PIPELINE" title="Active engagements" action={<button className="text-btn" onClick={() => onNavigate('engagements')}>View all <ArrowUpRight /></button>} />
          <div className="table-wrap">
            <table>
              <thead><tr><th>Engagement</th><th>Lead</th><th>Status</th><th>Progress</th><th>Due</th></tr></thead>
              <tbody>{engagements.map((e) => <tr key={e.id} onClick={() => onNavigate('engagements')}><td><b>{e.title}</b><span>{e.id} · {e.risk} risk</span></td><td>{e.owner}</td><td><StatusBadge value={e.status} /></td><td><ProgressBar value={e.progress} /></td><td>{e.dueDate}</td></tr>)}</tbody>
            </table>
          </div>
        </Panel>
        <Panel>
          <PanelHead kicker="ATTENTION REQUIRED" title="Priority findings" action={<button className="text-btn" onClick={() => onNavigate('findings')}>{dashboardStats.openFindings} open <ArrowUpRight /></button>} />
          {findings.filter((f) => f.status !== 'Closed').slice(0, 4).map((f) => (
            <button className="finding-row" key={f.id} onClick={() => onNavigate('findings')}>
              <span className={`severity severity-${f.severity.toLowerCase()}`} />
              <div><b>{f.title}</b><span>{f.area} · {f.owner}</span></div>
              <StatusBadge value={f.severity} />
            </button>
          ))}
        </Panel>
      </div>
    </>
  )
}

// ---------------- REPORT-2 : Board Dashboard ----------------
export function BoardDashboardScreen() {
  const { showToast } = useToast()
  const highSeverity = findings.filter((f) => f.severity === 'Critical' || f.severity === 'High')
  return (
    <>
      <Panel className="page-panel" style={{ marginBottom: 14 }}>
        <PanelHead kicker="REPORT-2 · UJ-08 BOARD REPORTING" title="Board / Audit Committee dashboard" description="Read-only executive view — the same information currently delivered in the printed board pack, available to self-serve and drill into." action={<button className="btn-secondary" onClick={() => showToast('Board pack export (PDF/XLSX) would generate here — see NFR reporting requirements.')}><Download /> Export board pack (PDF)</button>} />
      </Panel>
      <section className="metric-grid">
        <Metric label="Plan status" value={`${dashboardStats.planCoveragePct}%`} change="On track vs FY2025-26 baseline" icon={Target} tone="cyan" />
        <Metric label="Overdue critical findings" value={String(dashboardStats.overdueCriticalFindings)} change="Requires escalation" icon={CircleAlert} tone="rose" />
        <Metric label="High/critical open" value={String(highSeverity.filter((f) => f.status !== 'Closed').length)} change="Across all engagements" icon={Zap} tone="orange" />
        <Metric label="Closed this quarter" value={String(dashboardStats.closedThisQuarter)} change="Validated closures" icon={ClipboardCheck} tone="violet" />
      </section>
      <div className="dashboard-grid">
        <Panel>
          <PanelHead kicker="TOP EMERGING RISKS" title="Highest residual risk" />
          <div className="link-list">
            {dashboardStats.topRisks.map((r) => <div className="link-row" key={r.id}><span>{r.statement}</span><Badge tone={r.residualScore >= 12 ? 'danger' : 'warning'}>Residual {r.residualScore}</Badge></div>)}
          </div>
        </Panel>
        <Panel>
          <PanelHead kicker="HIGH / CRITICAL FINDINGS" title="Requires committee visibility" />
          {highSeverity.map((f) => (
            <div className="finding-row" key={f.id}>
              <span className={`severity severity-${f.severity.toLowerCase()}`} />
              <div><b>{f.title}</b><span>{f.area} · due {f.dueOn}</span></div>
              <StatusBadge value={f.status} />
            </div>
          ))}
        </Panel>
      </div>
    </>
  )
}

// ---------------- REPORT-3 : Branch Dashboard ----------------
export function BranchDashboardScreen() {
  const branchFindings = findings.filter((f) => f.owner.toLowerCase().includes('gulshan'))
  const exceptions = branchChecklist.filter((c) => c.status === 'Exception')
  return (
    <>
      <Panel style={{ marginBottom: 14 }}>
        <PanelHead kicker="REPORT-3 · UJ-08 BOARD REPORTING" title={`Branch dashboard — ${branchRiskGrade.branch}`} description="Branch-level risk grade, open findings, exceptions and current audit status." />
      </Panel>
      <section className="metric-grid">
        <Metric label="Risk grade" value={branchRiskGrade.grade} change={`Score ${branchRiskGrade.score}/100`} icon={Target} tone="orange" />
        <Metric label="Open findings" value={String(branchFindings.filter((f) => f.status !== 'Closed').length)} change="At this branch" icon={CircleAlert} tone="rose" />
        <Metric label="Checklist exceptions" value={String(exceptions.length)} change="Current audit cycle" icon={Zap} tone="violet" />
        <Metric label="Audit status" value="Scoping" change="ENG-26-023 in progress" icon={ClipboardCheck} tone="cyan" />
      </section>
      <div className="dashboard-grid lower-grid">
        <Panel>
          <PanelHead kicker="FINDINGS" title="Findings for this branch" />
          {branchFindings.map((f) => (
            <div className="finding-row" key={f.id}>
              <span className={`severity severity-${f.severity.toLowerCase()}`} />
              <div><b>{f.title}</b><span>{f.area} · due {f.dueOn}</span></div>
              <StatusBadge value={f.status} />
            </div>
          ))}
        </Panel>
        <Panel>
          <PanelHead kicker="CHECKLIST EXCEPTIONS" title="Open items" />
          <div className="link-list">{exceptions.map((e) => <div className="link-row" key={e.id}><span>{e.question}</span><Badge tone="danger">Exception</Badge></div>)}</div>
        </Panel>
      </div>
    </>
  )
}
