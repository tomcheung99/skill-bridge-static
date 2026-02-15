'use client';

import { useState } from 'react';
import SkillGraph from '@/components/SkillGraph';
import { skills, getRecommendations, findSkill } from '@/lib/skills';
import { Recommendation } from '@/types';

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

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      Technical: 'bg-blue-500/20 text-blue-400 border-blue-500/50',
      Creative: 'bg-pink-500/20 text-pink-400 border-pink-500/50',
      Analytical: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/50',
      Social: 'bg-orange-500/20 text-orange-400 border-orange-500/50',
      Business: 'bg-purple-500/20 text-purple-400 border-purple-500/50',
    };
    return colors[category] || 'bg-slate-500/20 text-slate-400 border-slate-500/50';
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      <header className="mb-8">
        <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
          技能圖譜
        </h1>
        <p className="text-slate-300">
          探索 50+ 技能之間的遷移路徑。點擊任意節點查看推薦學習路徑。
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* 左側：圖譜 */}
        <div className="lg:col-span-2">
          <SkillGraph
            onNodeClick={handleNodeClick}
            highlightSkill={selectedSkill?.id}
            relatedSkills={relatedSkillIds}
          />
        </div>

        {/* 右側：詳情面板 */}
        <div className="space-y-6">
          {selectedSkill ? (
            <>
              <div className="bg-slate-800/50 backdrop-blur rounded-2xl p-6 border border-cyan-500/30">
                <h2 className="text-2xl font-semibold mb-2">
                  {selectedSkill.name}
                </h2>                
                <span className={`inline-block px-2 py-1 rounded text-xs border ${getCategoryColor(selectedSkill.category)}`}>
                  {selectedSkill.category}
                </span>
                <p className="text-slate-400 mt-3">{selectedSkill.description}</p>
                
                <div className="mt-4">
                  <span className="text-slate-500">難度: </span>
                  <span className="text-cyan-400">{'★'.repeat(selectedSkill.level)}{'☆'.repeat(5-selectedSkill.level)}</span>
                </div>
              </div>

              {recommendations.length > 0 && (
                <div className="bg-slate-800/50 backdrop-blur rounded-2xl p-6 border border-slate-700"
                >
                  <h3 className="text-xl font-semibold text-slate-300 mb-4">推薦遷移</h3>
                  <div className="space-y-4">
                    {recommendations.slice(0, 3).map((rec, i) => (
                      <div key={i} className="border-l-2 border-cyan-500 pl-4">
                        <div className="flex items-center justify-between">
                          <span className="font-semibold text-white">{rec.skill.name}</span>
                          <span className="text-cyan-400 text-sm">{rec.score}%</span>
                        </div>
                        <p className="text-sm text-slate-400 mt-1 italic">
                          "{rec.analogy}"
                        </p>
                      </div>
                    ))}
                  </div>                
                </div>
              )}
            </>
          ) : (
            <div className="bg-slate-800/50 backdrop-blur rounded-2xl p-6 border border-slate-700 text-center"
            >
              <p className="text-slate-400">
                👆 點擊左側圖譜中的任意技能節點
              </p>
              <p className="text-slate-500 text-sm mt-2">
                查看詳細信息和推薦學習路徑
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
