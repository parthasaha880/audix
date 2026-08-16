import {
  LayoutDashboard, Network, Gauge, ShieldAlert, Grid3x3, CalendarDays, CheckSquare, Map,
  ClipboardList, FilePlus2, ListChecks, FileSearch, FolderOpen, Inbox, Building2,
  CircleAlert, ClipboardCheck, BadgeCheck, Sparkles, FileBarChart, Landmark, Store,
} from 'lucide-react'

export interface NavItem { id: string; label: string; icon: any; screenId: string }
export interface NavGroup { label: string; items: NavItem[] }

export const navGroups: NavGroup[] = [
  {
    label: 'Overview',
    items: [
      { id: 'home', label: 'My dashboard', icon: LayoutDashboard, screenId: 'home' },
      { id: 'cae-dashboard', label: 'CAE dashboard', icon: FileBarChart, screenId: 'cae-dashboard' },
      { id: 'board-dashboard', label: 'Board dashboard', icon: Landmark, screenId: 'board-dashboard' },
      { id: 'branch-dashboard', label: 'Branch dashboard', icon: Store, screenId: 'branch-dashboard' },
    ],
  },
  {
    label: 'Planning · UJ-01',
    items: [
      { id: 'universe', label: 'Audit universe', icon: Network, screenId: 'universe' },
      { id: 'risk-register', label: 'Risk register', icon: ShieldAlert, screenId: 'risk-register' },
      { id: 'risk-assessment', label: 'Risk assessment', icon: Gauge, screenId: 'risk-assessment' },
      { id: 'risk-heatmap', label: 'Risk heatmap', icon: Grid3x3, screenId: 'risk-heatmap' },
      { id: 'annual-plan', label: 'Annual audit plan', icon: CalendarDays, screenId: 'annual-plan' },
      { id: 'plan-approval', label: 'Plan approval', icon: CheckSquare, screenId: 'plan-approval' },
      { id: 'coverage-map', label: 'Coverage map', icon: Map, screenId: 'coverage-map' },
    ],
  },
  {
    label: 'Engagement · UJ-02',
    items: [
      { id: 'engagements', label: 'Engagement register', icon: ClipboardList, screenId: 'engagements' },
      { id: 'engagement-setup', label: 'Engagement setup', icon: FilePlus2, screenId: 'engagement-setup' },
      { id: 'audit-program', label: 'Audit program', icon: ListChecks, screenId: 'audit-program' },
    ],
  },
  {
    label: 'Fieldwork · UJ-03',
    items: [
      { id: 'workpapers', label: 'Workpaper workspace', icon: FileSearch, screenId: 'workpapers' },
      { id: 'evidence-vault', label: 'Evidence vault', icon: FolderOpen, screenId: 'evidence-vault' },
      { id: 'review-queue', label: 'Review queue', icon: Inbox, screenId: 'review-queue' },
      { id: 'branch-workspace', label: 'Branch audit workspace', icon: Building2, screenId: 'branch-workspace' },
    ],
  },
  {
    label: 'Findings · UJ-04',
    items: [
      { id: 'findings', label: 'Findings register', icon: CircleAlert, screenId: 'findings' },
      { id: 'action-plan', label: 'Action plan', icon: ClipboardCheck, screenId: 'action-plan' },
      { id: 'closure-validation', label: 'Closure validation', icon: BadgeCheck, screenId: 'closure-validation' },
    ],
  },
  {
    label: 'Phase 2 preview',
    items: [
      { id: 'vision', label: 'CAAT / AI preview', icon: Sparkles, screenId: 'vision' },
    ],
  },
]

export const screenLabels: Record<string, string> = Object.fromEntries(
  navGroups.flatMap((g) => g.items.map((i) => [i.screenId, i.label])),
)
