"use client";
import { useState } from 'react';
import { useSession } from 'next-auth/react';

export default function VerifyEmail() {
  const [email, setEmail] = useState('');
  const { data: session } = useSession();

  const resendEmail = async () => {
    const res = await fetch('/api/resend-activation', {
      method: 'POST',
      body: JSON.stringify({ email: session?.user?.email || email }),
    });
    if (res.ok) alert('Activation email resent!');
  };

  return (
    <div>
      <h1>Verify Your Email</h1>
      {!session && (
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Your email"
        />
      )}
      <button onClick={resendEmail}>Resend Activation Email</button>
    </div>
  );
}