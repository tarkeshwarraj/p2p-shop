'use client'

import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';

export default function SuccessPage() {
  const [loaded, setLoaded] = useState(false);
  const searchParams = useSearchParams();
  const NP_id = searchParams.get('NP_id'); // Get query param from URL

  const router = useRouter();

  useEffect(() => {
    setLoaded(true);
  }, []);

  return (
    <div style={{ textAlign: 'center', padding: '2rem' }}>
      <h1 style={{ color: 'green' }}>✅ Payment Successful!</h1>
      <p>Thank you for your purchase. Your transaction was successful. <strong>{NP_id}</strong></p>

      {loaded && (
        <button
          onClick={() => router.push('/dashboard')}
          style={{
            marginTop: '20px',
            padding: '10px 20px',
            background: '#0070f3',
            color: '#fff',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer'
          }}
        >
          Go to Dashboard
        </button>
      )}
    </div>
  );
}
