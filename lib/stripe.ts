import Stripe from 'stripe'

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16',
})

export const getOrCreateCustomer = async (email: string, userId: string) => {
  const existing = await stripe.customers.list({ email })
  
  if (existing.data.length > 0) {
    return existing.data[0]
  }
  
  return stripe.customers.create({
    email,
    metadata: { userId },
  })
}

// Price IDs - configure in Stripe Dashboard
export const STRIPE_PRICES = {
  PRO: process.env.STRIPE_PRICE_PRO!,      // $12/month
  TEAM: process.env.STRIPE_PRICE_TEAM!,    // $39/month
}

// Subscription limits
export const SUBSCRIPTION_LIMITS = {
  free: {
    assessmentsPerMonth: 3,
    hasAIChat: false,
    hasTeamFeatures: false,
    hasAPI: false,
  },
  pro: {
    assessmentsPerMonth: -1, // unlimited
    hasAIChat: true,
    hasTeamFeatures: false,
    hasAPI: false,
  },
  team: {
    assessmentsPerMonth: -1,
    hasAIChat: true,
    hasTeamFeatures: true,
    hasAPI: true,
  },
}
