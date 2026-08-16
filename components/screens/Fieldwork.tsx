'use client'

import { useState } from 'react'
import {
  CheckCircle2, ChevronRight, CircleAlert, Download, FileText, History, Image as ImageIcon,
  Inbox, Send, ShieldCheck, TriangleAlert, UploadCloud, Users,
} from 'lucide-react'
import {
  workpapers, evidence, engagements, procedures, branchChecklist, branchRiskGrade, bank, findings, type Workpaper, type Persona,
} from '@/lib/data'
import { Badge, Callout, FieldRow, Panel, PanelHead, StatusBadge, cn } from '../shell/ui'
import { useToast } from '../shell/toast'

// ---------------- FIELD-1 : Workpaper Workspace ----------------
export function WorkpaperWorkspaceScreen({ persona }: { persona: Persona }) {
  const { showToast } = useToast()
  const [selectedId, setSelectedId] = useState(workpapers[1].id)
  const [error, setError] = useState(false)
  const wp = workpapers.find((w) => w.id === selectedId)!
  const eng = engagements.find((e) => e.id === wp.engagementId)!
  const proc = procedures.find((p) => p.id === wp.procedureId)

  const trySubmit = () => setError(wp.result === 'Not started' || !wp.notes)

  return (
    <div className="two-col">
      <Panel>
        <PanelHead kicker="FIELD-1 · UJ-03 FIELDWORK" title="Workpaper workspace" description="Execute a procedure: record sample/test result, notes and reviewer status." />
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {workpapers.map((w) => (
            <button key={w.id} className="wp-tile" style={{ textAlign: 'left', width: '100%' }} onClick={() => { setSelectedId(w.id); setError(false) }}>
              <div className="wp-tile-head">
                <b>{w.title}</b>
                <StatusBadge value={w.reviewStatus} />
              </div>
              <p>{engagements.find((e) => e.id === w.engagementId)?.title} · v{w.version} · <StatusBadge value={w.result} /></p>
            </button>
          ))}
        </div>
      </Panel>

      <Panel>
        <PanelHead kicker={wp.id} title={wp.title} description={`${eng.title} · Procedure: ${proc?.title ?? '—'}`} />
        {error && <Callout tone="danger" title="Cannot submit for review">A workpaper must have a recorded test result and preparer notes before it can be submitted for reviewer clearance.</Callout>}
        {wp.reviewStatus === 'Returned' && <Callout tone="warning" title="Returned by reviewer">{wp.reviewerComment}</Callout>}
        {wp.reviewStatus === 'Pending review' && wp.reviewerComment && <Callout tone="warning" title="Reviewer comment">{wp.reviewerComment}</Callout>}

        <FieldRow label="Preparer" value={wp.preparer} />
        <FieldRow label="Reviewer" value={wp.reviewer} />
        <FieldRow label="Sample / population" value={wp.sampleSize ? `${wp.sampleSize} of ${wp.populationSize}` : `${wp.populationSize ?? '—'} (full population)`} />
        <FieldRow label="Result" value={<StatusBadge value={wp.result} />} />
        <FieldRow label="Version" value={`v${wp.version} (prior versions preserved)`} />

        <div className="form-field" style={{ margin: '16px 0' }}>
          <label>Preparer notes</label>
          <textarea defaultValue={wp.notes} disabled={persona.readOnly} placeholder="Describe the test performed and conclusion…" />
        </div>

        <div className="section-title">Evidence attached</div>
        <div className="link-list" style={{ marginBottom: 18 }}>
          {evidence.filter((e) => e.workpaperId === wp.id).map((e) => (
            <div className="link-row" key={e.id}><span><FileText size={12} style={{ verticalAlign: -2, marginRight: 6 }} />{e.fileName}</span><span>{e.type}</span></div>
          ))}
          {!evidence.some((e) => e.workpaperId === wp.id) && <p className="panel-description">No evidence attached yet.</p>}
        </div>

        {!persona.readOnly && (
          <div style={{ display: 'flex', gap: 10 }}>
            <button className="btn-secondary" onClick={() => showToast('Evidence upload dialog would open here — see the Evidence Vault for attached files.')}><UploadCloud /> Attach evidence</button>
            <button className="btn-primary" onClick={trySubmit}><Send /> Submit for review</button>
          </div>
        )}
      </Panel>
    </div>
  )
}

// ---------------- FIELD-2 : Evidence Vault ----------------
export function EvidenceVaultScreen({ persona }: { persona: Persona }) {
  const { showToast } = useToast()
  const [filter, setFilter] = useState('All')
  const types = ['All', ...Array.from(new Set(evidence.map((e) => e.type)))]
  const filtered = evidence.filter((e) => filter === 'All' || e.type === filter)

  return (
    <Panel>
      <PanelHead kicker="FIELD-2 · UJ-03 FIELDWORK" title="Evidence vault" description="Secure evidence storage with metadata, checksum, version history and access logging (FR-WP-002/003)." />
      {!persona.readOnly && (
        <div className="upload-zone"><UploadCloud /><div>Drag files here or click to upload — PDF, Office docs, images and spreadsheets accepted</div></div>
      )}
      <div className="filter-bar">
        {types.map((t) => <button key={t} className={cn('chip', filter === t && 'chip-active')} onClick={() => setFilter(t)}>{t}</button>)}
      </div>
      <div className="evidence-grid">
        {filtered.map((e) => (
          <div className="evidence-card" key={e.id}>
            {e.type === 'Screenshot' ? <ImageIcon /> : <FileText />}
            <b>{e.fileName}</b>
            <span>{e.type} · {(e.sizeKb / 1024).toFixed(1)} MB</span>
            <span>Uploaded {e.uploadedOn} by {e.uploadedBy}</span>
            <span>Checksum {e.checksum}</span>
            <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
              <button className="btn-secondary" style={{ flex: 1, fontSize: 10 }} onClick={() => showToast(`Downloading ${e.fileName} (simulated).`)}><Download size={12} /> Download</button>
              <button className="btn-secondary" style={{ flex: 1, fontSize: 10 }} onClick={() => showToast(`${e.fileName} has 1 version on file — versioning shown once evidence is revised.`)}><History size={12} /> Versions</button>
            </div>
          </div>
        ))}
      </div>
    </Panel>
  )
}

// ---------------- FIELD-3 : Review Queue ----------------
export function ReviewQueueScreen({ persona }: { persona: Persona }) {
  const [queue, setQueue] = useState(workpapers)
  const [selected, setSelected] = useState<Workpaper | null>(workpapers.find((w) => w.reviewStatus === 'Pending review') ?? null)
  const [comment, setComment] = useState('')
  const pending = queue.filter((w) => w.reviewStatus === 'Pending review')

  const act = (action: 'Cleared' | 'Returned') => {
    if (!selected) return
    setQueue((q) => q.map((w) => (w.id === selected.id ? { ...w, reviewStatus: action, reviewerComment: comment || w.reviewerComment } : w)))
    setSelected(null)
    setComment('')
  }

  return (
    <div className="two-col">
      <Panel>
        <PanelHead kicker="FIELD-3 · UJ-03 FIELDWORK" title="Review queue" description="Workpapers awaiting reviewer clearance." />
        <div className="link-list">
          {pending.length === 0 && <p className="panel-description">Queue is empty — all submitted workpapers have been cleared or returned.</p>}
          {pending.map((w) => (
            <button key={w.id} className="link-row" style={{ width: '100%', cursor: 'pointer' }} onClick={() => setSelected(w)}>
              <span><Inbox size={12} style={{ verticalAlign: -2, marginRight: 6 }} />{w.title}</span>
              <ChevronRight size={13} />
            </button>
          ))}
        </div>
      </Panel>
      <Panel>
        <PanelHead kicker="REVIEWER ACTION" title={selected ? selected.title : 'Select a workpaper'} />
        {selected ? (
          <>
            <FieldRow label="Preparer" value={selected.preparer} />
            <FieldRow label="Result" value={<StatusBadge value={selected.result} />} />
            <FieldRow label="Preparer notes" value={selected.notes} />
            {!persona.readOnly && (
              <>
                <div className="form-field" style={{ margin: '16px 0' }}>
                  <label>Reviewer comment</label>
                  <textarea value={comment} onChange={(e) => setComment(e.target.value)} placeholder="Add clearance rationale or return reason…" />
                </div>
                <div style={{ display: 'flex', gap: 10 }}>
                  <button className="btn-primary" onClick={() => act('Cleared')}><CheckCircle2 /> Clear workpaper</button>
                  <button className="btn-secondary" onClick={() => act('Returned')}><TriangleAlert /> Return to preparer</button>
                </div>
              </>
            )}
          </>
        ) : <p className="panel-description">Choose a workpaper from the queue to review its evidence and clear or return it.</p>}
      </Panel>
    </div>
  )
}

// ---------------- BRANCH-1 : Branch Audit Workspace ----------------
export function BranchWorkspaceScreen({ persona }: { persona: Persona }) {
  const [submitted, setSubmitted] = useState(false)
  const sections = Array.from(new Set(branchChecklist.map((c) => c.section)))
  const exceptions = branchChecklist.filter((c) => c.status === 'Exception')
  const branchFindings = findings.filter((f) => f.owner.includes('Gulshan'))

  return (
    <div className="two-col">
      <Panel>
        <PanelHead kicker="BRANCH-1 · BRANCH AUDIT" title={`Branch checklist — ${branchRiskGrade.branch}`} description="Configurable digital checklist covering cash/vault, account opening, clearing, loans, AML/CFT and IT controls." />
        {sections.map((s) => (
          <div key={s}>
            <div className="checklist-section">{s}</div>
            <div className="checklist">
              {branchChecklist.filter((c) => c.section === s).map((c) => (
                <div className="checklist-item" key={c.id}>
                  <div className={cn('checklist-icon', c.status === 'Compliant' ? 'ok' : c.status === 'Exception' ? 'bad' : 'pending')}>
                    {c.status === 'Compliant' ? <CheckCircle2 size={11} /> : c.status === 'Exception' ? <CircleAlert size={11} /> : <ChevronRight size={11} />}
                  </div>
                  <div><b>{c.question}</b>{c.note && <p>{c.note}</p>}</div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </Panel>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        <Panel>
          <PanelHead kicker="BRANCH RISK GRADE" title={branchRiskGrade.grade} />
          <div className="risk-score">{branchRiskGrade.score}<span>/100</span><small>{branchRiskGrade.trend === 'down' ? '↓ down from ' + branchRiskGrade.priorGrade : '→ stable'}</small></div>
        </Panel>
        <Panel>
          <PanelHead kicker="EXCEPTIONS" title={`${exceptions.length} open`} />
          <div className="link-list">
            {exceptions.map((e) => <div className="link-row" key={e.id}><span>{e.question}</span><Badge tone="danger">Exception</Badge></div>)}
          </div>
        </Panel>
        <Panel>
          <PanelHead kicker="LINKED FINDINGS" title={`${branchFindings.length} for this branch`} />
          <div className="link-list">
            {branchFindings.map((f) => <div className="link-row" key={f.id}><span>{f.title}</span><StatusBadge value={f.severity} /></div>)}
          </div>
        </Panel>
        {!persona.readOnly && (
          submitted ? (
            <Callout tone="success" title="Submitted">Checklist routed to the Audit Manager for review, with {exceptions.length} exception(s) flagged.</Callout>
          ) : (
            <button className="btn-primary full-btn" onClick={() => setSubmitted(true)}><ShieldCheck /> Submit checklist for review</button>
          )
        )}
      </div>
    </div>
  )
}
