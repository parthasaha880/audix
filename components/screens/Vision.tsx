'use client'

import { BrainCircuit, Database, GitBranch, Lock, Sparkles, TrendingUp } from 'lucide-react'
import { Callout, Panel, PanelHead } from '../shell/ui'

const alerts = [
  { id: 'AI-9001', entity: 'Account •••4471', factor: 'Amount 6.4x peer median at unusual hour', score: 0.91, model: 'anomaly-v0.3' },
  { id: 'AI-9002', entity: 'Teller U-2281 (Gulshan)', factor: 'Reversal rate 3.2σ above branch peer baseline', score: 0.84, model: 'anomaly-v0.3' },
  { id: 'AI-9003', entity: 'Vendor V-118', factor: 'Employee-vendor contact detail overlap', score: 0.77, model: 'network-v0.1' },
]

export function VisionScreen() {
  return (
    <Panel>
      <PanelHead
        kicker="VISION-1 · STATIC PREVIEW"
        title="CAAT / AI intelligence — direction preview"
        description="Not interactive in this prototype. Shown to confirm appetite for Phase 2 CAAT rule engine and premium AI/ML anomaly detection before committing build effort."
        action={<span className="vision-badge"><Sparkles size={13} /> PHASE 2</span>}
      />
      <Callout tone="info" title="Out of scope for this walkthrough">Per the prototype brief, CAAT and AI are validated directionally only — this screen is a static mock-up, not a working exception queue or alert engine.</Callout>

      <div className="kv-grid" style={{ marginTop: 6, marginBottom: 24 }}>
        <div className="kv-card"><span>CAAT rules ready</span><b>40 designed</b></div>
        <div className="kv-card"><span>MVP rule target</span><b>20–30 live</b></div>
        <div className="kv-card"><span>AI posture</span><b>Advisory only</b></div>
        <div className="kv-card"><span>Human approval</span><b>Mandatory</b></div>
      </div>

      <div className="two-col">
        <div>
          <div className="section-title">Sample CAAT exception queue (mock)</div>
          <div className="table-wrap">
            <table>
              <thead><tr><th>Rule</th><th>Entity</th><th>Reason</th><th>Severity</th></tr></thead>
              <tbody>
                <tr><td><b>CAAT-006</b><span>Dormant activation</span></td><td>Account •••2290</td><td>High-value activity 2 days after dormant reactivation</td><td>High</td></tr>
                <tr><td><b>CAAT-016</b><span>Maker-checker conflict</span></td><td>User U-1042</td><td>Same user performed maker and checker steps</td><td>Critical</td></tr>
                <tr><td><b>CAAT-029</b><span>Invoice duplicate</span></td><td>Vendor V-118</td><td>Near-duplicate invoice within 24h</td><td>Medium</td></tr>
              </tbody>
            </table>
          </div>

          <div className="section-title">AI alert queue (mock)</div>
          <div className="link-list">
            {alerts.map((a) => (
              <div className="link-row" key={a.id}>
                <span><BrainCircuit size={12} style={{ verticalAlign: -2, marginRight: 6 }} />{a.factor}</span>
                <span>{a.entity} · score {a.score}</span>
              </div>
            ))}
          </div>
        </div>
        <Panel>
          <PanelHead kicker="GOVERNANCE PRINCIPLES" title="How AI stays human-in-the-loop" />
          <div className="checklist">
            <div className="checklist-item"><div className="checklist-icon ok"><Lock size={11} /></div><div><b>No autonomous findings</b><p>AI never closes a finding or issues an audit opinion without human approval.</p></div></div>
            <div className="checklist-item"><div className="checklist-icon ok"><TrendingUp size={11} /></div><div><b>Explainable by default</b><p>Every alert shows contributing factors and a peer/baseline comparison.</p></div></div>
            <div className="checklist-item"><div className="checklist-icon ok"><Database size={11} /></div><div><b>Model registry &amp; drift monitoring</b><p>Version, training period, threshold and approval tracked for every model.</p></div></div>
            <div className="checklist-item"><div className="checklist-icon ok"><GitBranch size={11} /></div><div><b>Rules before ML</b><p>Deterministic CAAT rules ship first; statistical and ML layers follow once data matures.</p></div></div>
          </div>
        </Panel>
      </div>
    </Panel>
  )
}
