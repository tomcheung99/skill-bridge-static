export interface Skill {
  id: string;
  name: string;
  category: 'Technical' | 'Creative' | 'Analytical' | 'Social' | 'Business';
  description: string;
  level: 1 | 2 | 3 | 4 | 5;
}

export interface SkillEdge {
  from: string;
  to: string;
  similarity: number;
  analogy: string;
  path: string[];
}

export interface Recommendation {
  skill: Skill;
  score: number;
  reason: string;
  analogy: string;
  prerequisites: string[];
  timeEstimate: string;
}

export interface ExtractedSkill {
  id: string;
  name: string;
  confidence: number;
}
