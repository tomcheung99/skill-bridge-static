'use client'

import { useState } from 'react'
import { useSession } from 'next-auth/react'
import { skills, findSkill, getRecommendations, extractSkillsFromText } from '@/lib/skills'
import { ExtractedSkill, Recommendation } from '@/types'
import { 
  Sparkles, 
  FileText, 
  User, 
  ArrowRight,
  Zap,
  Loader2
} from 'lucide-react'
import Link from 'next/link'

export default function Home() {
  const { data: session } = useSession()
  const [mode, setMode] = useState<'manual' | 'text'>('manual')
  const [selectedSkill, setSelectedSkill] = useState('')
  const [text, setText] = useState('')
  const [loading, setLoading] = useState(false)
  const [extractedSkills, setExtractedSkills] = useState<ExtractedSkill[]>([])
  const [recommendations, setRecommendations] = useState<Recommendation[]>([])
  const [matchedSkill, setMatchedSkill] = useState<typeof skills[0] | null>(null)
  const [error, setError] = useState('')
  const [showUpgrade, setShowUpgrade] = useState(false)

  const handleManualSubmit = async () => {
    if (!selectedSkill) return
    setLoading(true)
    setError('')
    setShowUpgrade(false)
    
    try {
      const skill = findSkill(selectedSkill)
      if (skill) {
        setMatchedSkill(skill)
        
        // Call API to save assessment
        const res = await fetch('/api/assessments', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            inputType: 'manual',
            inputData: { skillId: skill.id, skillName: skill.name },
          }),
        })

        const data = await res.json()
        
        if (data.upgrade) {
          setShowUpgrade(true)
        } else {
          setRecommendations(data.recommendations || getRecommendations(skill.id))
        }
      }
    } catch (err) {
      setError('分析失敗，請重試')
    } finally {
      setLoading(false)
    }
  }

  const handleTextSubmit = async () => {
    if (!text.trim()) return
    setLoading(true)
    setError('')
    setShowUpgrade(false)
    
    try {
      const res = await fetch('/api/assessments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          inputType: 'text',
          inputData: { text },
        }),
      })

      const data = await res.json()
      
      if (data.upgrade) {
        setShowUpgrade(true)
      } else {
        setExtractedSkills(data.detectedSkills)
        setRecommendations(data.recommendations)
        
        if (data.detectedSkills.length > 0) {
          const skill = findSkill(data.detectedSkills[0].id)
          if (skill) setMatchedSkill(skill)
        }
      }
    } catch (err) {
      setError('提取技能失敗，請重試')
    } finally {
      setLoading(false)
    }
  }

  const modes = [
    { id: 'manual' as const, label: '手動選擇', icon: User, desc: '從技能庫選擇' },
    { id: 'text' as const, label: '文本分析', icon: FileText, desc: '貼上履歷內容' },
  ]

  return (
    <div className="min-h-screen pt-24 pb-20 px-6">
      <div className="max-w-4xl mx-auto">
        {/* Hero */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full 
                          bg-violet-500/10 border border-violet-500/20 text-violet-300 mb-6"
          >
            <Sparkles className="w-4 h-4" />
            AI 驱动的技能迁移
          </div>
          
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4"
          >
            發現你的
            <br />
            <span className="bg-gradient-to-r from-violet-400 via-fuchsia-300 to-cyan-300 
                           bg-clip-text text-transparent"
            >
              下一個技能
            </span>
          </h1>
          
          <p className="text-lg text-zinc-400 max-w-2xl mx-auto"
          >
            輸入你的技能背景，獲取 AI 推薦的職業遷移路徑
          </p>
        </div>

        {/* Upgrade Banner */}
        {showUpgrade && (
          <div className="mb-8 p-6 rounded-2xl bg-violet-500/10 border border-violet-500/30 text-center"
          >
            <Zap className="w-8 h-8 text-violet-400 mx-auto mb-3" />
            <h3 className="text-lg font-semibold mb-2">已達免費評估上限</h3>
            <p className="text-zinc-400 mb-4">升級 Pro 以解鎖無限評估和 AI 輔導</p>
            <Link
              href="/pricing"
              className="inline-flex items-center gap-2 px-6 py-3 bg-violet-500 
                       hover:bg-violet-600 text-white font-medium rounded-xl transition-all"
            >
              查看定價
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        )}

        {/* Mode Selector */}
        <div className="grid grid-cols-2 gap-3 mb-8"
        >
          {modes.map(({ id, label, icon: Icon, desc }) => (
            <button
              key={id}
              onClick={() => setMode(id)}
              className={`
                relative p-4 rounded-xl border text-left transition-all duration-300
                ${mode === id 
                  ? 'bg-violet-500/10 border-violet-500/50 shadow-[0_0_30px_-10px_rgba(139,92,246,0.3)]' 
                  : 'bg-white/[0.02] border-white/[0.08] hover:bg-white/[0.04]'
                }
              `}
            >
              <Icon className={`w-5 h-5 mb-3 ${mode === id ? 'text-violet-400' : 'text-zinc-500'}`} />
              <div className="font-medium text-white text-sm mb-1">{label}</div>
              <div className="text-xs text-zinc-500">{desc}</div>
            </button>
          ))}
        </div>

        {/* Error */}
        {error && (
          <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-300 text-sm"
          >
            {error}
          </div>
        )}

        {/* Input Area */}
        <div className="rounded-2xl bg-white/[0.03] border border-white/[0.08] overflow-hidden"
        >
          {mode === 'manual' && (
            <div className="p-6"
            >
              <label className="block text-sm font-medium text-zinc-400 mb-3"
              >
                選擇你已掌握的技能
              </label>
              <select
                value={selectedSkill}
                onChange={(e) => setSelectedSkill(e.target.value)}
                className="w-full px-4 py-3 bg-[#0a0a0f] border border-white/[0.08] rounded-xl 
                         text-white focus:outline-none focus:ring-2 focus:ring-violet-500/50
                         transition-all appearance-none cursor-pointer"
              >
                <option value="">選擇一個技能...</option>
                {skills.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.name} · {s.category}
                  </option>
                ))}
              </select>
              
              <button
                onClick={handleManualSubmit}
                disabled={loading || !selectedSkill}
                className="mt-4 w-full py-3.5 px-6 bg-violet-500 hover:bg-violet-600 
                         disabled:opacity-50 disabled:cursor-not-allowed
                         text-white font-medium rounded-xl transition-all 
                         flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    分析中...
                  </>
                ) : (
                  <>
                    探索技能路徑
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          )}

          {mode === 'text' && (
            <div className="p-6"
            >
              <label className="block text-sm font-medium text-zinc-400 mb-3"
              >
                貼上你的履歷或 LinkedIn 內容
              </label>
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                rows={8}
                placeholder="複製你的 LinkedIn About 部分、工作經歷..."
                className="w-full px-4 py-3 bg-[#0a0a0f] border border-white/[0.08] rounded-xl 
                         text-white placeholder-zinc-600 focus:outline-none 
                         focus:ring-2 focus:ring-violet-500/50 transition-all resize-none"
              />
              
              <button
                onClick={handleTextSubmit}
                disabled={loading || !text.trim()}
                className="mt-4 w-full py-3.5 px-6 bg-violet-500 hover:bg-violet-600 
                         disabled:opacity-50 disabled:cursor-not-allowed
                         text-white font-medium rounded-xl transition-all 
                         flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    提取中...
                  </>
                ) : (
                  <>
                    提取技能
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          )}
        </div>

        {/* Results */}
        {recommendations.length > 0 && !showUpgrade && (
          <div className="mt-12 space-y-4"
          >
            <div className="flex items-center gap-3 mb-6"
            >
              <div className="h-px flex-1 bg-gradient-to-r from-violet-500/50 to-transparent" />
              <span className="text-sm text-zinc-500">推薦學習路徑</span>
              <div className="h-px flex-1 bg-gradient-to-l from-violet-500/50 to-transparent" />
            </div>

            {recommendations.map((rec, i) => (
              <div 
                key={i} 
                className="group p-6 rounded-2xl bg-white/[0.02] border border-white/[0.06] 
                         hover:bg-white/[0.04] hover:border-violet-500/30 transition-all"
              >
                <div className="flex items-start justify-between mb-4"
                >
                  <div className="flex items-center gap-3"
                  >
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-500/20 
                                  to-fuchsia-500/20 border border-violet-500/30 
                                  flex items-center justify-center"
                    >
                      <span className="text-violet-300 font-semibold"
                      >{rec.skill.name[0]}</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-white group-hover:text-violet-300 transition-colors"
                      >
                        {rec.skill.name}
                      </h4>
                      <span className="text-xs text-zinc-500">{rec.skill.category}</span>
                    </div>
                  </div>
                  
                  <div className="text-right"
                  >
                    <div className="text-3xl font-bold bg-gradient-to-r from-violet-400 
                                  to-fuchsia-400 bg-clip-text text-transparent"
                    >
                      {rec.score}%
                    </div>
                    <div className="text-xs text-zinc-500">匹配度</div>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-[#0a0a0f] border border-white/[0.06] mb-4"
                >
                  <p className="text-zinc-300 text-sm leading-relaxed italic"
                  >
                    "{rec.analogy}"
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-4 text-sm"
                >
                  <div className="flex items-center gap-2 text-zinc-500"
                  >
                    <span>預計時間:</span>
                    <span className="text-zinc-300">{rec.timeEstimate}</span>
                  </div>
                  
                  <div className="flex items-center gap-2 text-zinc-500"
                  >
                    <span>難度:</span>
                    <span className="text-violet-400"
                    >
                      {'★'.repeat(rec.skill.level)}
                      <span className="text-zinc-600">{'☆'.repeat(5-rec.skill.level)}</span>
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
