import { Skill, SkillEdge, Recommendation, ExtractedSkill } from '@/types';

// 擴展技能數據庫 - 基於 O*NET 框架，包含 50+ 技能
export const skills: Skill[] = [
  // ===== 技術類 (Technical) =====
  { id: 'programming', name: 'Programming', category: 'Technical', description: '編寫代碼解決問題', level: 3 },
  { id: 'data-analysis', name: 'Data Analysis', category: 'Technical', description: '從數據中提取洞察', level: 3 },
  { id: 'ui-design', name: 'UI Design', category: 'Technical', description: '設計用戶界面', level: 3 },
  { id: 'ux-design', name: 'UX Design', category: 'Technical', description: '設計用戶體驗和交互流程', level: 3 },
  { id: 'devops', name: 'DevOps', category: 'Technical', description: '自動化部署和運維', level: 4 },
  { id: 'system-design', name: 'System Design', category: 'Technical', description: '設計複雜系統架構', level: 4 },
  { id: 'machine-learning', name: 'Machine Learning', category: 'Technical', description: '構建和訓練 AI 模型', level: 4 },
  { id: 'data-engineering', name: 'Data Engineering', category: 'Technical', description: '構建數據管道和基礎設施', level: 4 },
  { id: 'cloud-architecture', name: 'Cloud Architecture', category: 'Technical', description: '設計雲端基礎架構', level: 4 },
  { id: 'cybersecurity', name: 'Cybersecurity', category: 'Technical', description: '保護系統和數據安全', level: 4 },
  { id: 'mobile-development', name: 'Mobile Development', category: 'Technical', description: '開發 iOS/Android 應用', level: 3 },
  { id: 'web-development', name: 'Web Development', category: 'Technical', description: '構建網站和網絡應用', level: 3 },
  { id: 'database-admin', name: 'Database Administration', category: 'Technical', description: '管理和優化數據庫', level: 3 },
  { id: 'network-engineering', name: 'Network Engineering', category: 'Technical', description: '設計和維護網絡架構', level: 4 },
  { id: 'embedded-systems', name: 'Embedded Systems', category: 'Technical', description: '開發硬件嵌入式軟件', level: 4 },
  { id: 'blockchain', name: 'Blockchain Development', category: 'Technical', description: '開發去中心化應用', level: 5 },
  { id: 'game-development', name: 'Game Development', category: 'Technical', description: '開發電子遊戲', level: 4 },
  { id: 'qa-testing', name: 'QA Testing', category: 'Technical', description: '軟件測試和質量保證', level: 2 },
  
  // ===== 創意類 (Creative) =====
  { id: 'visual-design', name: 'Visual Design', category: 'Creative', description: '視覺美學和排版', level: 3 },
  { id: 'copywriting', name: 'Copywriting', category: 'Creative', description: '撰寫有說服力的文案', level: 2 },
  { id: 'storytelling', name: 'Storytelling', category: 'Creative', description: '構建和講述故事', level: 2 },
  { id: 'video-production', name: 'Video Production', category: 'Creative', description: '拍攝和剪輯視頻', level: 3 },
  { id: 'motion-graphics', name: 'Motion Graphics', category: 'Creative', description: '創建動態視覺效果', level: 3 },
  { id: 'illustration', name: 'Illustration', category: 'Creative', description: '繪製插畫和圖像', level: 3 },
  { id: 'photography', name: 'Photography', category: 'Creative', description: '專業攝影和後期', level: 2 },
  { id: 'music-production', name: 'Music Production', category: 'Creative', description: '音樂創作和製作', level: 3 },
  { id: 'creative-writing', name: 'Creative Writing', category: 'Creative', description: '小說和劇本創作', level: 3 },
  { id: 'branding', name: 'Branding', category: 'Creative', description: '品牌視覺識別設計', level: 3 },
  { id: 'animation', name: 'Animation', category: 'Creative', description: '2D/3D 動畫製作', level: 4 },
  { id: 'sound-design', name: 'Sound Design', category: 'Creative', description: '音效設計和音頻編輯', level: 3 },
  
  // ===== 分析類 (Analytical) =====
  { id: 'critical-thinking', name: 'Critical Thinking', category: 'Analytical', description: '邏輯分析和評估', level: 3 },
  { id: 'problem-solving', name: 'Problem Solving', category: 'Analytical', description: '系統性解決複雜問題', level: 3 },
  { id: 'research', name: 'Research', category: 'Analytical', description: '信息收集和驗證', level: 2 },
  { id: 'statistical-analysis', name: 'Statistical Analysis', category: 'Analytical', description: '統計建模和假設測試', level: 4 },
  { id: 'financial-analysis', name: 'Financial Analysis', category: 'Analytical', description: '財務報表分析和建模', level: 4 },
  { id: 'operations-research', name: 'Operations Research', category: 'Analytical', description: '優化算法和決策科學', level: 5 },
  { id: 'scientific-research', name: 'Scientific Research', category: 'Analytical', description: '科學實驗和論文撰寫', level: 5 },
  { id: 'market-research', name: 'Market Research', category: 'Analytical', description: '市場趨勢和競爭分析', level: 3 },
  { id: 'risk-analysis', name: 'Risk Analysis', category: 'Analytical', description: '風險評估和管理', level: 4 },
  { id: 'systems-thinking', name: 'Systems Thinking', category: 'Analytical', description: '複雜系統動態分析', level: 4 },
  
  // ===== 社交類 (Social) =====
  { id: 'communication', name: 'Communication', category: 'Social', description: '清晰表達和傾聽', level: 2 },
  { id: 'leadership', name: 'Leadership', category: 'Social', description: '帶領和激勵團隊', level: 4 },
  { id: 'negotiation', name: 'Negotiation', category: 'Social', description: '達成雙贏協議', level: 3 },
  { id: 'teaching', name: 'Teaching', category: 'Social', description: '知識傳遞和指導', level: 3 },
  { id: 'coaching', name: 'Coaching', category: 'Social', description: '一對一潛能開發', level: 3 },
  { id: 'public-speaking', name: 'Public Speaking', category: 'Social', description: '公開演講和表達', level: 3 },
  { id: 'networking', name: 'Networking', category: 'Social', description: '建立專業人脈網絡', level: 2 },
  { id: 'conflict-resolution', name: 'Conflict Resolution', category: 'Social', description: '調解糾紛和衝突', level: 3 },
  { id: 'team-collaboration', name: 'Team Collaboration', category: 'Social', description: '跨職能團隊協作', level: 2 },
  { id: 'empathy', name: 'Empathy', category: 'Social', description: '理解和回應他人情感', level: 2 },
  { id: 'influencing', name: 'Influencing', category: 'Social', description: '說服和影響他人', level: 3 },
  
  // ===== 商業類 (Business) =====
  { id: 'product-management', name: 'Product Management', category: 'Business', description: '產品規劃和迭代', level: 4 },
  { id: 'strategy', name: 'Business Strategy', category: 'Business', description: '長期商業規劃', level: 4 },
  { id: 'marketing', name: 'Marketing', category: 'Business', description: '市場推廣策略', level: 3 },
  { id: 'sales', name: 'Sales', category: 'Business', description: '客戶開發和成交', level: 2 },
  { id: 'operations-management', name: 'Operations Management', category: 'Business', description: '運營流程優化', level: 4 },
  { id: 'project-management', name: 'Project Management', category: 'Business', description: '項目規劃和執行', level: 3 },
  { id: 'entrepreneurship', name: 'Entrepreneurship', category: 'Business', description: '創業和商業模式設計', level: 5 },
  { id: 'supply-chain', name: 'Supply Chain Management', category: 'Business', description: '供應鏈優化', level: 4 },
  { id: 'human-resources', name: 'Human Resources', category: 'Business', description: '人才招聘和組織發展', level: 3 },
  { id: 'customer-success', name: 'Customer Success', category: 'Business', description: '客戶關係和留存', level: 2 },
  { id: 'business-development', name: 'Business Development', category: 'Business', description: '商業機會拓展', level: 3 },
];

export const edges: Record<string, SkillEdge[]> = {
  // ===== 編程相關路徑 =====
  programming: [
    { from: 'programming', to: 'data-analysis', similarity: 85, analogy: '就像寫函數處理輸入輸出，數據分析是用 SQL/pandas 處理表格數據。你已經習慣邏輯流程，只是換了數據格式。', path: ['SQL基礎', '統計入門', '數據可視化'] },
    { from: 'programming', to: 'system-design', similarity: 90, analogy: '如果編程是寫一個函數，系統設計就是設計整個項目的文件結構。你已經知道模塊化，只是放大到服務級別。', path: ['分佈式系統', '數據庫設計', '擴展性'] },
    { from: 'programming', to: 'devops', similarity: 80, analogy: '編程是自動化計算，DevOps 是自動化部署流程。都是寫腳本讓機器做事，只是對象從業務邏輯變成基礎設施。', path: ['Linux', 'Docker', 'CI/CD'] },
    { from: 'programming', to: 'ui-design', similarity: 65, analogy: '編程講究代碼可讀性和結構，UI 設計講究視覺層次和信息架構。都是關於「組織複雜性讓人容易理解」。', path: ['設計原則', 'Figma', '用戶心理學'] },
    { from: 'programming', to: 'machine-learning', similarity: 75, analogy: '如果編程是「按食譜做萊」，機器學習是「讓機器自己發現食譜」。需要理解算法而不是只會調用庫。', path: ['線性代數', '微積分', '機器學習理論'] },
    { from: 'programming', to: 'game-development', similarity: 70, analogy: '遊戲開發是編程 + 物理模擬 + 圖形學的結合。你已經有編程基礎，只需要加上遊戲引擎和數學知識。', path: ['遊戲引擎', '計算機圖形學', '物理引擎'] },
    { from: 'programming', to: 'web-development', similarity: 85, analogy: 'Web 開發是編程的一個應用分支。你已經會寫代碼，現在要學瀏覽器如何工作、HTTP 協議、前後端交互。', path: ['HTML/CSS', 'JavaScript', 'React/Vue'] },
    { from: 'programming', to: 'mobile-development', similarity: 80, analogy: '移動應用開發和 Web 開發很像，只是平台從瀏覽器變成了 iOS/Android。核心編程能力完全適用。', path: ['Swift/Kotlin', '移動 UI 框架', '應用商店發布'] },
  ],
  
  // ===== 數據分析相關路徑 =====
  'data-analysis': [
    { from: 'data-analysis', to: 'machine-learning', similarity: 80, analogy: '數據分析告訴你「發生了什麼」，機器學習預測「將會發生什麼」。都是基於數據，但後者需要理解模型和算法。', path: ['監督學習', '特徴工程', '模型評估'] },
    { from: 'data-analysis', to: 'data-engineering', similarity: 85, analogy: '數據分析是「用數據回答問題」，數據工程是「確保數據乾淨可用」。一個是消費者，一個是生產者。', path: ['ETL 管道', '數據倉庫', 'Spark/Hadoop'] },
    { from: 'data-analysis', to: 'statistical-analysis', similarity: 90, analogy: '數據分析的很多方法來自統計學。統計給你嚴謹的推斷框架，讓你從樣本推斷總體。', path: ['假設測試', '回歸分析', '實驗設計'] },
    { from: 'data-analysis', to: 'strategy', similarity: 75, analogy: '數據分析回答「現狀是什麼」，策略回答「我們要往哪走」。你需要把「看懂數據」升級為「選擇方向」的判斷力。', path: ['市場分析', '競爭定位', '資源配置'] },
    { from: 'data-analysis', to: 'financial-analysis', similarity: 70, analogy: '財務分析是數據分析在金融領域的應用。你需要理解財務報表和估值模型，但核心技能（Excel、SQL、統計）是相同的。', path: ['財務報表', '估值模型', '投資理論'] },
  ],
  
  // ===== 視覺設計相關路徑 =====
  'visual-design': [
    { from: 'visual-design', to: 'ui-design', similarity: 85, analogy: '視覺設計是畫一幅畫，UI 設計是畫一套互動說明書。你已經掌握美學，只是加上「用戶如何操作」這個維度。', path: ['交互設計', '可用性', '設計系統'] },
    { from: 'visual-design', to: 'copywriting', similarity: 60, analogy: '視覺設計用顏色和排版引導視線，文案用詞語和節奏引導思維。都是關於「控制注意力流向」。', path: ['說服心理學', '語調風格', '轉化率'] },
    { from: 'visual-design', to: 'branding', similarity: 80, analogy: '品牌設計是視覺設計的系統化應用。你需要把單個設計擴展成一套可重複使用的視覺語言。', path: ['品牌策略', '標誌設計', '品牌指南'] },
    { from: 'visual-design', to: 'motion-graphics', similarity: 75, analogy: '動態圖形是視覺設計加上時間維度。你已經懂構圖和顏色，現在要學會用動畫講述故事。', path: ['After Effects', '動畫原理', '時間節奏'] },
    { from: 'visual-design', to: 'illustration', similarity: 70, analogy: '插畫是視覺設計中更偏向藝術創作的分支。需要更強的手繪能力和創意表達。', path: ['手繪基礎', '數位繪圖', '風格發展'] },
    { from: 'visual-design', to: 'photography', similarity: 65, analogy: '攝影和設計都涉及構圖、光線和顏色。攝影是捕捉現實，設計是創造視覺。', path: ['相機操作', '光影控制', '後期處理'] },
  ],
  
  // ===== UI/UX 設計相關路徑 =====
  'ui-design': [
    { from: 'ui-design', to: 'ux-design', similarity: 85, analogy: 'UI 是「界面長什麼樣」，UX 是「用起來什麼感覺」。兩者密不可分，UX 更關注流程和心理學。', path: ['用戶研究', '信息架構', '原型測試'] },
    { from: 'ui-design', to: 'product-management', similarity: 78, analogy: 'UI 設計是「做對的界面」，產品管理是「選對的功能做」。從「執行層」上升到「決策層」，思維模式是連續的。', path: ['用戶研究', '優先級', '指標'] },
    { from: 'ui-design', to: 'web-development', similarity: 60, analogy: '懂一點前端代碼能讓你和開發團隊溝通更順暢，也能設計出更易於實現的界面。', path: ['HTML/CSS 基礎', '響應式設計', '設計系統'] },
  ],
  
  'ux-design': [
    { from: 'ux-design', to: 'product-management', similarity: 82, analogy: 'UX 設計和產品經理都關注用戶需求和價值。UX 更偏重體驗，PM 更偏重商業，但思維方式非常相似。', path: ['產品策略', '數據驅動', '商業模式'] },
    { from: 'ux-design', to: 'research', similarity: 75, analogy: 'UX 設計需要大量用戶研究。你已經會訪談和觀察，只需要系統化這些方法。', path: ['訪談技巧', '可用性測試', '數據分析'] },
  ],
  
  // ===== 批判思維相關路徑 =====
  'critical-thinking': [
    { from: 'critical-thinking', to: 'problem-solving', similarity: 88, analogy: '批判思維是「懷疑和驗證」，問題解決是「懷疑 → 拆解 → 驗證每個部分 → 組裝答案」。你已經有核心能力，只是加上執行框架。', path: ['根因分析', '決策矩陣', '迭代'] },
    { from: 'critical-thinking', to: 'product-management', similarity: 70, analogy: '批判思維幫你問「這個假設成立嗎？」，產品管理是每天在無數假設中做選擇。你需要的是把分析能力應用到「價值判斷」上。', path: ['用戶研究', '優先級', '指標'] },
    { from: 'critical-thinking', to: 'scientific-research', similarity: 80, analogy: '科學研究是批判思維的嚴謹應用。你需要學習實驗設計、統計方法和論文寫作規範。', path: ['文獻回顧', '實驗設計', '統計分析'] },
    { from: 'critical-thinking', to: 'strategy', similarity: 75, analogy: '策略需要對複雜局勢進行批判性分析，識別關鍵假設和風險。', path: ['競爭分析', '情境規劃', '戰略選擇'] },
  ],
  
  // ===== 溝通相關路徑 =====
  communication: [
    { from: 'communication', to: 'teaching', similarity: 82, analogy: '溝通是雙向信息傳遞，教學是確保對方「真的懂了」。你已經能講清楚，現在要學會「檢驗對方理解程度」的技巧。', path: ['學習心理學', '評估', '課程設計'] },
    { from: 'communication', to: 'negotiation', similarity: 75, analogy: '溝通是分享信息，談判是在信息不對稱中找雙贏。你需要加上「對方想要什麼」和「我的底線在哪」這兩個變量。', path: ['利益分析', 'BATNA', '情緒控制'] },
    { from: 'communication', to: 'storytelling', similarity: 70, analogy: '日常溝通是「信息點」的傳遞，故事講述是「信息點 + 情感弧線 + 轉折」。就像把 bullet points 變成電影劇本。', path: ['敘事結構', '情感鉤子', '節奏'] },
    { from: 'communication', to: 'public-speaking', similarity: 85, analogy: '公開演講是溝通的高級形式。你需要在更大場景下保持清晰和影響力。', path: ['舞台表現', '聲音控制', '互動技巧'] },
    { from: 'communication', to: 'copywriting', similarity: 65, analogy: '文案是寫作的一種，專注於說服和轉化。你已經懂語言，現在要學會用詞語影響行為。', path: ['消費者心理', 'AIDA 模型', 'A/B 測試'] },
    { from: 'communication', to: 'sales', similarity: 70, analogy: '銷售是溝通的商業應用。你需要在理解客戶需求的基礎上，說服他們採取行動。', path: ['銷售流程', '異議處理', '成交技巧'] },
  ],
  
  // ===== 教學相關路徑 =====
  teaching: [
    { from: 'teaching', to: 'leadership', similarity: 72, analogy: '教學是一對多傳遞知識，領導力是一對多協調目標 + 動力 + 衝突。你已經會帶人「學」，現在要帶人「做」。', path: ['授權', '衝突解決', '願景設定'] },
    { from: 'teaching', to: 'coaching', similarity: 80, analogy: '教練是教學的一對一深化版本。更關注個人成長和潛能開發，而非知識傳遞。', path: ['教練模型', '提問技巧', '目標設定'] },
    { from: 'teaching', to: 'public-speaking', similarity: 75, analogy: '教學和演講都涉及在眾人面前清晰表達。教學更側重互動和確認理解。', path: ['簡報設計', '互動技巧', '現場應變'] },
  ],
  
  // ===== 領導力相關路徑 =====
  leadership: [
    { from: 'leadership', to: 'strategy', similarity: 78, analogy: '領導者需要為團隊指明方向。策略思維幫你做出正確的選擇，而不是只會執行。', path: ['戰略規劃', '組織設計', '變革管理'] },
    { from: 'leadership', to: 'operations-management', similarity: 70, analogy: '領導是「帶人」，運營是「管事」。兩者結合才能讓團隊高效運轉。', path: ['流程優化', '績效管理', '資源配置'] },
    { from: 'leadership', to: 'coaching', similarity: 75, analogy: '優秀的領導者也是團隊的教練。你需要幫助每個成員成長，而不只是分派任務。', path: ['績效反饋', '職業發展', '激勵理論'] },
    { from: 'leadership', to: 'conflict-resolution', similarity: 80, analogy: '領導者經常需要處理團隊內部的衝突。這是領導力的核心組成部分。', path: ['調解技巧', '溝通策略', '關係修復'] },
  ],
  
  // ===== 產品相關路徑 =====
  'product-management': [
    { from: 'product-management', to: 'strategy', similarity: 82, analogy: '產品管理是「做對的事」，策略是「選對的戰場」。從「產品級選擇」放大到「公司級選擇」，思維模式類似，只是影響範圍更大。', path: ['市場分析', '競爭定位', '長期規劃'] },
    { from: 'product-management', to: 'data-analysis', similarity: 75, analogy: '現代產品經理必須是數據驅動的。你需要用數據證明假設，評估功能效果。', path: ['產品指標', '實驗設計', 'SQL 基礎'] },
    { from: 'product-management', to: 'marketing', similarity: 70, analogy: '產品經理和營銷都關注用戶需求和價值主張。一個負責打造，一個負責推廣。', path: ['定位策略', '用戶洞察', '增長策略'] },
    { from: 'product-management', to: 'entrepreneurship', similarity: 85, analogy: '創業者是最極端的產品經理 — 你不僅要定義產品，還要籌資、組建團隊、找到商業模式。', path: ['商業模式', '籌資', '市場進入'] },
    { from: 'product-management', to: 'project-management', similarity: 65, analogy: '產品管理是「做對的事」，項目管理是「把事做對」。兩者互補，但思維方式不同。', path: ['敏捷方法', '範圍管理', '跨部門協作'] },
  ],
  
  // ===== 營銷相關路徑 =====
  marketing: [
    { from: 'marketing', to: 'copywriting', similarity: 75, analogy: '文案是營銷的核心工具之一。好的營銷人必須懂如何用文字影響受眾。', path: ['品牌語調', '轉化文案', '內容策略'] },
    { from: 'marketing', to: 'data-analysis', similarity: 70, analogy: '現代營銷是數據驅動的。你需要分析廣告效果、用戶行為和 ROI。', path: ['營銷分析', 'A/B 測試', '歸因模型'] },
    { from: 'marketing', to: 'branding', similarity: 80, analogy: '品牌是營銷的長期投資。營銷是短期的推廣活動，品牌是長期的認知建設。', path: ['品牌策略', '視覺識別', '品牌體驗'] },
    { from: 'marketing', to: 'sales', similarity: 75, analogy: '營銷和銷售是硬幣的兩面。一個負責吸引，一個負責轉化。你需要理解整個客戶旅程。', path: ['銷售漏斗', '線索培育', '營銷協作'] },
  ],
  
  // ===== 創業相關路徑 =====
  entrepreneurship: [
    { from: 'entrepreneurship', to: 'strategy', similarity: 80, analogy: '創業者必須是公司最好的戰略家。你要在資源極度有限的情況下做出關鍵選擇。', path: ['商業模式創新', '競爭策略', '增長策略'] },
    { from: 'entrepreneurship', to: 'product-management', similarity: 85, analogy: '早期創業者就是最極端的產品經理。你不僅要定義產品，還要親自參與設計和開發。', path: ['MVP 方法', '產品市場契合', '疊代速度'] },
    { from: 'entrepreneurship', to: 'leadership', similarity: 75, analogy: '創業者必須快速學會帶人。從一個人單槍匹馬到帶領幾十人甚至上百人。', path: ['團隊建設', '文化塑造', '願景傳達'] },
    { from: 'entrepreneurship', to: 'financial-analysis', similarity: 70, analogy: '創業者必須懂財務，包括現金流管理、融資估值和單位經濟模型。', path: ['財務報表', '估值方法', '投資條款'] },
  ],
  
  // ===== 研究相關路徑 =====
  research: [
    { from: 'research', to: 'scientific-research', similarity: 85, analogy: '科學研究是研究方法的嚴謹應用。你需要掌握更嚴格的實驗設計和同行評審流程。', path: ['實驗設計', '統計方法', '學術寫作'] },
    { from: 'research', to: 'market-research', similarity: 80, analogy: '市場研究是研究方法在商業領域的應用。目標是理解消費者行為和市場趨勢。', path: ['調查設計', '焦點小組', '趨勢分析'] },
    { from: 'research', to: 'data-analysis', similarity: 75, analogy: '現代研究離不開數據分析。你需要用統計方法從數據中提取有意義的結論。', path: ['定量方法', '統計軟件', '數據可視化'] },
  ],
  
  // ===== 項目管理相關路徑 =====
  'project-management': [
    { from: 'project-management', to: 'operations-management', similarity: 75, analogy: '項目管理是「臨時性的獨特任務」，運營管理是「重複性的常規任務」。兩者都需要流程和協調能力。', path: ['流程標準化', '績效管理', '持續改進'] },
    { from: 'project-management', to: 'leadership', similarity: 70, analogy: '項目經理需要領導跨職能團隊，但沒有正式權威。你需要靠影響力而非職位來推動事情。', path: ['矩陣管理', '利益相關方管理', '變革領導'] },
  ],
  
  // ===== 統計相關路徑 =====
  'statistical-analysis': [
    { from: 'statistical-analysis', to: 'machine-learning', similarity: 80, analogy: '機器學習建立在統計基礎之上。你需要理解概率、分布和推斷，才能理解算法原理。', path: ['監督學習', '非監督學習', '模型評估'] },
    { from: 'statistical-analysis', to: 'data-analysis', similarity: 90, analogy: '數據分析是統計的商業應用。統計給你嚴謹的框架，數據分析讓你解決實際問題。', path: ['探索性分析', '可視化', '報告撰寫'] },
    { from: 'statistical-analysis', to: 'operations-research', similarity: 75, analogy: '運籌學是統計和優化的結合。用數學方法找到最優決策。', path: ['線性規劃', '模擬', '決策分析'] },
  ],
  
  // ===== 財務分析相關路徑 =====
  'financial-analysis': [
    { from: 'financial-analysis', to: 'strategy', similarity: 70, analogy: '財務分析支持戰略決策。你需要理解財務數據如何影響長期競爭優勢。', path: ['估值策略', '投資回報', '資本配置'] },
    { from: 'financial-analysis', to: 'data-analysis', similarity: 80, analogy: '財務分析是數據分析的專業化應用。核心技能（Excel、建模、報表）是相通的。', path: ['財務建模', '預測分析', '自動化'] },
  ],
  
  // ===== 銷售相關路徑 =====
  sales: [
    { from: 'sales', to: 'negotiation', similarity: 85, analogy: '銷售過程充滿了談判。從價格到條款，你需要和客戶達成雙方都能接受的協議。', path: ['價格談判', '契約條款', '關係維護'] },
    { from: 'sales', to: 'business-development', similarity: 80, analogy: '商業拓展是銷售的戰略版本。更關注長期合作關係和大客戶開發。', path: ['戰略合作', '管道建設', '市場進入'] },
    { from: 'sales', to: 'customer-success', similarity: 75, analogy: '現代銷售不僅是成交，還要確保客戶成功從而續約。這是 SaaS 時代的銷售模式。', path: ['客戶留存', '增長銷售', '客戶健康度'] },
  ],
  
  // ===== 公眾演講相關路徑 =====
  'public-speaking': [
    { from: 'public-speaking', to: 'storytelling', similarity: 80, analogy: '出色的演講者都是講故事的高手。數據和論點需要包裹在故事中才能打動人心。', path: ['敘事結構', '情感共鳴', '記憶點設計'] },
    { from: 'public-speaking', to: 'leadership', similarity: 70, analogy: '領導者必須能夠在公衆場合清晰表達願景和方向。演講是領導力的重要組成。', path: ['願景傳達', '激勵演講', '媒體應對'] },
  ],
  
  // ===== 視頻製作相關路徑 =====
  'video-production': [
    { from: 'video-production', to: 'motion-graphics', similarity: 85, analogy: '動態圖形是視頻製作的一個專業分支。專注於圖形動畫而非實拍素材。', path: ['動畫軟件', '圖形設計', '節奏控制'] },
    { from: 'video-production', to: 'photography', similarity: 75, analogy: '視頻是每秒 24 張照片。攝影的構圖、光線和顏色知識完全適用於視頻。', path: ['電影攝影', '燈光技巧', '色彩分級'] },
    { from: 'video-production', to: 'storytelling', similarity: 70, analogy: '好的視頻需要好的故事。技術只是工具，敘事才是靈魂。', path: ['劇本寫作', '剪輯節奏', '聲音設計'] },
  ],
  
  // ===== UI 設計相關路徑 =====
  'ui-design': [
    { from: 'ui-design', to: 'product-management', similarity: 78, analogy: 'UI 設計是「做對的界面」，產品管理是「選對的功能做」。從「執行層」上升到「決策層」，思維模式是連續的。', path: ['用戶研究', '優先級', '指標'] },
  ],
};

export const skillKeywords: Record<string, string[]> = {
  // 技術類
  programming: ['programming', 'coding', 'software', 'developer', 'engineer', 'javascript', 'python', 'java', 'react', 'node', 'web development', 'app development', '前端', '後端', '全棧', '開發', '編程', '軟件工程', '程序員'],
  'data-analysis': ['data', 'analytics', 'sql', 'python', 'pandas', 'numpy', 'machine learning', 'ai', 'statistics', '數據分析', '數據科學', '分析師', 'BI', 'tableau'],
  'machine-learning': ['machine learning', 'deep learning', 'ai', 'artificial intelligence', 'neural network', 'tensorflow', 'pytorch', '模型訓練', '機器學習', '深度學習', '人工智能'],
  'data-engineering': ['data engineering', 'etl', 'data pipeline', 'spark', 'hadoop', 'kafka', '數據工程', '數據管道'],
  'cloud-architecture': ['cloud', 'aws', 'azure', 'gcp', 'kubernetes', 'docker', '雲端', '雲架構'],
  cybersecurity: ['security', 'cybersecurity', 'penetration testing', 'encryption', 'firewall', '安全', '網絡安全', '渗透測試'],
  'mobile-development': ['mobile', 'ios', 'android', 'swift', 'kotlin', 'flutter', 'react native', '移動開發', '手機應用'],
  'web-development': ['web', 'frontend', 'backend', 'full stack', 'html', 'css', 'javascript', 'react', 'vue', '網頁開發', '前端', '後端'],
  'system-design': ['system design', 'architecture', 'distributed systems', 'microservices', '系統設計', '架構', '分佈式'],
  devops: ['devops', 'ci/cd', 'jenkins', 'docker', 'kubernetes', 'automation', '運維', '自動化部署'],
  'database-admin': ['database', 'sql', 'mysql', 'postgresql', 'mongodb', 'dba', '數據庫'],
  'game-development': ['game', 'unity', 'unreal', 'game development', '遊戲開發'],
  blockchain: ['blockchain', 'web3', 'smart contract', 'ethereum', 'solidity', '區塊鏈'],
  'qa-testing': ['testing', 'qa', 'selenium', 'automation testing', '測試', '質量保證'],
  
  // 創意類
  'visual-design': ['graphic design', 'visual', 'photoshop', 'illustrator', 'branding', 'logo', 'creative', '設計', '視覺', '平面設計'],
  'ui-design': ['ui design', 'user interface', 'figma', 'sketch', 'adobe xd', '界面設計'],
  'ux-design': ['ux design', 'user experience', 'wireframe', 'prototype', 'usability', '用戶體驗', '交互設計'],
  copywriting: ['copywriting', 'content writing', 'marketing copy', '文案', '寫作'],
  storytelling: ['storytelling', 'narrative', 'story', '講故事', '敘事'],
  'video-production': ['video', 'filmmaking', 'premiere', 'final cut', 'video editing', '視頻製作', '剪輯'],
  'motion-graphics': ['motion graphics', 'after effects', 'animation', '動態圖形', '動效'],
  illustration: ['illustration', 'drawing', 'digital art', '插畫', '繪畫'],
  photography: ['photography', 'photo', 'camera', 'lightroom', '攝影'],
  'music-production': ['music production', 'audio', 'mixing', 'mastering', 'ableton', '音樂製作'],
  'creative-writing': ['creative writing', 'fiction', 'novel', 'screenplay', '創意寫作', '小說'],
  branding: ['branding', 'brand identity', 'brand strategy', '品牌'],
  animation: ['animation', '3d animation', 'maya', 'blender', '動畫'],
  'sound-design': ['sound design', 'audio editing', 'foley', '音效'],
  
  // 分析類
  'critical-thinking': ['problem solving', 'analytical', 'critical thinking', '邏輯', '分析', '批判思維'],
  'problem-solving': ['problem solving', 'troubleshooting', 'debugging', '解決問題'],
  research: ['research', 'investigation', 'study', '研究', '調查'],
  'statistical-analysis': ['statistics', 'statistical modeling', 'hypothesis testing', '統計', '回歸分析'],
  'financial-analysis': ['financial analysis', 'valuation', 'modeling', '財務分析', '估值'],
  'operations-research': ['operations research', 'optimization', 'linear programming', '運籌學'],
  'scientific-research': ['scientific research', 'academic research', 'publication', '科學研究', '學術'],
  'market-research': ['market research', 'consumer research', 'focus group', '市場研究'],
  'risk-analysis': ['risk management', 'risk assessment', 'compliance', '風險管理'],
  'systems-thinking': ['systems thinking', 'complexity', 'system dynamics', '系統思維'],
  
  // 社交類
  communication: ['communication', 'presentation', 'public speaking', 'writing', '溝通', '演講'],
  leadership: ['leadership', 'manager', 'management', 'team lead', 'director', 'vp', 'cto', 'ceo', '領導', '管理'],
  negotiation: ['negotiation', 'deal making', 'conflict resolution', '談判'],
  teaching: ['teaching', 'training', 'instruction', 'facilitation', '教學', '培訓'],
  coaching: ['coaching', 'mentoring', 'coaching', '教練', '導師'],
  'public-speaking': ['public speaking', 'presentation', 'keynote', 'speech', '公開演講'],
  networking: ['networking', 'relationship building', 'connections', '人脈'],
  'conflict-resolution': ['conflict resolution', 'mediation', 'dispute resolution', '衝突解決'],
  'team-collaboration': ['teamwork', 'collaboration', 'cross-functional', '團隊協作'],
  empathy: ['empathy', 'emotional intelligence', 'listening', '同理心'],
  influencing: ['influencing', 'persuasion', 'stakeholder management', '影響力'],
  
  // 商業類
  'product-management': ['product manager', 'product owner', 'pm', 'roadmap', 'feature', '產品經理', '產品管理'],
  strategy: ['strategy', 'strategic planning', 'business strategy', '戰略'],
  marketing: ['marketing', 'digital marketing', 'growth', 'seo', 'sem', '營銷', '市場推廣'],
  sales: ['sales', 'business development', 'account executive', '銷售'],
  'operations-management': ['operations', 'supply chain', 'logistics', 'operations management', '運營管理'],
  'project-management': ['project manager', 'program manager', 'pm', 'project management', '項目管理'],
  entrepreneurship: ['entrepreneur', 'founder', 'startup', '創業'],
  'supply-chain': ['supply chain', 'logistics', 'procurement', '供應鏈'],
  'human-resources': ['hr', 'human resources', 'recruiting', 'talent', '人力資源'],
  'customer-success': ['customer success', 'account management', 'customer support', '客戶成功'],
  'business-development': ['business development', 'partnerships', 'bd', '商業拓展'],
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
