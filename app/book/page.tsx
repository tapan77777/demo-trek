'use client'
import { useState } from 'react'

export default function BookPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [trek, setTrek] = useState('');

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const res = await fetch('/api/create-order', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, trek }),
    });
    const data = await res.json();
    if (data.id) {
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: data.amount,
        currency: data.currency,
        name: 'TrekBook',
        description: 'Trek Booking',
        order_id: data.id,
        handler: async (response: any) => {
          await fetch('/api/save-booking', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, trek, payment_id: response.razorpay_payment_id }),
          });
          window.location.href = '/success';
        },
      };
      // @ts-ignore
      const rzp = new Razorpay(options);
      rzp.open();
    }
  };

  return (
    <main className="p-4">
      <h1 className="text-xl font-bold mb-4">Book Your Trek</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-2 max-w-md">
        <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Name" required className="p-2 border" />
        <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" required className="p-2 border" />
        <input type="text" value={trek} onChange={e => setTrek(e.target.value)} placeholder="Trek Name" required className="p-2 border" />
        <button type="submit" className="bg-blue-500 text-white p-2 mt-2">Book Now</button>
      </form>
    </main>
  );
}
