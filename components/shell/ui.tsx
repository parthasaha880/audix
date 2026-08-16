'use client'

import type { CSSProperties, ReactNode } from 'react'
import { X } from 'lucide-react'

export function cn(...classes: (string | false | undefined | null)[]) {
  return classes.filter(Boolean).join(' ')
}

export function Panel({ children, className, style }: { children: ReactNode; className?: string; style?: CSSProperties }) {
  return <section className={cn('panel', className)} style={style}>{children}</section>
}

export function PanelHead({ kicker, title, description, action }: { kicker?: string; title: string; description?: string; action?: ReactNode }) {
  return (
    <div className="panel-head">
      <div>
        {kicker && <div className="panel-kicker">{kicker}</div>}
        <h2>{title}</h2>
        {description && <p className="panel-description">{description}</p>}
      </div>
      {action}
    </div>
  )
}

export function Badge({ children, tone = 'neutral' }: { children: ReactNode; tone?: string }) {
  return <span className={cn('audit-badge', `audit-badge-${tone.toLowerCase().replace(/\s+/g, '-')}`)}>{children}</span>
}

export function SeverityDot({ severity }: { severity: string }) {
  return <span className={cn('severity', `severity-${severity.toLowerCase()}`)} />
}

export function ProgressBar({ value, tone }: { value: number; tone?: string }) {
  return (
    <div className="progress-cell">
      <div className="progress">
        <i style={{ width: `${value}%` }} className={tone} />
      </div>
      <span>{value}%</span>
    </div>
  )
}

export function EmptyState({ icon: Icon, title, description, action }: { icon: any; title: string; description: string; action?: ReactNode }) {
  return (
    <div className="empty-module">
      <Icon />
      <h3>{title}</h3>
      <p>{description}</p>
      {action}
    </div>
  )
}

export function Callout({ tone, title, children }: { tone: 'info' | 'warning' | 'danger' | 'success'; title: string; children: ReactNode }) {
  return (
    <div className={cn('callout', `callout-${tone}`)}>
      <strong>{title}</strong>
      <p>{children}</p>
    </div>
  )
}

export function Drawer({ open, onClose, title, kicker, children }: { open: boolean; onClose: () => void; title: string; kicker?: string; children: ReactNode }) {
  if (!open) return null
  return (
    <div className="drawer-backdrop" onClick={onClose}>
      <aside className="detail-drawer" onClick={(e) => e.stopPropagation()}>
        <div className="drawer-head">
          <div>
            {kicker && <div className="panel-kicker">{kicker}</div>}
            <h2>{title}</h2>
          </div>
          <button className="icon-btn" onClick={onClose}><X /></button>
        </div>
        {children}
      </aside>
    </div>
  )
}

export function StatusStepper({ steps, current }: { steps: string[]; current: number }) {
  return (
    <div className="stepper">
      {steps.map((step, i) => (
        <div key={step} className={cn('stepper-step', i < current && 'stepper-done', i === current && 'stepper-current')}>
          <span className="stepper-dot">{i < current ? '✓' : i + 1}</span>
          <span className="stepper-label">{step}</span>
          {i < steps.length - 1 && <span className="stepper-line" />}
        </div>
      ))}
    </div>
  )
}

export function FieldRow({ label, value }: { label: string; value: ReactNode }) {
  return (
    <div className="field-row">
      <span>{label}</span>
      <b>{value}</b>
    </div>
  )
}

const DANGER = ['critical', 'overdue', 'exception', 'ineffective', 'rejected', 'returned', 'gap', 'reopened']
const WARNING = ['high', 'pending', 'review', 'in progress', 'partially effective', 'stale assessment', 'not submitted', 'proposed', 'draft']
const SUCCESS = ['low', 'closed', 'cleared', 'compliant', 'approved', 'effective', 'covered', 'validated', 'report issued', 'no exceptions']
const INFO = ['fieldwork', 'management response', 'draft report', 'medium']

export function statusTone(value: string): string {
  const v = value.toLowerCase()
  if (DANGER.some((k) => v.includes(k))) return 'danger'
  if (WARNING.some((k) => v.includes(k))) return 'warning'
  if (SUCCESS.some((k) => v.includes(k))) return 'success'
  if (INFO.some((k) => v.includes(k))) return 'info'
  return 'neutral'
}

export function StatusBadge({ value }: { value: string }) {
  return <Badge tone={statusTone(value)}>{value}</Badge>
}
