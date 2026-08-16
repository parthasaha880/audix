'use client'

import { useMemo, useState } from 'react'
import {
  ArrowUpRight, CircleCheck, ClipboardList, Filter, ListPlus, TriangleAlert, UserRound,
} from 'lucide-react'
import { engagements, procedures, universeItems, risks, type Engagement, type Persona } from '@/lib/data'
import { Badge, Callout, Drawer, FieldRow, Panel, PanelHead, ProgressBar, StatusBadge } from '../shell/ui'
import { useToast } from '../shell/toast'

// ---------------- ENG-1 : Engagement Register ----------------
export function EngagementRegisterScreen({ onOpenSetup }: { onOpenSetup: () => void }) {
  const [status, setStatus] = useState('All')
  const [selected, setSelected] = useState<Engagement | null>(null)
  const statuses = ['All', ...Array.from(new Set(engagements.map((e) => e.status)))]
  const filtered = useMemo(() => engagements.filter((e) => status === 'All' || e.status === status), [status])

  return (
    <>
      <Panel>
        <PanelHead kicker="ENG-1 · UJ-02 NEW ENGAGEMENT" title="Engagement register" description="Search and filter all engagements by status, type, branch and risk."
          action={<button className="btn-primary" onClick={onOpenSetup}><ListPlus /> New engagement</button>} />
        <div className="filter-bar">
          <label className="searchbox"><Filter size={14} /><input placeholder="Search engagements…" /></label>
          <select value={status} onChange={(e) => setStatus(e.target.value)}>{statuses.map((s) => <option key={s}>{s}</option>)}</select>
        </div>
        <div className="table-wrap">
          <table>
            <thead><tr><th>Engagement</th><th>Type</th><th>Lead</th><th>Status</th><th>Progress</th><th>Risk</th><th>Due date</th></tr></thead>
            <tbody>
              {filtered.map((e) => (
                <tr key={e.id} onClick={() => setSelected(e)}>
                  <td><b>{e.title}</b><span>{e.id}</span></td>
                  <td>{e.type}</td>
                  <td>{e.owner}</td>
                  <td><StatusBadge value={e.status} /></td>
                  <td><ProgressBar value={e.progress} /></td>
                  <td><StatusBadge value={e.risk} /></td>
                  <td>{e.dueDate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Panel>
      <Drawer open={!!selected} onClose={() => setSelected(null)} kicker="ENGAGEMENT DETAIL" title={selected?.title ?? ''}>
        {selected && (
          <>
            <div className="drawer-score"><span className="risk-ring">{selected.progress}<small>%</small></span><div><strong>Execution health</strong><p>{selected.status} · due {selected.dueDate}</p></div></div>
            <FieldRow label="Engagement ID" value={selected.id} />
            <FieldRow label="Type" value={selected.type} />
            <FieldRow label="Lead auditor" value={selected.owner} />
            <FieldRow label="Team" value={selected.team.join(', ')} />
            <FieldRow label="Period" value={selected.period} />
            <FieldRow label="Objective" value={selected.objective} />
            <FieldRow label="Scope" value={selected.scope} />
          </>
        )}
      </Drawer>
    </>
  )
}

// ---------------- ENG-2 : Engagement Setup ----------------
export function EngagementSetupScreen({ persona }: { persona: Persona }) {
  const { showToast } = useToast()
  const base = engagements[3]
  const [scope, setScope] = useState(base.scope)
  const [objective, setObjective] = useState('')
  const [attempted, setAttempted] = useState(false)
  const [viewState, setViewState] = useState<'draft' | 'pending'>('pending')

  const missing = attempted && !objective.trim()

  return (
    <Panel>
      <PanelHead kicker="ENG-2 · UJ-02 NEW ENGAGEMENT" title="Engagement setup" description="Define objective, scope, period, team and risk/control mapping before fieldwork can begin."
        action={<div style={{ display: 'flex', gap: 8 }}>
          <button className="btn-secondary" onClick={() => setViewState(viewState === 'draft' ? 'pending' : 'draft')}>{viewState === 'draft' ? 'Preview pending-approval state' : 'Back to draft'}</button>
        </div>} />

      {viewState === 'pending' ? (
        <Callout tone="warning" title="Pending CAE approval">
          This engagement scope was submitted by {base.owner} on 2026-08-05 and is awaiting approval from Ayesha Rahman (CAE), due 2026-08-16. Fieldwork cannot start until scope is approved (FR-ENG-005 / no fieldwork before required planning approval).
        </Callout>
      ) : missing ? (
        <Callout tone="danger" title="Missing required fields">Objective is required before this engagement can be submitted for approval.</Callout>
      ) : null}

      <div className="form-grid">
        <div className="form-field"><label>Engagement title</label><input defaultValue={base.title} disabled={persona.readOnly} /></div>
        <div className="form-field"><label>Universe item</label><select disabled={persona.readOnly} defaultValue={base.universeItemId}>{universeItems.map((u) => <option key={u.id} value={u.id}>{u.name}</option>)}</select></div>
        <div className="form-field full">
          <label>Objective {missing && <span style={{ color: '#f09e91' }}>· required</span>}</label>
          <textarea placeholder="What must this engagement conclude on?" value={objective} onChange={(e) => setObjective(e.target.value)} disabled={persona.readOnly} />
        </div>
        <div className="form-field full"><label>Scope</label><textarea value={scope} onChange={(e) => setScope(e.target.value)} disabled={persona.readOnly} /></div>
        <div className="form-field"><label>Period start</label><input type="date" defaultValue={base.startDate} disabled={persona.readOnly} /></div>
        <div className="form-field"><label>Period end</label><input type="date" defaultValue={base.dueDate} disabled={persona.readOnly} /></div>
        <div className="form-field"><label>Lead auditor</label><input defaultValue={base.owner} disabled={persona.readOnly} /></div>
        <div className="form-field"><label>Team members</label><input defaultValue={base.team.join(', ')} disabled={persona.readOnly} /></div>
        <div className="form-field full">
          <label>Linked risks / controls</label>
          <div className="filter-bar" style={{ marginBottom: 0 }}>
            {risks.filter((r) => base.linkedRisks.includes(r.id)).map((r) => <span className="chip chip-active" key={r.id}>{r.id}</span>)}
            {!persona.readOnly && <button className="chip" onClick={() => showToast('Risk/control picker would open here — prototype scope covers the mapped risks shown.')}><ListPlus size={11} /> Add risk</button>}
          </div>
        </div>
      </div>

      {!persona.readOnly && (
        <div style={{ display: 'flex', gap: 10, marginTop: 22 }}>
          <button className="btn-secondary" onClick={() => showToast('Draft saved.')}>Save draft</button>
          <button className="btn-primary" onClick={() => setAttempted(true)}><ArrowUpRight /> Submit for CAE approval</button>
        </div>
      )}
    </Panel>
  )
}

// ---------------- ENG-3 : Audit Program ----------------
export function AuditProgramScreen() {
  const [engId, setEngId] = useState(engagements[0].id)
  const eng = engagements.find((e) => e.id === engId)!
  const list = procedures.filter((p) => p.engagementId === engId)

  return (
    <Panel>
      <PanelHead kicker="ENG-3 · UJ-02 NEW ENGAGEMENT" title="Audit program" description="Procedures and test steps mapped to the engagement's risks and controls, customisable from standard templates."
        action={<select value={engId} onChange={(e) => setEngId(e.target.value)}>{engagements.map((e) => <option key={e.id} value={e.id}>{e.title}</option>)}</select>} />
      <div className="kv-grid" style={{ marginBottom: 20 }}>
        <div className="kv-card"><span>Procedures</span><b>{list.length}</b></div>
        <div className="kv-card"><span>Cleared</span><b>{list.filter((p) => p.status === 'Cleared').length}</b></div>
        <div className="kv-card"><span>In progress</span><b>{list.filter((p) => p.status === 'In progress').length}</b></div>
        <div className="kv-card"><span>Template</span><b style={{ fontSize: 12 }}>{eng.type} v3</b></div>
      </div>
      <div className="table-wrap">
        <table>
          <thead><tr><th>Procedure</th><th>Linked risk</th><th>Method</th><th>Assigned to</th><th>Status</th></tr></thead>
          <tbody>
            {list.map((p) => (
              <tr key={p.id}>
                <td><b>{p.title}</b><span>{p.id}</span></td>
                <td>{p.linkedRisk}</td>
                <td>{p.method}</td>
                <td><UserRound size={12} style={{ verticalAlign: -2, marginRight: 4 }} />{p.assignedTo}</td>
                <td><StatusBadge value={p.status} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {!list.length && <Callout tone="info" title="No procedures yet">Generate this engagement's audit program from a standard template mapped to its linked risks and controls.</Callout>}
    </Panel>
  )
}
