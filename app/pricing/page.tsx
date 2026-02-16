'use client'

import { useSession, signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Check, Sparkles, Zap, Users } from 'lucide-react'
import { useState } from 'react'

const plans = [
  {
    name: 'Free',
    price: 0,
    description: '開始探索你的技能路徑',
    icon: Sparkles,
    features: [
      '每月 3 次技能評估',
      '基礎技能推薦',
      '訪問技能圖譜',
      '電郵支持',
    ],
    cta: '免費開始',
    popular: false,
  },
  {
    name: 'Pro',
    price: 12,
    description: '解鎖完整 AI 輔導體驗',
    icon: Zap,
    features: [
      '無限技能評估',
      'AI 個人化學習路徑',
      '一對一職涯輔導',
      '簡歷優化建議',
      '優先支持',
    ],
    cta: '升級 Pro',
    popular: true,
    priceId: process.env.NEXT_PUBLIC_STRIPE_PRICE_PRO,
  },
  {
    name: 'Team',
    price: 39,
    description: '團隊技能發展解決方案',
    icon: Users,
    features: [
      '所有 Pro 功能',
      '團隊技能分析',
      '培訓 ROI 報告',
      'API 訪問',
      '專屬客戶成功經理',
    ],
    cta: '聯繫銷售',
    popular: false,
  },
]

export default function PricingPage() {
  const { data: session } = useSession()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const handleSubscribe = async (plan: typeof plans[0]) => {
    if (!session) {
      signIn()
      return
    }

    if (plan.price === 0) {
      router.push('/dashboard')
      return
    }

    if (plan.name === 'Team') {
      window.location.href = 'mailto:sales@skillbridge.ai'
      return
    }

    setIsLoading(true)

    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ priceId: plan.priceId }),
      })

      const { url } = await res.json()
      window.location.href = url
    } catch (error) {
      console.error('Checkout error:', error)
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen pt-24 pb-20 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-500/10 
                          border border-violet-500/20 text-violet-300 text-sm mb-6">
            簡單透明的定價
          </div>
          
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4">
            選擇適合你的方案
          </h1>
          
          <p className="text-lg text-zinc-400 max-w-2xl mx-auto">
            從免費開始，隨時升級。所有付費方案均可 14 天無條件退款。
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`
                relative rounded-2xl p-6 border transition-all duration-300
                ${plan.popular 
                  ? 'bg-violet-500/10 border-violet-500/50 scale-105 shadow-[0_0_40px_-10px_rgba(139,92,246,0.3)]' 
                  : 'bg-white/[0.02] border-white/[0.08] hover:bg-white/[0.04]'
                }
              `}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2"
                >
                  <span className="px-3 py-1 bg-violet-500 text-white text-xs font-medium rounded-full"
                  >
                    最受歡迎
                  </span>
                </div>
              )}

              <div className="flex items-center gap-3 mb-4">
                <div className={`
                  w-10 h-10 rounded-xl flex items-center justify-center
                  ${plan.popular ? 'bg-violet-500' : 'bg-white/[0.06]'}
                `}>
                  <plan.icon className="w-5 h-5" />
                </div>
                <h3 className="text-xl font-semibold">{plan.name}</h3>
              </div>

              <p className="text-zinc-400 text-sm mb-4">{plan.description}</p>

              <div className="mb-6">
                <span className="text-4xl font-bold">${plan.price}</span>
                <span className="text-zinc-500">/月</span>
              </div>

              <ul className="space-y-3 mb-6">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3 text-sm">
                    <Check className={`
                      w-4 h-4 mt-0.5 flex-shrink-0
                      ${plan.popular ? 'text-violet-400' : 'text-zinc-500'}
                    `} />
                    <span className="text-zinc-300">{feature}</span>
                  </li>
                ))}
              </ul>

              <button
                onClick={() => handleSubscribe(plan)}
                disabled={isLoading}
                className={`
                  w-full py-3 rounded-xl font-medium transition-all
                  ${plan.popular 
                    ? 'bg-violet-500 hover:bg-violet-600 text-white' 
                    : 'bg-white/[0.06] hover:bg-white/[0.1] text-white border border-white/[0.08]'
                  }
                  disabled:opacity-50 disabled:cursor-not-allowed
                `}
              >
                {isLoading ? '處理中...' : plan.cta}
              </button>
            </div>
          ))}
        </div>

        {/* Trust badges */}
        <div className="mt-16 text-center">
          <p className="text-sm text-zinc-500">
            受 1000+ 專業人士信賴 · 14 天無條件退款 · 可隨時取消
          </p>
        </div>
      </div>
    </div>
  )
}
