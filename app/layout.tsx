import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Skill Bridge - 技能遷移圖譜',
  description: '用 AI 類比降低跨學科學習門檻',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-Hant">
      <body className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
        {children}
      </body>
    </html>
  )
}
