import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { extractSkillsFromText, getRecommendations } from '@/lib/skills'

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { inputType, inputData } = await req.json()

    // Check subscription limits
    const subscription = await prisma.subscription.findUnique({
      where: { userId: session.user.id },
    })

    const isPro = subscription?.status === 'active'
    
    if (!isPro) {
      const assessmentCount = await prisma.assessment.count({
        where: {
          userId: session.user.id,
          createdAt: {
            gte: new Date(new Date().setDate(1)), // Current month
          },
        },
      })

      if (assessmentCount >= 3) {
        return NextResponse.json(
          { error: 'Free tier limit reached', upgrade: true },
          { status: 403 }
        )
      }
    }

    // Extract skills
    let detectedSkills: any[] = []
    
    if (inputType === 'manual' && inputData.skillId) {
      detectedSkills = [{
        id: inputData.skillId,
        name: inputData.skillName,
        confidence: 1,
      }]
    } else if (inputType === 'text' && inputData.text) {
      detectedSkills = extractSkillsFromText(inputData.text)
    }

    // Get recommendations
    const recommendations = detectedSkills.length > 0 
      ? getRecommendations(detectedSkills[0].id)
      : []

    // Save assessment
    const assessment = await prisma.assessment.create({
      data: {
        userId: session.user.id,
        inputType,
        inputData: inputType === 'text' ? inputData.text : null,
        detectedSkills: detectedSkills as any,
        recommendations: recommendations as any,
      },
    })

    return NextResponse.json({
      assessmentId: assessment.id,
      detectedSkills,
      recommendations,
      isPro,
    })
  } catch (error) {
    console.error('Assessment error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const assessments = await prisma.assessment.findMany({
      where: { userId: session.user.id },
      orderBy: { createdAt: 'desc' },
      take: 10,
    })

    return NextResponse.json({ assessments })
  } catch (error) {
    console.error('Get assessments error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
