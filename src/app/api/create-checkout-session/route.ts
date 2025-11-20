import { NextResponse } from 'next/server'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-06-20',
})

export async function POST() {
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: [
      {
        price: process.env.STRIPE_PRICE_ID, // ← your $999 price ID
        quantity: 1,
      },
    ],
    mode: 'subscription',
    success_url: 'https://sri-luxury-elite.vercel.app/success',
    cancel_url: 'https://sri-luxury-elite.vercel.app',
  })

  return NextResponse.json({ url: session.url })
}
