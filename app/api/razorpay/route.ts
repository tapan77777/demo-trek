import { NextResponse } from 'next/server';
import Razorpay from 'razorpay';

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET!,
});

export async function POST(req: Request) {
  const body = await req.json();

  const payment_capture = 1;
  const amount = body.amount * 100; // amount in paise
  const currency = 'INR';

  const options = {
    amount,
    currency,
    receipt: `receipt_order_${Date.now()}`,
    payment_capture,
  };

  try {
    const order = await razorpay.orders.create(options);
    return NextResponse.json(order);
  } catch (error) {
    console.error('Razorpay Error:', error);
    return NextResponse.json({ error: 'Order creation failed' }, { status: 500 });
  }
}
