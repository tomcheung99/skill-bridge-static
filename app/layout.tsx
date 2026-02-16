import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import AuthProvider from '@/components/AuthProvider'
import Navbar from '@/components/Navbar'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Skill Bridge - AI 技能迁移平台',
  description: '用 AI 发现你的下一个高薪技能。智能职业规划，技能迁移路径推荐。',
  keywords: '技能迁移, 职业规划, AI 职业顾问, 技能评估, 职业转型',
  openGraph: {
    title: 'Skill Bridge - AI 技能迁移平台',
    description: '用 AI 发现你的下一个高薪技能',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-Hant" className={inter.variable}>
      <body className="min-h-screen bg-[#0a0a0f] text-white selection:bg-violet-500/30">
        <AuthProvider>
          <Navbar />
          
          {/* Subtle gradient background */}
          <div className="fixed inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(120,119,198,0.15),transparent)] pointer-events-none" />
          
          {/* Grid pattern */}
          <div 
            className="fixed inset-0 opacity-[0.02] pointer-events-none"
            style={{
              backgroundImage: `linear-gradient(rgba(255,255,255,.1) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.1) 1px,transparent 1px)`,
              backgroundSize: '60px 60px'
            }}
          />
          
          <div className="relative z-10">
            {children}
          </div>
        </AuthProvider>
      </body>
    </html>
  )
}
