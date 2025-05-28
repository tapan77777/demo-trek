import { connectDB } from '@/lib/db';
import Booking from '@/models/booking';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const data = await req.json();
  await connectDB();
  const newBooking = new Booking(data);
  await newBooking.save();
  return NextResponse.json({ success: true });
}
