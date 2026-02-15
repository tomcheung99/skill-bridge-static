'use client';

import { useState } from 'react';
import { skills, findSkill } from '@/lib/skills';
import { ExtractedSkill, Recommendation } from '@/types';

export default function Home() {
  const [mode, setMode] = useState<'manual' | 'linkedin' | 'pdf' | 'text'>('manual');
  const [selectedSkill, setSelectedSkill] = useState('');
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);
  const [extractedSkills, setExtractedSkills] = useState<ExtractedSkill[]>([]);
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [matchedSkill, setMatchedSkill] = useState<typeof skills[0] | null>(null);

  const handleManualSubmit = async () => {
    if (!selectedSkill) return;
    setLoading(true);
    
    const skill = findSkill(selectedSkill);
    if (skill) {
      setMatchedSkill(skill);
      const response = await fetch('/api/recommend', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ skill: selectedSkill }),
      });
      const data = await response.json();
      setRecommendations(data.recommendations || []);
    }
    
    setLoading(false);
  };

  const handleTextSubmit = async () => {
    if (!text.trim()) return;
    setLoading(true);
    
    const response = await fetch('/api/recommend', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text }),
    });
    const data = await response.json();
    
    if (data.extractedSkills) {
      setExtractedSkills(data.extractedSkills);
      setRecommendations(data.recommendations || []);
    }
    
    setLoading(false);
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
    <div className="max-w-4xl mx-auto px-6 py-16">
      <header className="text-center mb-16">
        <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
          Skill Bridge
        </h1>
        <p className="text-xl text-slate-300">
          技能遷移圖譜 — 用 AI 類比降低跨學科學習門檻
        </p>
      </header>

      {/* Mode Selection */}
      <div className="flex justify-center gap-4 mb-8 flex-wrap">
        {(['manual', 'linkedin', 'pdf', 'text'] as const).map((m) => (
          <button
            key={m}
            onClick={() => setMode(m)}
            className={`px-6 py-2 rounded-full border transition ${
              mode === m
                ? 'bg-cyan-500/20 border-cyan-500 text-cyan-400'
                : 'bg-slate-700 border-slate-600 text-slate-400 hover:bg-slate-600'
            }`}
          >
            {m === 'manual' && '手動選擇'}
            {m === 'linkedin' && 'LinkedIn'}
            {m === 'pdf' && '上傳 PDF'}
            {m === 'text' && '貼上文本'}
          </button>
        ))}
      </div>

      {/* Manual Mode */}
      {mode === 'manual' && (
        <div className="bg-slate-800/50 backdrop-blur rounded-2xl p-8 mb-12 border border-slate-700">
          <div className="mb-6">
            <label className="block text-sm font-medium text-slate-400 mb-2">選擇你已掌握的技能</label>
            <select
              value={selectedSkill}
              onChange={(e) => setSelectedSkill(e.target.value)}
              className="w-full px-4 py-3 bg-slate-900 border border-slate-600 rounded-lg focus:ring-2 focus:ring-cyan-500 outline-none transition text-white"
            >
              <option value="">選擇一個技能...</option>
              {skills.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name} ({s.category})
                </option>
              ))}
            </select>
          </div>
          <button
            onClick={handleManualSubmit}
            disabled={loading || !selectedSkill}
            className="w-full py-4 bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 rounded-lg font-semibold text-lg transition-all disabled:opacity-50"
          >
            {loading ? '分析中...' : '探索技能路徑'}
          </button>
        </div>
      )}

      {/* LinkedIn Mode */}
      {mode === 'linkedin' && (
        <div className="bg-slate-800/50 backdrop-blur rounded-2xl p-8 mb-12 border border-slate-700">
          <p className="text-slate-400 mb-4">
            LinkedIn 有反爬蟲保護。請切換到「貼上文本」模式，複製你的 LinkedIn About 和 Experience 內容。
          </p>
          <button
            onClick={() => setMode('text')}
            className="w-full py-4 bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 rounded-lg font-semibold text-lg transition-all"
          >
            切換到文本模式
          </button>
        </div>
      )}

      {/* PDF Mode */}
      {mode === 'pdf' && (
        <div className="bg-slate-800/50 backdrop-blur rounded-2xl p-8 mb-12 border border-slate-700">
          <p className="text-slate-400 mb-4">
            PDF 解析在瀏覽器端有限制。請切換到「貼上文本」模式，直接複製履歷內容。
          </p>
          <button
            onClick={() => setMode('text')}
            className="w-full py-4 bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 rounded-lg font-semibold text-lg transition-all"
          >
            切換到文本模式
          </button>
        </div>
      )}

      {/* Text Mode */}
      {mode === 'text' && (
        <div className="bg-slate-800/50 backdrop-blur rounded-2xl p-8 mb-12 border border-slate-700">
          <div className="mb-6">
            <label className="block text-sm font-medium text-slate-400 mb-2">貼上你的履歷或 LinkedIn 內容</label>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              rows={10}
              placeholder="複製你的 LinkedIn About 部分、工作經歷、或完整履歷內容到這裡..."
              className="w-full px-4 py-3 bg-slate-900 border border-slate-600 rounded-lg focus:ring-2 focus:ring-cyan-500 outline-none transition text-white resize-none"
            />
          </div>
          <button
            onClick={handleTextSubmit}
            disabled={loading || !text.trim()}
            className="w-full py-4 bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 rounded-lg font-semibold text-lg transition-all disabled:opacity-50"
          >
            {loading ? '提取中...' : '提取技能'}
          </button>
        </div>
      )}

      {/* Extracted Skills */}
      {extractedSkills.length > 0 && (
        <div className="bg-gradient-to-r from-emerald-900/50 to-cyan-900/50 rounded-2xl p-6 mb-8 border border-emerald-500/30">
          <h3 className="text-xl font-semibold mb-4 text-emerald-300">🔍 提取到的技能</h3>
          <div className="flex flex-wrap gap-2 mb-4">
            {extractedSkills.map((s) => (
              <span
                key={s.id}
                className="px-3 py-1 bg-emerald-500/20 border border-emerald-500/50 rounded-full text-emerald-300 text-sm"
              >
                {s.name} ({Math.round(s.confidence * 100)}%)
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Matched Skill */}
      {matchedSkill && (
        <div className="bg-slate-800/50 backdrop-blur rounded-2xl p-6 mb-8 border border-cyan-500/30">
          <h2 className="text-2xl font-semibold mb-2">
            已識別技能: <span className="text-cyan-400">{matchedSkill.name}</span>
          </h2>
          <span className={`inline-block px-2 py-1 rounded text-xs border ${getCategoryColor(matchedSkill.category)}`}>
            {matchedSkill.category}
          </span>
          <p className="text-slate-400 mt-2">{matchedSkill.description}</p>
        </div>
      )}

      {/* Recommendations */}
      {recommendations.length > 0 && (
        <div className="space-y-8">
          <h3 className="text-xl font-semibold text-slate-300">推薦學習路徑</h3>
          <div className="grid gap-4">
            {recommendations.map((rec, i) => (
              <div key={i} className="bg-slate-800/50 backdrop-blur rounded-xl p-6 border border-slate-700 hover:border-cyan-500/50 transition">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h4 className="text-lg font-semibold text-white">{rec.skill.name}</h4>
                    <span className={`inline-block px-2 py-1 rounded text-xs border ${getCategoryColor(rec.skill.category)}`}>
                      {rec.skill.category}
                    </span>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-cyan-400">{rec.score}</div>
                    <div className="text-xs text-slate-500">匹配分數</div>
                  </div>
                </div>

                <div className="bg-slate-900/50 rounded-lg p-4 mb-4">
                  <p className="text-slate-300 italic">"{rec.analogy}"</p>
                </div>

                <div className="flex items-center gap-4 text-sm">
                  <span className="text-slate-500">預計時間: <span className="text-slate-300">{rec.timeEstimate}</span></span>
                  <span className="text-slate-500">難度: <span className="text-slate-300">{'★'.repeat(rec.skill.level)}{'☆'.repeat(5-rec.skill.level)}</span></span>
                </div>

                {rec.prerequisites.length > 0 && (
                  <div className="mt-4 pt-4 border-t border-slate-700">
                    <span className="text-xs text-slate-500">建議先學: </span>
                    <span className="text-xs text-cyan-400">{rec.prerequisites.join(', ')}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
