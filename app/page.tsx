'use client';

import { useState } from 'react';
import { skills, findSkill, getRecommendations, extractSkillsFromText } from '@/lib/skills';
import { ExtractedSkill, Recommendation } from '@/types';
import { 
  Sparkles, 
  Network, 
  FileText, 
  User, 
  ChevronRight,
  Zap,
  Target,
  ArrowRight
} from 'lucide-react';

export default function Home() {
  const [mode, setMode] = useState<'manual' | 'linkedin' | 'pdf' | 'text'>('manual');
  const [selectedSkill, setSelectedSkill] = useState('');
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);
  const [extractedSkills, setExtractedSkills] = useState<ExtractedSkill[]>([]);
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [matchedSkill, setMatchedSkill] = useState<typeof skills[0] | null>(null);
  const [error, setError] = useState('');

  const handleManualSubmit = async () => {
    if (!selectedSkill) return;
    setLoading(true);
    setError('');
    
    try {
      const skill = findSkill(selectedSkill);
      if (skill) {
        setMatchedSkill(skill);
        const recs = getRecommendations(skill.id);
        setRecommendations(recs);
      }
    } catch (err) {
      setError('分析失敗，請重試');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleTextSubmit = async () => {
    if (!text.trim()) return;
    setLoading(true);
    setError('');
    
    try {
      const extracted = extractSkillsFromText(text);
      setExtractedSkills(extracted);
      
      if (extracted.length > 0) {
        const recs = getRecommendations(extracted[0].id);
        setRecommendations(recs);
      }
    } catch (err) {
      setError('提取技能失敗，請重試');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const modes = [
    { id: 'manual' as const, label: '手動選擇', icon: User, desc: '從技能庫選擇' },
    { id: 'text' as const, label: '文本分析', icon: FileText, desc: '貼上履歷內容' },
    { id: 'linkedin' as const, label: 'LinkedIn', icon: Network, desc: '即將推出' },
    { id: 'pdf' as const, label: 'PDF 履歷', icon: FileText, desc: '即將推出' },
  ];

  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/[0.08] bg-[#0a0a0f]/80 backdrop-blur-xl">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <span className="font-semibold text-white">Skill Bridge</span>
          </div>
          
          <a 
            href="/graph" 
            className="flex items-center gap-2 px-4 py-2 text-sm text-zinc-400 hover:text-white transition-colors rounded-lg hover:bg-white/[0.05]"
          >
            <Network className="w-4 h-4" />
            技能圖譜
          </a>
        </div>
      </nav>

      <main className="pt-32 pb-20 px-6">
        <div className="max-w-4xl mx-auto">
          {/* Hero */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.03] border border-white/[0.08] text-xs text-zinc-400 mb-6">
              <Zap className="w-3 h-3 text-violet-400" />
              AI 驱动的技能迁移
            </div>
            
            <h1 className="text-5xl sm:text-6xl font-bold tracking-tight mb-6">
              <span className="text-white">发现你的</span>
              <br />
              <span className="bg-gradient-to-r from-violet-400 via-fuchsia-300 to-cyan-300 bg-clip-text text-transparent">
                下一个技能
              </span>
            </h1>
            
            <p className="text-lg text-zinc-400 max-w-2xl mx-auto leading-relaxed">
              用 AI 类比降低跨学科学习门槛。
              <br className="hidden sm:block" />
              输入你的技能，探索通往新领域的最短路径。
            </p>
          </div>

          {/* Mode Selector */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-12">
            {modes.map(({ id, label, icon: Icon, desc }) => (
              <button
                key={id}
                onClick={() => setMode(id)}
                disabled={id === 'linkedin' || id === 'pdf'}
                className={`
                  relative p-4 rounded-xl border text-left transition-all duration-300
                  ${mode === id 
                    ? 'bg-white/[0.06] border-violet-500/50 shadow-[0_0_30px_-10px_rgba(139,92,246,0.3)]' 
                    : 'bg-white/[0.02] border-white/[0.08] hover:bg-white/[0.04] hover:border-white/[0.12]'
                  }
                  ${(id === 'linkedin' || id === 'pdf') && 'opacity-50 cursor-not-allowed'
                  }
                `}
              >
                <Icon className={`w-5 h-5 mb-3 ${mode === id ? 'text-violet-400' : 'text-zinc-500'}`} />
                <div className="font-medium text-white text-sm mb-1">{label}</div>
                <div className="text-xs text-zinc-500">{desc}</div>
                
                {mode === id && (
                  <div className="absolute inset-0 rounded-xl ring-1 ring-violet-500/30" />
                )}
              </button>
            ))}
          </div>

          {/* Error */}
          {error && (
            <div className="mb-8 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-300 text-sm">
              {error}
            </div>
          )}

          {/* Input Area */}
          <div className="rounded-2xl bg-white/[0.03] border border-white/[0.08] overflow-hidden">
            {mode === 'manual' && (
              <div className="p-6">
                <label className="block text-sm font-medium text-zinc-400 mb-3">
                  選擇你已掌握的技能
                </label>
                <select
                  value={selectedSkill}
                  onChange={(e) => setSelectedSkill(e.target.value)}
                  className="w-full px-4 py-3 bg-[#0a0a0f] border border-white/[0.08] rounded-xl 
                           text-white placeholder-zinc-600 focus:outline-none focus:ring-2 focus:ring-violet-500/50
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
                  className="mt-4 w-full py-3.5 px-6 bg-white text-[#0a0a0f] font-medium rounded-xl
                           hover:bg-zinc-200 disabled:opacity-40 disabled:cursor-not-allowed
                           transition-all flex items-center justify-center gap-2 group"
                >
                  {loading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-[#0a0a0f]/30 border-t-[#0a0a0f] rounded-full animate-spin" />
                      分析中...
                    </>
                  ) : (
                    <>
                      探索技能路徑
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                    </>
                  )}
                </button>
              </div>
            )}

            {mode === 'text' && (
              <div className="p-6">
                <label className="block text-sm font-medium text-zinc-400 mb-3">
                  貼上你的履歷或 LinkedIn 內容
                </label>
                <textarea
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  rows={8}
                  placeholder="複製你的 LinkedIn About 部分、工作經歷、或完整履歷內容到這裡..."
                  className="w-full px-4 py-3 bg-[#0a0a0f] border border-white/[0.08] rounded-xl 
                           text-white placeholder-zinc-600 focus:outline-none focus:ring-2 focus:ring-violet-500/50
                           transition-all resize-none"
                />
                
                <button
                  onClick={handleTextSubmit}
                  disabled={loading || !text.trim()}
                  className="mt-4 w-full py-3.5 px-6 bg-white text-[#0a0a0f] font-medium rounded-xl
                           hover:bg-zinc-200 disabled:opacity-40 disabled:cursor-not-allowed
                           transition-all flex items-center justify-center gap-2 group"
                >
                  {loading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-[#0a0a0f]/30 border-t-[#0a0a0f] rounded-full animate-spin" />
                      提取中...
                    </>
                  ) : (
                    <>
                      提取技能
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                    </>
                  )}
                </button>
              </div>
            )}

            {(mode === 'linkedin' || mode === 'pdf') && (
              <div className="p-12 text-center">
                <div className="w-16 h-16 rounded-2xl bg-white/[0.03] border border-white/[0.08] flex items-center justify-center mx-auto mb-4">
                  <Target className="w-8 h-8 text-zinc-600" />
                </div>
                <h3 className="text-white font-medium mb-2">即將推出</h3>
                <p className="text-zinc-500 text-sm mb-6">
                  {mode === 'linkedin' 
                    ? 'LinkedIn 有反爬蟲保護，請使用文本模式' 
                    : 'PDF 解析在開發中，請使用文本模式'}
                </p>
                <button
                  onClick={() => setMode('text')}
                  className="px-6 py-2.5 bg-white/[0.06] hover:bg-white/[0.1] border border-white/[0.08]
                           rounded-lg text-white text-sm transition-all"
                >
                  切換到文本模式
                </button>
              </div>
            )}
          </div>

          {/* Results */}
          {(extractedSkills.length > 0 || matchedSkill) && (
            <div className="mt-12">
              <div className="flex items-center gap-3 mb-6">
                <div className="h-px flex-1 bg-gradient-to-r from-violet-500/50 to-transparent" />
                <span className="text-sm text-zinc-500">分析結果</span>
                <div className="h-px flex-1 bg-gradient-to-l from-violet-500/50 to-transparent" />
              </div>

              {/* Extracted Skills */}
              {extractedSkills.length > 0 && (
                <div className="mb-8 p-6 rounded-2xl bg-gradient-to-br from-violet-500/10 to-fuchsia-500/10 border border-violet-500/20">
                  <h3 className="text-sm font-medium text-violet-300 mb-4 flex items-center gap-2">
                    <Sparkles className="w-4 h-4" />
                    提取到的技能
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {extractedSkills.map((s) => (
                      <span
                        key={s.id}
                        className="px-3 py-1.5 bg-violet-500/20 border border-violet-500/30 rounded-lg 
                                 text-violet-200 text-sm font-medium"
                      >
                        {s.name}
                        <span className="text-violet-400/60 ml-1.5">
                          {Math.round(s.confidence * 100)}%
                        </span>
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Matched Skill */}
              {matchedSkill && (
                <div className="mb-8 p-6 rounded-2xl bg-white/[0.03] border border-white/[0.08]">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-fuchsia-500 
                                  flex items-center justify-center text-lg">
                      {matchedSkill.name[0]}
                    </div>
                    <div>
                      <h3 className="font-semibold text-white">{matchedSkill.name}</h3>
                      <span className="text-xs text-zinc-500">{matchedSkill.category}</span>
                    </div>
                  </div>
                  <p className="text-zinc-400 text-sm">{matchedSkill.description}</p>
                </div>
              )}
            </div>
          )}

          {/* Recommendations */}
          {recommendations.length > 0 && (
            <div className="mt-12 space-y-4">
              <h3 className="text-lg font-semibold text-white mb-6">推薦學習路徑</h3>
              
              {recommendations.map((rec, i) => (
                <div 
                  key={i} 
                  className="group p-6 rounded-2xl bg-white/[0.02] border border-white/[0.06] 
                           hover:bg-white/[0.04] hover:border-violet-500/30 transition-all duration-300"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-500/20 to-fuchsia-500/20 
                                    border border-violet-500/30 flex items-center justify-center"
                      >
                        <span className="text-violet-300 font-semibold">{rec.skill.name[0]}</span>
                      </div>
                      <div>
                        <h4 className="font-semibold text-white group-hover:text-violet-300 transition-colors">
                          {rec.skill.name}
                        </h4>
                        <span className="text-xs text-zinc-500">{rec.skill.category}</span>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <div className="text-3xl font-bold bg-gradient-to-r from-violet-400 to-fuchsia-400 
                                    bg-clip-text text-transparent">
                        {rec.score}%
                      </div>
                      <div className="text-xs text-zinc-500">匹配度</div>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-[#0a0a0f] border border-white/[0.06] mb-4">
                    <p className="text-zinc-300 text-sm leading-relaxed italic">
                      "{rec.analogy}"
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center gap-4 text-sm">
                    <div className="flex items-center gap-2 text-zinc-500">
                      <span>預計時間:</span>
                      <span className="text-zinc-300">{rec.timeEstimate}</span>
                    </div>
                    
                    <div className="flex items-center gap-2 text-zinc-500">
                      <span>難度:</span>
                      <span className="text-violet-400">
                        {'★'.repeat(rec.skill.level)}
                        <span className="text-zinc-600">{'☆'.repeat(5-rec.skill.level)}</span>
                      </span>
                    </div>
                  </div>

                  {rec.prerequisites.length > 0 && (
                    <div className="mt-4 pt-4 border-t border-white/[0.06] flex items-center gap-2 text-sm"
                    >
                      <span className="text-zinc-500">建議先學:</span>
                      <span className="text-violet-300">{rec.prerequisites.join(', ')}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/[0.06] py-8">
        <div className="max-w-6xl mx-auto px-6 text-center text-sm text-zinc-600">
          Skill Bridge · 技能遷移圖譜 · {new Date().getFullYear()}
        </div>
      </footer>
    </div>
  );
}
