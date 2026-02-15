import { Skill, SkillEdge, Recommendation, ExtractedSkill } from '@/types';

export const skills: Skill[] = [
  { id: 'programming', name: 'Programming', category: 'Technical', description: '編寫代碼解決問題', level: 3 },
  { id: 'data-analysis', name: 'Data Analysis', category: 'Technical', description: '從數據中提取洞察', level: 3 },
  { id: 'ui-design', name: 'UI Design', category: 'Technical', description: '設計用戶界面', level: 3 },
  { id: 'devops', name: 'DevOps', category: 'Technical', description: '自動化部署和運維', level: 4 },
  { id: 'system-design', name: 'System Design', category: 'Technical', description: '設計複雜系統架構', level: 4 },
  { id: 'visual-design', name: 'Visual Design', category: 'Creative', description: '視覺美學和排版', level: 3 },
  { id: 'copywriting', name: 'Copywriting', category: 'Creative', description: '撰寫有說服力的文案', level: 2 },
  { id: 'storytelling', name: 'Storytelling', category: 'Creative', description: '構建和講述故事', level: 2 },
  { id: 'critical-thinking', name: 'Critical Thinking', category: 'Analytical', description: '邏輯分析和評估', level: 3 },
  { id: 'problem-solving', name: 'Problem Solving', category: 'Analytical', description: '系統性解決複雜問題', level: 3 },
  { id: 'research', name: 'Research', category: 'Analytical', description: '信息收集和驗證', level: 2 },
  { id: 'communication', name: 'Communication', category: 'Social', description: '清晰表達和傾聽', level: 2 },
  { id: 'leadership', name: 'Leadership', category: 'Social', description: '帶領和激勵團隊', level: 4 },
  { id: 'negotiation', name: 'Negotiation', category: 'Social', description: '達成雙贏協議', level: 3 },
  { id: 'teaching', name: 'Teaching', category: 'Social', description: '知識傳遞和指導', level: 3 },
  { id: 'product-management', name: 'Product Management', category: 'Business', description: '產品規劃和迭代', level: 4 },
  { id: 'strategy', name: 'Business Strategy', category: 'Business', description: '長期商業規劃', level: 4 },
  { id: 'marketing', name: 'Marketing', category: 'Business', description: '市場推廣策略', level: 3 },
];

export const edges: Record<string, SkillEdge[]> = {
  programming: [
    { from: 'programming', to: 'data-analysis', similarity: 85, analogy: '就像寫函數處理輸入輸出，數據分析是用 SQL/pandas 處理表格數據。你已經習慣邏輯流程，只是換了數據格式。', path: ['SQL基礎', '統計入門', '數據可視化'] },
    { from: 'programming', to: 'system-design', similarity: 90, analogy: '如果編程是寫一個函數，系統設計就是設計整個項目的文件結構。你已經知道模塊化，只是放大到服務級別。', path: ['分佈式系統', '數據庫設計', '擴展性'] },
    { from: 'programming', to: 'devops', similarity: 80, analogy: '編程是自動化計算，DevOps 是自動化部署流程。都是寫腳本讓機器做事，只是對象從業務邏輯變成基礎設施。', path: ['Linux', 'Docker', 'CI/CD'] },
    { from: 'programming', to: 'ui-design', similarity: 65, analogy: '編程講究代碼可讀性和結構，UI 設計講究視覺層次和信息架構。都是關於「組織複雜性讓人容易理解」。', path: ['設計原則', 'Figma', '用戶心理學'] },
  ],
  'visual-design': [
    { from: 'visual-design', to: 'ui-design', similarity: 85, analogy: '視覺設計是畫一幅畫，UI 設計是畫一套互動說明書。你已經掌握美學，只是加上「用戶如何操作」這個維度。', path: ['交互設計', '可用性', '設計系統'] },
    { from: 'visual-design', to: 'copywriting', similarity: 60, analogy: '視覺設計用顏色和排版引導視線，文案用詞語和節奏引導思維。都是關於「控制注意力流向」。', path: ['說服心理學', '語調風格', '轉化率'] },
  ],
  'critical-thinking': [
    { from: 'critical-thinking', to: 'problem-solving', similarity: 88, analogy: '批判思維是「懷疑和驗證」，問題解決是「懷疑 → 拆解 → 驗證每個部分 → 組裝答案」。你已經有核心能力，只是加上執行框架。', path: ['根因分析', '決策矩陣', '迭代'] },
    { from: 'critical-thinking', to: 'product-management', similarity: 70, analogy: '批判思維幫你問「這個假設成立嗎？」，產品管理是每天在無數假設中做選擇。你需要的是把分析能力應用到「價值判斷」上。', path: ['用戶研究', '優先級', '指標'] },
  ],
  communication: [
    { from: 'communication', to: 'teaching', similarity: 82, analogy: '溝通是雙向信息傳遞，教學是確保對方「真的懂了」。你已經能講清楚，現在要學會「檢驗對方理解程度」的技巧。', path: ['學習心理學', '評估', '課程設計'] },
    { from: 'communication', to: 'negotiation', similarity: 75, analogy: '溝通是分享信息，談判是在信息不對稱中找雙贏。你需要加上「對方想要什麼」和「我的底線在哪」這兩個變量。', path: ['利益分析', 'BATNA', '情緒控制'] },
    { from: 'communication', to: 'storytelling', similarity: 70, analogy: '日常溝通是「信息點」的傳遞，故事講述是「信息點 + 情感弧線 + 轉折」。就像把 bullet points 變成電影劇本。', path: ['敘事結構', '情感鉤子', '節奏'] },
  ],
  teaching: [
    { from: 'teaching', to: 'leadership', similarity: 72, analogy: '教學是一對多傳遞知識，領導力是一對多協調目標 + 動力 + 衝突。你已經會帶人「學」，現在要帶人「做」。', path: ['授權', '衝突解決', '願景設定'] },
  ],
  'data-analysis': [
    { from: 'data-analysis', to: 'strategy', similarity: 75, analogy: '數據分析回答「現狀是什麼」，策略回答「我們要往哪走」。你需要把「看懂數據」升級為「選擇方向」的判斷力。', path: ['市場分析', '競爭定位', '資源配置'] },
  ],
  'ui-design': [
    { from: 'ui-design', to: 'product-management', similarity: 78, analogy: 'UI 設計是「做對的界面」，產品管理是「選對的功能做」。從「執行層」上升到「決策層」，思維模式是連續的。', path: ['用戶研究', '優先級', '指標'] },
  ],
};

export const skillKeywords: Record<string, string[]> = {
  programming: ['programming', 'coding', 'software', 'developer', 'engineer', 'javascript', 'python', 'java', 'react', 'node', 'web development', 'app development', '前端', '後端', '全棧', '開發', '編程'],
  'data-analysis': ['data', 'analytics', 'sql', 'python', 'pandas', 'numpy', 'machine learning', 'ai', 'statistics', '數據分析', '數據科學'],
  'visual-design': ['graphic design', 'visual', 'photoshop', 'illustrator', 'branding', 'logo', 'creative', '設計', '視覺'],
  'ui-design': ['ui', 'user interface', 'figma', 'sketch', 'ux', 'prototype', '界面設計'],
  communication: ['communication', 'presentation', 'public speaking', 'writing', '溝通', '演講'],
  leadership: ['leadership', 'manager', 'management', 'team lead', 'director', 'vp', 'cto', 'ceo', '領導', '管理'],
  'product-management': ['product manager', 'product owner', 'pm', 'roadmap', 'feature', '產品經理'],
  teaching: ['teaching', 'mentoring', 'training', 'instructor', 'tutor', 'coach', '教學', '導師'],
  'critical-thinking': ['problem solving', 'analytical', 'research', 'strategy', '邏輯', '分析'],
  negotiation: ['negotiation', 'sales', 'business development', 'partnership', '談判', '銷售'],
};

export function findSkill(query: string): Skill | undefined {
  const lower = query.toLowerCase();
  return skills.find(s => 
    s.id.toLowerCase().includes(lower) ||
    s.name.toLowerCase().includes(lower) ||
    s.name.toLowerCase().replace(/\s/g, '').includes(lower.replace(/\s/g, ''))
  );
}

export function getRecommendations(skillId: string): Recommendation[] {
  const connections = edges[skillId] || [];
  return connections.map(edge => {
    const targetSkill = skills.find(s => s.id === edge.to)!;
    const baseHours = targetSkill.level * 100;
    return {
      skill: targetSkill,
      score: edge.similarity,
      reason: `基於你掌握的 ${skills.find(s => s.id === skillId)?.name}，這是自然的延伸方向`,
      analogy: edge.analogy,
      prerequisites: edge.path,
      timeEstimate: `${Math.ceil(baseHours / 10)} 週`,
    };
  });
}

export function extractSkillsFromText(text: string): ExtractedSkill[] {
  const text_lower = text.toLowerCase();
  const found: ExtractedSkill[] = [];
  
  for (const [skillId, keywords] of Object.entries(skillKeywords)) {
    let matchCount = 0;
    for (const keyword of keywords) {
      if (text_lower.includes(keyword.toLowerCase())) {
        matchCount++;
      }
    }
    if (matchCount > 0) {
      const skill = findSkill(skillId);
      if (skill) {
        found.push({
          id: skillId,
          name: skill.name,
          confidence: Math.min(matchCount * 0.2 + 0.5, 0.95),
        });
      }
    }
  }
  
  return found.sort((a, b) => b.confidence - a.confidence).slice(0, 5);
}
