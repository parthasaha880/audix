'use client'

import { useMemo, useState } from 'react'
import {
  CheckCircle2, ChevronRight, CircleAlert, Filter, RotateCcw, Send, ShieldCheck, TriangleAlert,
} from 'lucide-react'
import {
  findings as findingsSeed, actionPlans, severityOrder, type Finding, type Persona,
} from '@/lib/data'
import { Badge, Callout, Drawer, FieldRow, Panel, PanelHead, StatusBadge, StatusStepper, cn } from '../shell/ui'

const lifecycle = ['Draft', 'Internal Review', 'Issued', 'Management Response', 'Action in Progress', 'Evidence Submitted', 'Validation', 'Closed']
function stepFor(status: string) {
  const map: Record<string, number> = {
    Open: 2, 'Pending Response': 3, 'In Progress': 4, Overdue: 4, 'Pending Validation': 6, Closed: 7,
  }
  return map[status] ?? 2
}

// ---------------- FIND-1 / FIND-2 : Findings Register + Detail ----------------
export function FindingsRegisterScreen({ persona }: { persona: Persona }) {
  const [list, setList] = useState(findingsSeed)
  const [severity, setSeverity] = useState('All')
  const [status, setStatus] = useState('All')
  const [selected, setSelected] = useState<Finding | null>(null)
  const [response, setResponse] = useState('')

  const statuses = ['All', ...Array.from(new Set(list.map((f) => f.status)))]
  const filtered = useMemo(
    () => list.filter((f) => (severity === 'All' || f.severity === severity) && (status === 'All' || f.status === status)),
    [list, severity, status],
  )

  const issueFinding = () => {
    if (!selected) return
    setList((l) => l.map((f) => (f.id === selected.id ? { ...f, status: 'Pending Response' } : f)))
    setSelected((s) => (s ? { ...s, status: 'Pending Response' } : s))
  }
  const submitResponse = () => {
    if (!selected) return
    setList((l) => l.map((f) => (f.id === selected.id ? { ...f, status: 'In Progress', managementResponse: response } : f)))
    setSelected((s) => (s ? { ...s, status: 'In Progress', managementResponse: response } : s))
    setResponse('')
  }

  return (
    <>
      <Panel>
        <PanelHead kicker="FIND-1 · UJ-04 FINDING TO CLOSURE" title="Findings register" description="All findings by severity, status, owner and due date, spread across the sample audit cycle." />
        <div className="filter-bar">
          <label className="searchbox"><Filter size={14} /><input placeholder="Search findings…" /></label>
          <select value={severity} onChange={(e) => setSeverity(e.target.value)}><option>All</option>{severityOrder.map((s) => <option key={s}>{s}</option>)}</select>
          <select value={status} onChange={(e) => setStatus(e.target.value)}>{statuses.map((s) => <option key={s}>{s}</option>)}</select>
          <span className="chip">{filtered.length} of {list.length}</span>
        </div>
        <div className="table-wrap">
          <table>
            <thead><tr><th>Finding</th><th>Area</th><th>Severity</th><th>Status</th><th>Owner</th><th>Due</th></tr></thead>
            <tbody>
              {filtered.map((f) => (
                <tr key={f.id} onClick={() => setSelected(f)}>
                  <td><b>{f.title}</b><span>{f.id}{f.repeatFinding ? ' · repeat finding' : ''}</span></td>
                  <td>{f.area}</td>
                  <td><StatusBadge value={f.severity} /></td>
                  <td><StatusBadge value={f.status} /></td>
                  <td>{f.owner}</td>
                  <td>{f.dueOn}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Panel>

      <Drawer open={!!selected} onClose={() => setSelected(null)} kicker={`FIND-2 · ${selected?.id ?? ''}`} title={selected?.title ?? ''}>
        {selected && (
          <div style={{ width: 'min(34vw, 480px)', maxWidth: 'none' }}>
            <StatusStepper steps={lifecycle} current={stepFor(selected.status)} />

            {selected.status === 'Overdue' && (
              <Callout tone="danger" title="SLA breached"><TriangleAlert size={12} style={{ verticalAlign: -2, marginRight: 4 }} />This {selected.severity.toLowerCase()} finding is {selected.ageDays - selected.slaDays} day(s) past its {selected.slaDays}-day SLA and has been escalated per NTF-004.</Callout>
            )}
            {selected.repeatFinding && <Callout tone="warning" title="Repeat finding">This condition was previously raised in an earlier engagement — risk score increases automatically per FR-FND-007.</Callout>}

            <FieldRow label="Severity" value={<StatusBadge value={selected.severity} />} />
            <FieldRow label="Status" value={<StatusBadge value={selected.status} />} />
            <FieldRow label="Owner" value={selected.owner} />
            <FieldRow label="Raised" value={selected.raisedOn} />
            <FieldRow label="Due" value={`${selected.dueOn} (SLA ${selected.slaDays}d)`} />

            <div className="section-title">Condition</div>
            <p className="panel-description" style={{ marginBottom: 0 }}>{selected.condition}</p>
            <div className="section-title">Criteria</div>
            <p className="panel-description" style={{ marginBottom: 0 }}>{selected.criteria}</p>
            <div className="section-title">Cause</div>
            <p className="panel-description" style={{ marginBottom: 0 }}>{selected.cause}</p>
            <div className="section-title">Consequence</div>
            <p className="panel-description" style={{ marginBottom: 0 }}>{selected.consequence}</p>
            <div className="section-title">Recommendation</div>
            <p className="panel-description" style={{ marginBottom: 0 }}>{selected.recommendation}</p>

            {selected.managementResponse && (
              <>
                <div className="section-title">Management response</div>
                <p className="panel-description" style={{ marginBottom: 0 }}>{selected.managementResponse}</p>
              </>
            )}

            {persona.readOnly ? (
              <Callout tone="info" title="Read-only">Board members can review finding detail but cannot edit status, response or evidence.</Callout>
            ) : (
              <>
                {(selected.status === 'Open') && persona.id !== 'branch' && (
                  <button className="btn-primary full-btn" style={{ marginTop: 18 }} onClick={issueFinding}><Send /> Issue finding to owner</button>
                )}
                {(selected.status === 'Pending Response') && (
                  <div style={{ marginTop: 18 }}>
                    <div className="form-field"><label>Management response</label><textarea value={response} onChange={(e) => setResponse(e.target.value)} placeholder="Describe the corrective action management agrees to take…" /></div>
                    <button className="btn-primary full-btn" disabled={!response.trim()} onClick={submitResponse}><CheckCircle2 /> Submit management response</button>
                  </div>
                )}
              </>
            )}
          </div>
        )}
      </Drawer>
    </>
  )
}

// ---------------- FIND-3 : Action Plan ----------------
export function ActionPlanScreen({ persona }: { persona: Persona }) {
  const [plans, setPlans] = useState(actionPlans)
  const [selectedId, setSelectedId] = useState(actionPlans[0]?.findingId)
  const selected = plans.find((p) => p.findingId === selectedId)
  const finding = findingsSeed.find((f) => f.id === selectedId)

  const toggleMilestone = (idx: number) => {
    setPlans((ps) => ps.map((p) => (p.findingId !== selectedId ? p : { ...p, milestones: p.milestones.map((m, i) => (i === idx ? { ...m, done: !m.done } : m)) })))
  }

  return (
    <div className="two-col">
      <Panel>
        <PanelHead kicker="FIND-3 · UJ-04 FINDING TO CLOSURE" title="Action plan tracker" description="Remediation owner, milestones, due date and evidence per finding." />
        <div className="table-wrap">
          <table>
            <thead><tr><th>Finding</th><th>Owner</th><th>Due</th><th>Status</th><th>Progress</th></tr></thead>
            <tbody>
              {plans.map((p) => {
                const f = findingsSeed.find((x) => x.id === p.findingId)!
                const done = p.milestones.filter((m) => m.done).length
                return (
                  <tr key={p.findingId} onClick={() => setSelectedId(p.findingId)}>
                    <td><b>{f.title}</b><span>{f.id}</span></td>
                    <td>{p.owner}</td>
                    <td>{p.dueDate}</td>
                    <td><StatusBadge value={p.status} /></td>
                    <td>{done}/{p.milestones.length} milestones</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </Panel>
      <Panel>
        <PanelHead kicker="MILESTONES" title={finding?.title ?? 'Select an action plan'} />
        {selected && finding ? (
          <>
            <FieldRow label="Owner" value={selected.owner} />
            <FieldRow label="Due date" value={selected.dueDate} />
            <FieldRow label="Status" value={<StatusBadge value={selected.status} />} />
            <div className="section-title">Milestones</div>
            <div className="checklist">
              {selected.milestones.map((m, i) => (
                <div className="checklist-item" key={m.title} onClick={() => !persona.readOnly && toggleMilestone(i)} style={{ cursor: persona.readOnly ? 'default' : 'pointer' }}>
                  <div className={cn('checklist-icon', m.done ? 'ok' : 'pending')}>{m.done ? <CheckCircle2 size={11} /> : <ChevronRight size={11} />}</div>
                  <div><b>{m.title}</b><p>{m.date}</p></div>
                </div>
              ))}
            </div>
            <div className="section-title">Evidence</div>
            <div className="link-list">{selected.evidenceFiles.map((e) => <div className="link-row" key={e}><span>{e}</span></div>)}</div>
          </>
        ) : <p className="panel-description">Choose an action plan to see milestone detail.</p>}
      </Panel>
    </div>
  )
}

// ---------------- FIND-4 : Closure Validation ----------------
export function ClosureValidationScreen({ persona }: { persona: Persona }) {
  const [list, setList] = useState(findingsSeed)
  const queue = list.filter((f) => f.status === 'Pending Validation')
  const [selected, setSelected] = useState<Finding | null>(queue[0] ?? null)
  const [reason, setReason] = useState('')

  const close = () => { if (!selected) return; setList((l) => l.map((f) => (f.id === selected.id ? { ...f, status: 'Closed' } : f))); setSelected(null) }
  const reopen = () => { if (!selected) return; setList((l) => l.map((f) => (f.id === selected.id ? { ...f, status: 'In Progress' } : f))); setSelected(null); setReason('') }

  return (
    <div className="two-col">
      <Panel>
        <PanelHead kicker="FIND-4 · UJ-04 FINDING TO CLOSURE" title="Closure validation queue" description="Findings with evidence submitted, awaiting independent validation before close." />
        <div className="link-list">
          {queue.length === 0 && <p className="panel-description">No findings currently awaiting closure validation.</p>}
          {queue.map((f) => (
            <button key={f.id} className="link-row" style={{ width: '100%', cursor: 'pointer' }} onClick={() => setSelected(f)}>
              <span><ShieldCheck size={12} style={{ verticalAlign: -2, marginRight: 6 }} />{f.title}</span>
              <StatusBadge value={f.severity} />
            </button>
          ))}
        </div>
        <div className="section-title">Recently closed</div>
        <div className="link-list">
          {list.filter((f) => f.status === 'Closed').slice(0, 4).map((f) => <div className="link-row" key={f.id}><span>{f.title}</span><StatusBadge value="Closed" /></div>)}
        </div>
      </Panel>
      <Panel>
        <PanelHead kicker="VALIDATION" title={selected ? selected.title : 'Select a finding'} />
        {selected ? (
          <>
            <FieldRow label="Management response" value={selected.managementResponse ?? '—'} />
            <FieldRow label="Owner" value={selected.owner} />
            <FieldRow label="Due" value={selected.dueOn} />
            {persona.readOnly ? (
              <Callout tone="info" title="Read-only">Only the CAE or an authorised manager can validate closure evidence and close or reopen a finding.</Callout>
            ) : (
              <>
                <div className="form-field" style={{ margin: '16px 0' }}>
                  <label>Validation note (required to reopen)</label>
                  <textarea value={reason} onChange={(e) => setReason(e.target.value)} placeholder="Reason if returning to remediation…" />
                </div>
                <div style={{ display: 'flex', gap: 10 }}>
                  <button className="btn-primary" onClick={close}><CheckCircle2 /> Validate &amp; close</button>
                  <button className="btn-secondary" disabled={!reason.trim()} onClick={reopen}><RotateCcw /> Reopen finding</button>
                </div>
              </>
            )}
          </>
        ) : <p className="panel-description">Select a finding from the queue to review its remediation evidence.</p>}
      </Panel>
    </div>
  )
}
