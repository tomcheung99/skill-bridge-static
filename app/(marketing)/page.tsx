'use client'

import { ArrowRight, Sparkles, Target, TrendingUp, Users } from 'lucide-react'
import Link from 'next/link'

const features = [
  {
    icon: Target,
    title: 'AI 技能評估',
    description: '上傳履歷或 LinkedIn，AI 自動識別你的技能組合和潛力'
  },
  {
    icon: TrendingUp,
    title: '智能路徑規劃',
    description: '基於你的背景，推薦最高 ROI 的技能學習路徑'
  },
  {
    icon: Sparkles,
    title: '類比學習法',
    description: '用你已知的技能類比新技能，降低學習門檻 70%'
  },
  {
    icon: Users,
    title: '職涯輔導',
    description: '專業顧問一對一諮詢，制定個人化職業發展策略'
  }
]

const stats = [
  { value: '50+', label: '技能領域' },
  { value: '10K+', label: '用戶評估' },
  { value: '40+', label: '遷移路徑' },
  { value: '85%', label: '用戶滿意度' },
]

export default function LandingPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full 
                          bg-violet-500/10 border border-violet-500/20 text-violet-300 mb-8"
          >
            🚀 新用戶免費試用 Pro 功能 14 天
          </div>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight mb-6"
          >
            發現你的
            <br />
            <span className="bg-gradient-to-r from-violet-400 via-fuchsia-300 to-cyan-300 
                           bg-clip-text text-transparent"
            >
              下一個高薪技能
            </span>
          </h1>

          <p className="text-xl text-zinc-400 max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            Skill Bridge 使用 AI 分析你的背景，推薦最適合的技能遷移路徑。
            <br className="hidden sm:block" />
            平均幫助用戶找到 40% 更高薪的職業方向。
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
          >
            <Link
              href="/dashboard"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 
                       bg-violet-500 hover:bg-violet-600 text-white font-semibold 
                       rounded-xl transition-all group"
            >
              免費開始評估
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            
            <Link
              href="/pricing"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 
                       bg-white/[0.06] hover:bg-white/[0.1] text-white font-semibold 
                       rounded-xl border border-white/[0.08] transition-all"
            >
              查看定價
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-3xl mx-auto"
          >
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl sm:text-4xl font-bold text-white mb-1"
                >{stat.value}</div>
                <div className="text-sm text-zinc-500">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6 border-t border-white/[0.06]"
      >
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4"
            >
              為什麼選擇 Skill Bridge？
            </h2>
            <p className="text-zinc-400 max-w-2xl mx-auto"
            >
              我們不只是推薦技能，而是幫你建立完整的職業發展策略
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6"
          >
            {features.map((feature) => (
              <div
                key={feature.title}
                className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.06]
                         hover:bg-white/[0.04] hover:border-white/[0.1] transition-all"
              >
                <div className="w-12 h-12 rounded-xl bg-violet-500/10 flex items-center justify-center mb-4"
                >
                  <feature.icon className="w-6 h-6 text-violet-400" />
                </div>
                <h3 className="text-xl font-semibold mb-2"
                >{feature.title}</h3>
                <p className="text-zinc-400"
                >{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 border-t border-white/[0.06]"
      >
        <div className="max-w-4xl mx-auto text-center">
          <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-violet-500/20 to-fuchsia-500/20 
                          border border-violet-500/20"
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-4"
            >
              準備好轉型了嗎？
            </h2>
            <p className="text-zinc-300 mb-8 max-w-xl mx-auto"
            >
              加入 10,000+ 專業人士，用 AI 發現你的下一個高薪技能。
              免費開始，無需信用卡。
            </p>
            
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-2 px-8 py-4 
                       bg-white text-[#0a0a0f] font-semibold rounded-xl
                       hover:bg-zinc-200 transition-all"
            >
              立即免費評估
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
