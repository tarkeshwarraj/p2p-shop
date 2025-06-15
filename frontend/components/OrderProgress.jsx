'use client';
import { useMemo } from 'react';

export default function OrderProgress({ status }) {
  const steps = [
    'Order Placed',
    'Payment Completed',
    'Product Delivered',
    'Product Testing',
    'Payment Released'
  ];

  const activeStep = useMemo(() => {
    return steps.findIndex(step => step === status);
  }, [status]);

  return (
    <div className="w-full px-4 py-8">
      <div className="relative flex justify-between items-center max-w-5xl mx-auto">
        {/* Horizontal line */}
        <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-200 z-0 transform -translate-y-1/2" />

        {/* Dots and Labels */}
        {steps.map((label, index) => {
          const isCompleted = index < activeStep;
          const isActive = index === activeStep;

          return (
            <div
              key={index}
              className="z-10 flex flex-col items-center text-center w-1/5"
            >
              {/* Dot */}
              <div
                className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
                  isCompleted
                    ? 'bg-blue-600 border-blue-600'
                    : isActive
                    ? 'bg-white border-blue-600'
                    : 'bg-white border-gray-300'
                }`}
              >
                <div
                  className={`w-3 h-3 rounded-full ${
                    isCompleted || isActive ? 'bg-blue-600' : 'bg-gray-300'
                  }`}
                />
              </div>

              {/* Label */}
              <span
                className={`mt-2 text-xs sm:text-sm ${
                  isActive
                    ? 'text-blue-700 font-semibold'
                    : isCompleted
                    ? 'text-gray-600'
                    : 'text-gray-400'
                }`}
              >
                {label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
