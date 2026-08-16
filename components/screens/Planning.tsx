'use client'

import { useEffect, useMemo, useState } from 'react'
import {
  ArrowUpRight, CalendarDays, CheckCircle2, ChevronRight, FileWarning, Filter, Map as MapIcon,
  Network, PlusCircle, ShieldAlert, Sparkles, TriangleAlert,
} from 'lucide-react'
import {
  universeItems, risks, heatmapCells, planItems, annualPlan, type UniverseItem, type Risk, type Persona,
} from '@/lib/data'
import { Badge, Callout, Drawer, EmptyState, FieldRow, Panel, PanelHead, StatusBadge, cn } from '../shell/ui'
import { useToast } from '../shell/toast'

// ---------------- AU-1 / AU-2 : Audit Universe ----------------
export function UniverseScreen({
  persona, focusId, onFocusHandled, onOpenRisk,
}: {
  persona: Persona
  focusId?: string | null
  onFocusHandled?: () => void
  onOpenRisk?: (riskId: string) => void
}) {
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('All')
  const [selected, setSelected] = useState<UniverseItem | null>(null)
  const [addedIds, setAddedIds] = useState<Set<string>>(new Set())
  const categories = ['All', ...Array.from(new Set(universeItems.map((u) => u.category)))]
  const filtered = useMemo(
    () => universeItems.filter((u) => (category === 'All' || u.category === category) && u.name.toLowerCase().includes(query.toLowerCase())),
    [query, category],
  )
  const linkedRisks = (u: UniverseItem) => risks.filter((r) => u.linkedRisks.includes(r.id))

  useEffect(() => {
    if (!focusId) return
    const item = universeItems.find((u) => u.id === focusId)
    if (item) setSelected(item)
    onFocusHandled?.()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [focusId])

  return (
    <>
      <Panel>
        <PanelHead kicker="AU-1 · UJ-01 ANNUAL PLANNING" title="Audit universe" description="All auditable branches, processes, products and systems, ranked by risk. Click a row to inspect its risk, control and audit history before scoping." />
        <div className="filter-bar">
          <label className="searchbox"><Filter size={14} /><input placeholder="Search universe items…" value={query} onChange={(e) => setQuery(e.target.value)} /></label>
          <select value={category} onChange={(e) => setCategory(e.target.value)}>{categories.map((c) => <option key={c}>{c}</option>)}</select>
          <span className="chip">{filtered.length} of {universeItems.length} items</span>
        </div>
        <div className="table-wrap">
          <table>
            <thead><tr><th>Universe item</th><th>Category</th><th>Owner</th><th>Inherent</th><th>Residual</th><th>Coverage</th><th>Last audited</th></tr></thead>
            <tbody>
              {filtered.map((u) => (
                <tr key={u.id} onClick={() => setSelected(u)}>
                  <td><b>{u.name}</b><span>{u.id} · {u.priorFindings} prior finding{u.priorFindings === 1 ? '' : 's'}</span></td>
                  <td>{u.category}</td>
                  <td>{u.owner}</td>
                  <td><Badge tone={u.inherentRisk >= 4 ? 'danger' : u.inherentRisk === 3 ? 'warning' : 'success'}>{u.inherentRisk}/5</Badge></td>
                  <td><Badge tone={u.residualRisk >= 4 ? 'danger' : u.residualRisk === 3 ? 'warning' : 'success'}>{u.residualRisk}/5</Badge></td>
                  <td><StatusBadge value={u.coverage} /></td>
                  <td>{u.lastAudited}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Panel>

      <Drawer open={!!selected} onClose={() => setSelected(null)} kicker="AU-2 · UNIVERSE DETAIL" title={selected?.name ?? ''}>
        {selected && (
          <>
            <div className="drawer-score">
              <span className="risk-ring">{selected.inherentRisk}<small>/5</small></span>
              <div><strong>Inherent risk rating</strong><p>Residual {selected.residualRisk}/5 · {selected.coverage}</p></div>
            </div>
            <FieldRow label="Universe ID" value={selected.id} />
            <FieldRow label="Category" value={selected.category} />
            <FieldRow label="Owner" value={selected.owner} />
            <FieldRow label="Last audited" value={selected.lastAudited} />
            <FieldRow label="Prior findings" value={selected.priorFindings} />
            <div className="section-title">Linked risks</div>
            <div className="link-list">
              {linkedRisks(selected).map((r) => (
                <button type="button" className="link-row" key={r.id} style={{ width: '100%', cursor: onOpenRisk ? 'pointer' : 'default' }} onClick={() => onOpenRisk?.(r.id)}>
                  <span>{r.statement}</span>
                  <Badge tone={r.residualScore >= 12 ? 'danger' : r.residualScore >= 8 ? 'warning' : 'success'}>Residual {r.residualScore}</Badge>
                </button>
              ))}
            </div>
            {selected.coverage !== 'Covered' && (
              <Callout tone={selected.coverage === 'Gap' ? 'danger' : 'warning'} title={selected.coverage === 'Gap' ? 'Coverage gap' : 'Stale risk assessment'}>
                {selected.coverage === 'Gap' ? 'No engagement has covered this universe item within the mandatory audit frequency.' : 'The risk assessment for this item is older than the configured refresh cycle and should be revisited before next planning cycle.'}
              </Callout>
            )}
            {!persona.readOnly && (
              addedIds.has(selected.id) ? (
                <Callout tone="success" title="Added to draft plan">{selected.name} has been queued into the FY2026-27 draft annual plan, pending risk ranking and resourcing.</Callout>
              ) : (
                <button className="btn-primary full-btn" onClick={() => setAddedIds((s) => new Set(s).add(selected.id))}>
                  <PlusCircle /> Add to next annual plan
                </button>
              )
            )}
          </>
        )}
      </Drawer>
    </>
  )
}

// ---------------- RISK-1 : Risk Register ----------------
export function RiskRegisterScreen({
  focusId, onFocusHandled, onOpenUniverseItem,
}: {
  focusId?: string | null
  onFocusHandled?: () => void
  onOpenUniverseItem?: (universeItemId: string) => void
} = {}) {
  const [selected, setSelected] = useState<Risk | null>(null)

  useEffect(() => {
    if (!focusId) return
    const risk = risks.find((r) => r.id === focusId)
    if (risk) setSelected(risk)
    onFocusHandled?.()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [focusId])

  return (
    <>
      <Panel>
        <PanelHead kicker="RISK-1 · UJ-01 ANNUAL PLANNING" title="Risk register" description="All identified risks with inherent/residual scores, owners and linked controls." />
        <div className="table-wrap">
          <table>
            <thead><tr><th>Risk</th><th>Category</th><th>Owner</th><th>Likelihood × Impact</th><th>Inherent</th><th>Residual</th><th>Control effectiveness</th></tr></thead>
            <tbody>
              {risks.map((r) => (
                <tr key={r.id} onClick={() => setSelected(r)}>
                  <td><b>{r.statement}</b><span>{r.id} · {r.linkedControls.length} linked control(s)</span></td>
                  <td>{r.category}</td>
                  <td>{r.owner}</td>
                  <td>{r.likelihood} × {r.impact}</td>
                  <td><Badge tone={r.inherentScore >= 15 ? 'danger' : r.inherentScore >= 8 ? 'warning' : 'success'}>{r.inherentScore}</Badge></td>
                  <td><Badge tone={r.residualScore >= 15 ? 'danger' : r.residualScore >= 8 ? 'warning' : 'success'}>{r.residualScore}</Badge></td>
                  <td><StatusBadge value={r.controlEffectiveness} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Panel>
      <Drawer open={!!selected} onClose={() => setSelected(null)} kicker="RISK DETAIL" title={selected?.statement ?? ''}>
        {selected && (
          <>
            <FieldRow label="Risk ID" value={selected.id} />
            <FieldRow label="Category" value={selected.category} />
            <FieldRow label="Owner" value={selected.owner} />
            <FieldRow label="Inherent score" value={`${selected.inherentScore} (L${selected.likelihood} × I${selected.impact})`} />
            <FieldRow label="Residual score" value={selected.residualScore} />
            <FieldRow label="Control effectiveness" value={<StatusBadge value={selected.controlEffectiveness} />} />
            <div className="section-title">Linked universe items</div>
            <div className="link-list">
              {universeItems.filter((u) => selected.universeItems.includes(u.id)).map((u) => (
                <button type="button" className="link-row" key={u.id} style={{ width: '100%', cursor: onOpenUniverseItem ? 'pointer' : 'default' }} onClick={() => onOpenUniverseItem?.(u.id)}>
                  <span>{u.name}</span>
                  <ChevronRight size={14} />
                </button>
              ))}
            </div>
          </>
        )}
      </Drawer>
    </>
  )
}

// ---------------- RISK-2 : Risk Assessment ----------------
export function RiskAssessmentScreen({ persona }: { persona: Persona }) {
  const [riskId, setRiskId] = useState(risks[0].id)
  const [factors, setFactors] = useState({ financial: 4, regulatory: 3, operational: 3, fraud: 2, cyber: 3, management: 2 })
  const [submitted, setSubmitted] = useState(false)
  const risk = risks.find((r) => r.id === riskId)!
  const computed = Math.round((Object.values(factors).reduce((a, b) => a + b, 0) / (Object.values(factors).length * 5)) * 25)

  const factorLabels: Record<string, string> = { financial: 'Financial impact', regulatory: 'Regulatory impact', operational: 'Operational impact', fraud: 'Fraud risk', cyber: 'Cyber / IT risk', management: 'Management concern' }

  return (
    <Panel>
      <PanelHead kicker="RISK-2 · UJ-01 ANNUAL PLANNING" title="Risk assessment questionnaire" description="Score a risk using configurable weighted factors. Weights and scales are administrator-configurable per FR-RISK-002." />
      <div className="two-col">
        <div>
          <div className="form-field" style={{ marginBottom: 20 }}>
            <label>Select risk to assess</label>
            <select value={riskId} onChange={(e) => { setRiskId(e.target.value); setSubmitted(false) }}>
              {risks.map((r) => <option key={r.id} value={r.id}>{r.id} — {r.statement}</option>)}
            </select>
          </div>
          {Object.entries(factors).map(([key, val]) => (
            <div key={key} className="form-field" style={{ marginBottom: 16 }}>
              <label>{factorLabels[key]} — {val}/5</label>
              <input type="range" min={1} max={5} value={val} disabled={persona.readOnly}
                onChange={(e) => setFactors((f) => ({ ...f, [key]: Number(e.target.value) }))} />
            </div>
          ))}
          <div className="upload-zone"><FileWarning /><div>Attach supporting evidence (policy extract, incident log, KRI export)</div></div>
          {!persona.readOnly && (
            <button className="btn-primary" onClick={() => setSubmitted(true)}><CheckCircle2 /> Submit for CAE approval</button>
          )}
          {submitted && <Callout tone="success" title="Submitted">Risk assessment for {risk.id} routed to Ayesha Rahman (CAE) for approval.</Callout>}
        </div>
        <Panel>
          <PanelHead kicker="COMPUTED SCORE" title="Weighted risk score" />
          <div className="risk-score" style={{ marginBottom: 18 }}>{computed}<span>/100</span></div>
          <FieldRow label="Baseline inherent score" value={risk.inherentScore} />
          <FieldRow label="Current residual score" value={risk.residualScore} />
          <FieldRow label="Methodology version" value="v2.1 (configurable)" />
          <FieldRow label="Owner" value={risk.owner} />
        </Panel>
      </div>
    </Panel>
  )
}

// ---------------- RISK-3 : Risk Heatmap ----------------
export function RiskHeatmapScreen() {
  const [cell, setCell] = useState<{ likelihood: number; impact: number } | null>(null)
  const cellRisks = cell ? risks.filter((r) => r.likelihood === cell.likelihood && r.impact === cell.impact) : []
  return (
    <Panel>
      <PanelHead kicker="RISK-3 · UJ-01 ANNUAL PLANNING" title="Risk heatmap" description="Enterprise risk distribution by likelihood × impact. Click a cell to see which risks sit there." />
      <div className="heatmap-full-wrap">
        <div className="heatmap-axis-y">{[5, 4, 3, 2, 1].map((n) => <span key={n}>Impact {n}</span>)}</div>
        <div>
          <div className="heatmap-full">
            {heatmapCells.map((row, ri) => row.map((band, ci) => {
              const impact = 5 - ri
              const likelihood = ci + 1
              const count = risks.filter((r) => r.likelihood === likelihood && r.impact === impact).length
              return (
                <button key={`${ri}-${ci}`} className={`heat-${band}`} onClick={() => setCell({ likelihood, impact })}>
                  {count > 0 ? count : ''}
                </button>
              )
            }))}
          </div>
          <div className="heatmap-axis-x">{[1, 2, 3, 4, 5].map((n) => <span key={n}>Likelihood {n}</span>)}</div>
        </div>
      </div>
      <div className="heatmap-legend" style={{ marginTop: 22 }}>
        <span><i className="dot low" /> Low</span><span><i className="dot medium" /> Medium</span><span><i className="dot high" /> High</span><span><i className="dot critical" /> Critical</span>
      </div>
      {cell && (
        <div style={{ marginTop: 20 }}>
          <div className="section-title">Risks at likelihood {cell.likelihood} × impact {cell.impact}</div>
          {cellRisks.length ? (
            <div className="link-list">{cellRisks.map((r) => <div className="link-row" key={r.id}><span>{r.statement}</span><Badge tone="neutral">{r.category}</Badge></div>)}</div>
          ) : <p className="panel-description">No risks currently scored in this cell.</p>}
        </div>
      )}
    </Panel>
  )
}

// ---------------- PLAN-1 : Annual Audit Plan ----------------
export function AnnualPlanScreen({ persona, onNavigate }: { persona: Persona; onNavigate?: (id: string) => void }) {
  const [showEmpty, setShowEmpty] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const quarters = ['Q1', 'Q2', 'Q3', 'Q4'] as const
  const totalEffort = planItems.reduce((a, b) => a + b.effortDays, 0)

  return (
    <Panel>
      <PanelHead
        kicker="PLAN-1 · UJ-01 ANNUAL PLANNING"
        title={`Annual audit plan — ${annualPlan.period}`}
        description="Risk-ranked engagements proposed for the year, with resourcing and quarter allocation. Every line item traces back to a universe item and its risk rationale."
        action={<div style={{ display: 'flex', gap: 8 }}>
          <button className="btn-secondary" onClick={() => setShowEmpty((v) => !v)}>{showEmpty ? 'Show populated plan' : 'Preview empty state'}</button>
          {!persona.readOnly && (
            <button className="btn-primary" disabled={submitted} onClick={() => { setSubmitted(true); onNavigate?.('plan-approval') }}>
              <ArrowUpRight /> Submit v{annualPlan.version} for approval
            </button>
          )}
        </div>}
      />

      {submitted && <Callout tone="success" title="Submitted for approval">Plan v{annualPlan.version} routed to {annualPlan.approver}. Opening Plan Approval…</Callout>}

      {showEmpty ? (
        <EmptyState icon={CalendarDays} title="No plan items yet" description="Start building the FY2026-27 plan by pulling ranked items from the Audit Universe."
          action={<button className="btn-primary" style={{ marginTop: 14 }} onClick={() => onNavigate?.('universe')}><Network /> Start from Audit Universe</button>} />
      ) : (
        <>
          <div className="kv-grid" style={{ marginBottom: 22 }}>
            <div className="kv-card"><span>Status</span><b><StatusBadge value={annualPlan.status} /></b></div>
            <div className="kv-card"><span>Universe items</span><b>{annualPlan.totalUniverseItems}</b></div>
            <div className="kv-card"><span>Planned coverage</span><b>{annualPlan.plannedCoveragePct}%</b></div>
            <div className="kv-card"><span>Total effort</span><b>{totalEffort} days</b></div>
          </div>
          {quarters.map((q) => {
            const items = planItems.filter((p) => p.quarter === q)
            if (!items.length) return null
            return (
              <div key={q}>
                <div className="section-title">{q} — {items.length} engagement{items.length === 1 ? '' : 's'}</div>
                <div className="table-wrap">
                  <table>
                    <thead><tr><th>Engagement</th><th>Universe item</th><th>Risk rationale</th><th>Lead</th><th>Effort</th><th>Status</th></tr></thead>
                    <tbody>
                      {items.map((p) => (
                        <tr key={p.id}>
                          <td><b>{p.title}</b><span>{p.id}</span></td>
                          <td>{p.universeItemId}</td>
                          <td style={{ whiteSpace: 'normal', maxWidth: 260 }}>{p.riskRationale}</td>
                          <td>{p.leadAuditor}</td>
                          <td>{p.effortDays}d</td>
                          <td><StatusBadge value={p.status} /></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )
          })}
        </>
      )}
    </Panel>
  )
}

// ---------------- PLAN-2 : Plan Approval ----------------
export function PlanApprovalScreen({ persona }: { persona: Persona }) {
  const [status, setStatus] = useState(annualPlan.status)
  const [comment, setComment] = useState('')
  const [comments, setComments] = useState(annualPlan.comments)
  const canApprove = persona.id === 'cae' || persona.id === 'board'

  return (
    <Panel>
      <PanelHead kicker="PLAN-2 · UJ-01 ANNUAL PLANNING" title={`Plan approval — ${annualPlan.period} v${annualPlan.version}`} description="Review, comment and approve or reject the proposed annual audit plan." />
      <div className="two-col">
        <div>
          <FieldRow label="Submitted by" value={annualPlan.submittedBy} />
          <FieldRow label="Submitted on" value={annualPlan.submittedOn} />
          <FieldRow label="Approver" value={annualPlan.approver} />
          <FieldRow label="Status" value={<StatusBadge value={status} />} />

          <div className="section-title">Discussion</div>
          <div className="comment-thread">
            {comments.map((c, i) => <div className="comment" key={i}><b>{c.author}</b><time>{c.date}</time><p>{c.text}</p></div>)}
          </div>
          {!persona.readOnly && (
            <div className="form-field" style={{ marginTop: 8 }}>
              <label>Add a comment</label>
              <textarea value={comment} onChange={(e) => setComment(e.target.value)} placeholder="Add a review comment before approving or rejecting…" />
              <div style={{ display: 'flex', gap: 8, marginTop: 10 }}>
                <button className="btn-secondary" disabled={!comment} onClick={() => { setComments((c) => [...c, { author: persona.name, date: '2026-08-13', text: comment }]); setComment('') }}>Post comment</button>
              </div>
            </div>
          )}

          {status === 'Pending Board Approval' && canApprove && !persona.readOnly && (
            <div style={{ display: 'flex', gap: 10, marginTop: 20 }}>
              <button className="btn-primary" onClick={() => setStatus('Approved')}><CheckCircle2 /> Approve plan</button>
              <button className="btn-secondary" onClick={() => setStatus('Draft')}><TriangleAlert /> Return for revision</button>
            </div>
          )}
          {status === 'Approved' && <Callout tone="success" title="Plan approved">Version {annualPlan.version} is now the baseline plan for {annualPlan.period}.</Callout>}
          {status === 'Draft' && <Callout tone="warning" title="Returned to CAE for revision">The plan has been sent back to draft. The CAE can revise resourcing/timing and resubmit from the Annual Plan screen.</Callout>}
          {persona.readOnly && <Callout tone="info" title="Read-only">Board members can review and comment; approval is recorded by the Audit Committee chair.</Callout>}
        </div>
        <Panel>
          <PanelHead kicker="VERSION HISTORY" title="Plan revisions" />
          <div className="link-list">
            <div className="link-row"><span>v1.3 — current, pending approval</span><Badge tone="warning">Active</Badge></div>
            <div className="link-row"><span>v1.2 — resourcing revised after Risk Committee input</span><span>2026-07-15</span></div>
            <div className="link-row"><span>v1.1 — initial draft from risk ranking</span><span>2026-07-02</span></div>
          </div>
        </Panel>
      </div>
    </Panel>
  )
}

// ---------------- PLAN-3 : Coverage Map ----------------
export function CoverageMapScreen() {
  const plannedIds = new Set(planItems.map((p) => p.universeItemId))
  return (
    <Panel>
      <PanelHead kicker="PLAN-3 · UJ-01 ANNUAL PLANNING" title="Coverage map" description="Every universe item plotted against plan coverage, so gaps and stale assessments are visible before the plan is locked." />
      <div className="table-wrap">
        <table>
          <thead><tr><th>Universe item</th><th>Inherent risk</th><th>In current plan?</th><th>Coverage status</th><th>Flag</th></tr></thead>
          <tbody>
            {universeItems.map((u) => (
              <tr key={u.id}>
                <td><b>{u.name}</b><span>{u.id}</span></td>
                <td><Badge tone={u.inherentRisk >= 4 ? 'danger' : u.inherentRisk === 3 ? 'warning' : 'success'}>{u.inherentRisk}/5</Badge></td>
                <td>{plannedIds.has(u.id) ? <StatusBadge value="Approved" /> : <StatusBadge value="Not Tested" />}</td>
                <td><StatusBadge value={u.coverage} /></td>
                <td>
                  {u.coverage === 'Gap' && <span style={{ color: '#f09e91', display: 'flex', alignItems: 'center', gap: 5, fontSize: 10 }}><ShieldAlert size={13} /> Coverage gap</span>}
                  {u.coverage === 'Stale assessment' && <span style={{ color: '#ddc87d', display: 'flex', alignItems: 'center', gap: 5, fontSize: 10 }}><TriangleAlert size={13} /> Reassess</span>}
                  {u.coverage === 'Covered' && <span style={{ color: '#7fd8ae', display: 'flex', alignItems: 'center', gap: 5, fontSize: 10 }}><MapIcon size={13} /> On track</span>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Panel>
  )
}
