import { NextRequest, NextResponse } from 'next/server';
import { getRecommendations, extractSkillsFromText, findSkill } from '@/lib/skills';

export async function POST(request: NextRequest) {
  try {
    const { skill, text } = await request.json();
    
    if (text) {
      // Extract skills from text
      const extractedSkills = extractSkillsFromText(text);
      if (extractedSkills.length === 0) {
        return NextResponse.json({ error: 'No skills found in text' }, { status: 404 });
      }
      
      const recommendations = getRecommendations(extractedSkills[0].id);
      return NextResponse.json({
        source: 'text',
        extractedSkills,
        recommendations,
      });
    }
    
    if (skill) {
      // Find skill and get recommendations
      const matchedSkill = findSkill(skill);
      if (!matchedSkill) {
        return NextResponse.json({ error: `Skill not found: ${skill}` }, { status: 404 });
      }
      
      const recommendations = getRecommendations(matchedSkill.id);
      return NextResponse.json({
        source: 'manual',
        matchedSkill,
        recommendations,
      });
    }
    
    return NextResponse.json({ error: 'Skill or text required' }, { status: 400 });
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
