import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'https://audix.kormo.bd'),
  title: 'AudiX — Intelligent Audit OS',
  description: 'A futuristic internal audit command center for enterprise banking risk, controls, and evidence.',
  generator: 'AudiX',
}

export const viewport: Viewport = {
  colorScheme: 'dark',
  themeColor: '#080b14',
  userScalable: false,
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en" className="dark"><body className="antialiased">{children}{process.env.NODE_ENV === 'production' && <Analytics />}</body></html>
}
