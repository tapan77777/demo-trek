'use client';

import { useEffect } from 'react';

export default function BookTrekPage() {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    document.body.appendChild(script);
  }, []);

  const handlePayment = async () => {
    const res = await fetch('/api/razorpay', {
      method: 'POST',
      body: JSON.stringify({
        amount: 8999, //in rs
        trekName: 'Hampta Pass',
        userName: 'Demo User',
        userEmail: 'demo@email.com',
      }),
    });

    const order = await res.json();

    const options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID!,
      amount: order.amount,
      currency: order.currency,
      name: 'TrekBook',
      description: 'Hampta Pass Trek Booking',
      order_id: order.id,
      handler: async function (response: any) {
        // Save booking to DB
        await fetch('/api/booking', {
          method: 'POST',
          body: JSON.stringify({
            ...response,
            orderId: order.id,
            amount: order.amount,
            trekName: 'Hampta Pass',
            userName: 'Demo User',
            userEmail: 'demo@email.com',
          }),
        });
        // ✅ Redirect to success page
  window.location.href = '/success';
        // alert('Payment Successful & Booking Saved!');
      },
      prefill: {
        name: 'Demo User',
        email: 'demo@email.com',
      },
      theme: {
        color: '#F37254',
      },
    };

    const rzp = new (window as any).Razorpay(options);
    rzp.open();
  };

  return (
    <div>
      <h1>Hampta Pass Trek</h1>
      <p>Price: ₹8999</p>
      <button onClick={handlePayment} className="bg-blue-600 px-4 py-2 rounded text-white">
        Book Now
      </button>
    </div>
  );
}
