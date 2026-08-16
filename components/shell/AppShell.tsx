'use client'

import { useState } from 'react'
import {
  Bell, Building2, ChevronRight, Fingerprint, LogOut, Menu, PanelLeftClose, Search, ShieldCheck,
} from 'lucide-react'
import { navGroups, screenLabels } from '@/lib/nav'
import { useToast } from './toast'
import { personas, bank, type Persona } from '@/lib/data'
import { cn } from './ui'

export function AppShell({
  persona, onSwitchPersona, screenId, onNavigate, onLogout, children,
}: {
  persona: Persona
  onSwitchPersona: (p: Persona) => void
  screenId: string
  onNavigate: (screenId: string) => void
  onLogout: () => void
  children: React.ReactNode
}) {
  const { showToast } = useToast()
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [personaMenuOpen, setPersonaMenuOpen] = useState(false)
  const [search, setSearch] = useState('')

  const activeLabel = screenLabels[screenId] ?? 'Overview'

  return (
    <div className="audix-shell">
      <aside className={cn('audix-sidebar', !sidebarOpen && 'sidebar-collapsed')}>
        <div className="brand">
          <div className="brand-mark"><Fingerprint /></div>
          {sidebarOpen && <div><div className="brand-name">Audi<span>X</span></div><div className="brand-sub">INTELLIGENT AUDIT OS · PROTOTYPE</div></div>}
        </div>

        {sidebarOpen && (
          <div className="entity-switcher">
            <Building2 />
            <div><strong>{bank.name}</strong><span>Internal Audit · Demo</span></div>
            <ChevronRight />
          </div>
        )}

        {sidebarOpen && (
          <div className="persona-switch" style={{ marginBottom: 20 }}>
            <button className="persona-trigger" onClick={() => setPersonaMenuOpen((v) => !v)}>
              <div className="avatar">{persona.initials}</div>
              <div><strong>{persona.name}</strong><span>{persona.title}</span></div>
              <ChevronRight style={{ marginLeft: 'auto', width: 13, transform: personaMenuOpen ? 'rotate(90deg)' : 'none' }} />
            </button>
            {personaMenuOpen && (
              <div className="persona-menu">
                {personas.map((p) => (
                  <button key={p.id} className={cn('persona-option', p.id === persona.id && 'active')} onClick={() => { onSwitchPersona(p); setPersonaMenuOpen(false) }}>
                    <div className="avatar" style={{ width: 24, height: 24, fontSize: 8 }}>{p.initials}</div>
                    <div><strong>{p.title}</strong><span>{p.name}</span></div>
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        <nav className="side-nav">
          {navGroups.map((group) => (
            <div className="nav-group" key={group.label}>
              {sidebarOpen && <div className="nav-label">{group.label}</div>}
              {group.items.map((item) => (
                <button
                  key={item.id}
                  onClick={() => onNavigate(item.screenId)}
                  className={cn('nav-item', screenId === item.screenId && 'nav-item-active')}
                  title={item.label}
                >
                  <item.icon />
                  {sidebarOpen && <span>{item.label}</span>}
                  {sidebarOpen && item.id === 'findings' && <b>{5}</b>}
                </button>
              ))}
            </div>
          ))}
        </nav>

        <div className="sidebar-bottom">
          <button className="nav-item" onClick={onLogout}><LogOut />{sidebarOpen && <span>Switch role / log out</span>}</button>
          <button className="collapse-btn" onClick={() => setSidebarOpen(!sidebarOpen)}>{sidebarOpen ? <PanelLeftClose /> : <Menu />} {sidebarOpen && 'Collapse rail'}</button>
        </div>
      </aside>

      <main className="audix-main">
        <header className="topbar">
          <button className="mobile-menu" onClick={() => setSidebarOpen(!sidebarOpen)}><Menu /></button>
          <div className="crumb"><span>Audit workspace</span><ChevronRight /><strong>{activeLabel}</strong></div>
          <div className="top-actions">
            {persona.readOnly && <span className="readonly-pill"><ShieldCheck size={12} /> Read-only view</span>}
            <label className="searchbox"><Search /><input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search audits, findings, risks…" /></label>
            <button className="icon-btn" onClick={() => showToast('3 notifications: workpaper returned, finding overdue, plan comment added.')}><Bell /><i /></button>
            <div className="avatar">{persona.initials}</div>
          </div>
        </header>
        <div className="page-content">{children}</div>
      </main>
    </div>
  )
}
