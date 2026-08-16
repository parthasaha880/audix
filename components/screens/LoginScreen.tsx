'use client'

import { useState } from 'react'
import { Fingerprint, ShieldCheck, ArrowRight, KeyRound, CheckCircle2 } from 'lucide-react'
import { personas, bank, type Persona } from '@/lib/data'
import { cn } from '../shell/ui'

export function LoginScreen({ onLogin }: { onLogin: (p: Persona) => void }) {
  const [selected, setSelected] = useState<Persona | null>(null)
  const [step, setStep] = useState<'credentials' | 'mfa'>('credentials')

  return (
    <div className="login-shell">
      <div className="login-card">
        <div className="login-head">
          <div className="brand-mark"><Fingerprint /></div>
          <div><div className="brand-name">Audi<span>X</span></div><div className="brand-sub">INTELLIGENT AUDIT OS</div></div>
        </div>
        <p className="login-sub">{bank.name} · Clickable prototype for internal walkthrough — pick a persona to explore the journeys that persona would use.</p>

        {step === 'credentials' ? (
          <>
            <div className="login-form">
              <div className="form-field">
                <label>Employee ID or email</label>
                <input defaultValue="a.rahman@padmabank.demo" readOnly suppressHydrationWarning />
              </div>
              <div className="form-field">
                <label>Password</label>
                <input type="password" defaultValue="••••••••••" readOnly suppressHydrationWarning />
              </div>
              <button className="btn-secondary" type="button" disabled suppressHydrationWarning style={{ justifyContent: 'flex-start', opacity: .6 }}><KeyRound /> Sign in with SSO / Active Directory (Phase 2)</button>
            </div>

            <div className="section-title">Choose a persona to walk through {selected ? '' : '— tap a card below'}</div>
            <div className="persona-grid">
              {personas.map((p) => (
                <button key={p.id} type="button" className={cn('persona-tile', selected?.id === p.id && 'selected')} onClick={() => setSelected(p)}>
                  {selected?.id === p.id && <span className="persona-tile-check"><CheckCircle2 size={14} /> Selected</span>}
                  <div className="avatar">{p.initials}</div>
                  <strong>{p.name}</strong>
                  <em>{p.title}</em>
                  <p>{p.blurb}</p>
                </button>
              ))}
            </div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 14, marginTop: 24 }}>
              {!selected && <span style={{ fontSize: 11, color: '#8c96ad' }}>Select a persona card above to continue</span>}
              <button type="button" className="btn-primary" disabled={!selected} suppressHydrationWarning onClick={() => selected && setStep('mfa')}>
                Continue to verification <ArrowRight />
              </button>
            </div>
          </>
        ) : (
          <div style={{ maxWidth: 360 }}>
            <div className="callout callout-info">
              <strong>Multi-factor verification</strong>
              <p>An OTP has been sent to the registered device for {selected?.name}. This is a prototype — enter any 6 digits to continue.</p>
            </div>
            <div className="form-field" style={{ marginBottom: 18 }}>
              <label>One-time passcode</label>
              <input defaultValue="482913" />
            </div>
            <div style={{ display: 'flex', gap: 10 }}>
              <button className="btn-secondary" onClick={() => setStep('credentials')}>Back</button>
              <button className="btn-primary full-btn" onClick={() => selected && onLogin(selected)}>
                <ShieldCheck /> Verify &amp; enter workspace
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
