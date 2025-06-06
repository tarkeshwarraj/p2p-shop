'use client';

import Link from 'next/link';
import { XCircleIcon } from '@heroicons/react/24/outline';

const PaymentFailedPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-red-50 px-4 text-center">
      <XCircleIcon className="h-20 w-20 text-red-500 mb-4" />
      <h1 className="text-3xl font-bold text-red-600 mb-2">Payment Failed</h1>
      <p className="text-gray-700 mb-6">
        Unfortunately, your payment was not successful. Please try again or choose a different payment method.
      </p>

      <div className="flex flex-col gap-3 w-full max-w-sm">
        <Link href="/order-confirmation">
          <span className="inline-block bg-indigo-600 text-white px-5 py-3 rounded hover:bg-indigo-700 transition">
            Try Again
          </span>
        </Link>
        <Link href="/">
          <span className="inline-block text-indigo-600 underline hover:text-indigo-800">
            Back to Home
          </span>
        </Link>
      </div>
    </div>
  );
};

export default PaymentFailedPage;
