import Stripe from 'stripe'
export async function POST(req: Request){
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: '2024-06-20' })
  const form = await req.formData()
  const tier = (form.get('tier') as string) || 'monthly'
  const price = tier === 'annual' ? process.env.STRIPE_PRICE_ANNUAL! : process.env.STRIPE_PRICE_MONTHLY!
  const origin = process.env.AUTH0_BASE_URL || (new URL(req.url)).origin
  const session = await stripe.checkout.sessions.create({
    mode: 'subscription',
    line_items: [{ price, quantity: 1 }],
    success_url: `${origin}/dashboard`,
    cancel_url: `${origin}/`,
    allow_promotion_codes: true
  })
  return new Response(null, { status: 302, headers: { Location: session.url! } })
}
