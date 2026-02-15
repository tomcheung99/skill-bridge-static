'use client';

import { useState } from 'react';
import SkillGraph from '@/components/SkillGraph';
import { skills, getRecommendations } from '@/lib/skills';
import { Recommendation } from '@/types';
import { Network, ArrowLeft, Sparkles, Target } from 'lucide-react';
import Link from 'next/link';

export default function GraphPage() {
  const [selectedSkill, setSelectedSkill] = useState<typeof skills[0] | null>(null);
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [relatedSkillIds, setRelatedSkillIds] = useState<string[]>([]);

  const handleNodeClick = (skill: typeof skills[0]) => {
    setSelectedSkill(skill);
    const recs = getRecommendations(skill.id);
    setRecommendations(recs);
    setRelatedSkillIds(recs.map(r => r.skill.id));
  };

  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/[0.08] bg-[#0a0a0f]/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link 
              href="/" 
              className="flex items-center gap-2 text-zinc-500 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="text-sm">返回</span>
            </Link>
            
            <div className="w-px h-4 bg-white/[0.08]" />
            
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center">
                <Network className="w-4 h-4 text-white" />
              </div>
              <span className="font-semibold text-white">技能圖譜</span>
            </div>
          </div>
        </div>
      </nav>

      <main className="pt-24 pb-12 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.03] border border-white/[0.08] text-xs text-zinc-400 mb-4">
              <Sparkles className="w-3 h-3 text-violet-400" />
              50+ 技能 · 40+ 遷移路徑
            </div>
            
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-3">
              <span className="bg-gradient-to-r from-violet-400 via-fuchsia-300 to-cyan-300 bg-clip-text text-transparent">
                探索技能網絡
              </span>
            </h1>
            
            <p className="text-zinc-400 max-w-2xl">
              點擊任意節點查看詳情和推薦學習路徑。顏色代表技能類別，連線表示遷移可能性。
            </p>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            {/* Graph */}
            <div className="xl:col-span-2">
              <div className="rounded-2xl bg-white/[0.02] border border-white/[0.08] overflow-hidden">
                <SkillGraph
                  onNodeClick={handleNodeClick}
                  highlightSkill={selectedSkill?.id}
                  relatedSkills={relatedSkillIds}
                />
              </div>
            </div>

            {/* Detail Panel */}
            <div className="space-y-4">
              {selectedSkill ? (
                <>
                  <div className="p-6 rounded-2xl bg-white/[0.03] border border-violet-500/20"
                  >
                    <div className="flex items-center gap-3 mb-4"
                    >
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-500 to-fuchsia-500 
                                    flex items-center justify-center text-xl font-bold"
                      >
                        {selectedSkill.name[0]}
                      </div>
                      <div>
                        <h2 className="text-xl font-semibold text-white">{selectedSkill.name}</h2>
                        <span className="text-xs text-zinc-500">{selectedSkill.category}</span>
                      </div>
                    </div>
                    
                    <p className="text-zinc-400 text-sm mb-4">{selectedSkill.description}</p>
                    
                    <div className="flex items-center gap-2 text-sm">
                      <span className="text-zinc-500">難度:</span>
                      <span className="text-violet-400">{'★'.repeat(selectedSkill.level)}</span>
                      <span className="text-zinc-600">{'☆'.repeat(5-selectedSkill.level)}</span>
                    </div>
                  </div>

                  {recommendations.length > 0 && (
                    <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/[0.08]"
                    >
                      <div className="flex items-center gap-2 mb-4">
                        <Target className="w-4 h-4 text-violet-400" />
                        <h3 className="font-semibold text-white">推薦遷移</h3>
                      </div>
                      
                      <div className="space-y-3">
                        {recommendations.slice(0, 3).map((rec, i) => (
                          <div key={i} className="p-4 rounded-xl bg-[#0a0a0f] border border-white/[0.06]"
                          >
                            <div className="flex items-center justify-between mb-2"
                            >
                              <span className="font-medium text-white">{rec.skill.name}</span>
                              <span className="text-violet-400 text-sm font-semibold">{rec.score}%</span>
                            </div>
                            <p className="text-xs text-zinc-500 italic line-clamp-2">
                              "{rec.analogy}"
                            </p>
                          </div>
                        ))}
                      </div>                    
                    </div>
                  )}
                </>
              ) : (
                <div className="p-8 rounded-2xl bg-white/[0.02] border border-white/[0.08] text-center"
                >
                  <div className="w-16 h-16 rounded-2xl bg-white/[0.03] border border-white/[0.08] flex items-center justify-center mx-auto mb-4"
                  >
                    <Target className="w-8 h-8 text-zinc-600" />
                  </div>
                  
                  <p className="text-zinc-400 mb-2">點擊圖譜中的技能節點</p>
                  <p className="text-zinc-600 text-sm">查看詳細信息和推薦路徑</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
