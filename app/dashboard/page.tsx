'use client'

import { useSession } from 'next-auth/react'
import { redirect } from 'next/navigation'
import { useState } from 'react'
import { 
  BarChart3, 
  Zap, 
  Clock, 
  TrendingUp,
  Award,
  Target
} from 'lucide-react'
import Link from 'next/link'

export default function Dashboard() {
  const { data: session, status } = useSession()
  const [assessmentsRemaining, setAssessmentsRemaining] = useState(3)
  
  if (status === 'loading') {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>
  }
  
  if (!session) {
    redirect('/auth/signin')
  }

  const isPro = session.user.subscription?.status === 'active'

  return (
    <div className="min-h-screen pt-24 pb-12 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8"
        >
          <div>
            <h1 className="text-3xl font-bold mb-1">
              歡迎回來, {session.user.name || '用戶'}
            </h1>
            <p className="text-zinc-400">
              {isPro ? 'Pro 計劃 · 無限評估' : `免費計劃 · 剩餘 ${assessmentsRemaining} 次評估`}
            </p>
          </div>
          
          {!isPro && (
            <Link
              href="/pricing"
              className="inline-flex items-center gap-2 px-6 py-3 bg-violet-500 
                       hover:bg-violet-600 text-white font-medium rounded-xl transition-all"
            >
              <Zap className="w-4 h-4" />
              升級 Pro
            </Link>
          )}
        </div>

        {/* Stats Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
        >
          <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/[0.08]"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-violet-500/10 flex items-center justify-center"
              >
                <Target className="w-5 h-5 text-violet-400" />
              </div>
              <span className="text-sm text-zinc-400">已評估技能</span>
            </div>
            <div className="text-3xl font-bold">0</div>
            <p className="text-xs text-zinc-500 mt-1">開始你的第一次評估</p>
          </div>

          <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/[0.08]"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center"
              >
                <TrendingUp className="w-5 h-5 text-emerald-400" />
              </div>
              <span className="text-sm text-zinc-400">潛在薪資提升</span>
            </div>
            <div className="text-3xl font-bold">-</div>
            <p className="text-xs text-zinc-500 mt-1">完成評估查看預測</p>
          </div>

          <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/[0.08]"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center"
              >
                <Clock className="w-5 h-5 text-blue-400" />
              </div>
              <span className="text-sm text-zinc-400">預計學習時間</span>
            </div>
            <div className="text-3xl font-bold">-</div>
            <p className="text-xs text-zinc-500 mt-1">完成評估查看</p>
          </div>

          <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/[0.08]"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center"
              >
                <Award className="w-5 h-5 text-amber-400" />
              </div>
              <span className="text-sm text-zinc-400">匹配職位</span>
            </div>
            <div className="text-3xl font-bold">-</div>
            <p className="text-xs text-zinc-500 mt-1">完成評估查看</p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-2 gap-6"
        >
          {/* New Assessment */}
          <Link
            href="/"
            className="group p-8 rounded-2xl bg-gradient-to-br from-violet-500/10 to-fuchsia-500/10 
                     border border-violet-500/20 hover:border-violet-500/40 transition-all"
          >
            <div className="w-14 h-14 rounded-2xl bg-violet-500 flex items-center justify-center mb-6"
            >
              <Zap className="w-7 h-7 text-white" />
            </div>
            
            <h3 className="text-xl font-semibold mb-2">開始新評估</h3>
            <p className="text-zinc-400 mb-4"
            >
              輸入你的技能背景，獲取個人化職業建議
            </p>
            
            <div className="flex items-center gap-2 text-violet-400 group-hover:gap-3 transition-all"
            >
              <span>開始評估</span>
              <span>→</span>
            </div>
          </Link>

          {/* View History */}
          <div className="p-8 rounded-2xl bg-white/[0.03] border border-white/[0.08]"
          >
            <div className="w-14 h-14 rounded-2xl bg-white/[0.06] flex items-center justify-center mb-6"
            >
              <BarChart3 className="w-7 h-7 text-zinc-400" />
            </div>
            
            <h3 className="text-xl font-semibold mb-2">評估歷史</h3>
            <p className="text-zinc-400"
            >
              你還沒有完成任何評估。開始第一個評估查看結果。
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
