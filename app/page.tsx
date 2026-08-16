'use client'

import { useState } from 'react'
import { AppShell } from '@/components/shell/AppShell'
import { ToastProvider } from '@/components/shell/toast'
import { LoginScreen } from '@/components/screens/LoginScreen'
import { HomeDashboard, CaeDashboardScreen, BoardDashboardScreen, BranchDashboardScreen } from '@/components/screens/Dashboards'
import {
  UniverseScreen, RiskRegisterScreen, RiskAssessmentScreen, RiskHeatmapScreen,
  AnnualPlanScreen, PlanApprovalScreen, CoverageMapScreen,
} from '@/components/screens/Planning'
import { EngagementRegisterScreen, EngagementSetupScreen, AuditProgramScreen } from '@/components/screens/Engagement'
import {
  WorkpaperWorkspaceScreen, EvidenceVaultScreen, ReviewQueueScreen, BranchWorkspaceScreen,
} from '@/components/screens/Fieldwork'
import { FindingsRegisterScreen, ActionPlanScreen, ClosureValidationScreen } from '@/components/screens/Findings'
import { VisionScreen } from '@/components/screens/Vision'
import { personas, type Persona } from '@/lib/data'

export default function Home() {
  const [session, setSession] = useState<Persona | null>(null)
  const [screenId, setScreenId] = useState('home')
  const [focusUniverseId, setFocusUniverseId] = useState<string | null>(null)
  const [focusRiskId, setFocusRiskId] = useState<string | null>(null)

  const openUniverseItem = (id: string) => { setFocusUniverseId(id); setScreenId('universe') }
  const openRisk = (id: string) => { setFocusRiskId(id); setScreenId('risk-register') }

  if (!session) {
    return (
      <ToastProvider>
        <LoginScreen onLogin={(p) => { setSession(p); setScreenId('home') }} />
      </ToastProvider>
    )
  }

  const persona = session

  const renderScreen = () => {
    switch (screenId) {
      case 'home': return <HomeDashboard persona={persona} onNavigate={setScreenId} />
      case 'cae-dashboard': return <CaeDashboardScreen onNavigate={setScreenId} />
      case 'board-dashboard': return <BoardDashboardScreen />
      case 'branch-dashboard': return <BranchDashboardScreen />

      case 'universe': return <UniverseScreen persona={persona} focusId={focusUniverseId} onFocusHandled={() => setFocusUniverseId(null)} onOpenRisk={openRisk} />
      case 'risk-register': return <RiskRegisterScreen focusId={focusRiskId} onFocusHandled={() => setFocusRiskId(null)} onOpenUniverseItem={openUniverseItem} />
      case 'risk-assessment': return <RiskAssessmentScreen persona={persona} />
      case 'risk-heatmap': return <RiskHeatmapScreen />
      case 'annual-plan': return <AnnualPlanScreen persona={persona} onNavigate={setScreenId} />
      case 'plan-approval': return <PlanApprovalScreen persona={persona} />
      case 'coverage-map': return <CoverageMapScreen />

      case 'engagements': return <EngagementRegisterScreen onOpenSetup={() => setScreenId('engagement-setup')} />
      case 'engagement-setup': return <EngagementSetupScreen persona={persona} />
      case 'audit-program': return <AuditProgramScreen />

      case 'workpapers': return <WorkpaperWorkspaceScreen persona={persona} />
      case 'evidence-vault': return <EvidenceVaultScreen persona={persona} />
      case 'review-queue': return <ReviewQueueScreen persona={persona} />
      case 'branch-workspace': return <BranchWorkspaceScreen persona={persona} />

      case 'findings': return <FindingsRegisterScreen persona={persona} />
      case 'action-plan': return <ActionPlanScreen persona={persona} />
      case 'closure-validation': return <ClosureValidationScreen persona={persona} />

      case 'vision': return <VisionScreen />

      default: return <HomeDashboard persona={persona} onNavigate={setScreenId} />
    }
  }

  return (
    <ToastProvider>
    <AppShell
      persona={persona}
      onSwitchPersona={(p) => { setSession(p); setScreenId('home') }}
      screenId={screenId}
      onNavigate={setScreenId}
      onLogout={() => setSession(null)}
    >
      {screenId === 'home' && (
        <div className="page-heading">
          <div>
            <div className="eyebrow"><span className="pulse-dot" /> DEMO CONTROL PLANE · PADMA BANK PLC · 13 AUG 2026</div>
            <h1>Welcome, {persona.name.split(' ')[0]}.</h1>
            <p>{persona.title} · exploring: {persona.journeys.join(' · ')}</p>
          </div>
        </div>
      )}
      {renderScreen()}
    </AppShell>
    </ToastProvider>
  )
}
