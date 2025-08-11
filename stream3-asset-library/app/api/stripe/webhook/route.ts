import Stripe from 'stripe'
import { supabase } from '../../../../lib/db'
import { Resend } from 'resend'
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: '2024-06-20' })
export async function POST(req: Request){
  const sig = req.headers.get('stripe-signature')!
  const body = await req.text()
  let event
  try{
    event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET!)
  }catch(e:any){
    return new Response(`Webhook Error: ${e.message}`, { status: 400 })
  }
  if(event.type==='checkout.session.completed'){
    const s = event.data.object as Stripe.Checkout.Session
    const email = s.customer_details?.email || ''
    const customer = (s.customer as string) || ''
    await supabase.from('members').upsert(
      { email, stripe_customer_id: customer, status: 'active', plan: s.mode||'subscription' },
      { onConflict: 'email' }
    )
    try{
      if(process.env.RESEND_API_KEY){
        const resend = new Resend(process.env.RESEND_API_KEY)
        await resend.emails.send({
          from: process.env.RESEND_FROM!,
          to: email,
          subject: 'Welcome to Growth Vault',
          text: 'Your membership is active. Log in and access your assets now.'
        })
      }
    }catch{/* non-blocking */}
  }
  return new Response('ok')
}
