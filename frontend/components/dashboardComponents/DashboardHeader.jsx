'use client';
import { Plus } from 'lucide-react';
import {useState} from 'react';
import Link from 'next/link';

export default function DashboardHeader({activeTab, setActiveTab}) {
  const tabs = ["All", "sell", "buy", "order"];

  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 p-6 bg-white shadow-lg rounded-xl border border-gray-200">
      {/* Left Section */}
      <div>
        <p className="text-gray-600 mb-4 text-sm">
          👋 Welcome back! Here's what’s happening with your account today.
        </p>

        <ul className="flex flex-wrap gap-3">
            {tabs.map((tab)=>(
              <li key={tab}>
                <button onClick={() => setActiveTab(tab)} className={`px-5 py-2 rounded-full text-sm font-semibold transition-all shadow-sm ${
                  activeTab === tab
                  ? "bg-blue-100 text-blue-700 hover:bg-blue-200"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                } `}>
                  {tab}
                </button>
              </li>
            ))}
        </ul>
      </div>

      {/* Right CTA Button */}
      <div>
        <Link href="/add-product">
          <button className="flex items-center gap-2 bg-blue-600 text-white px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-blue-700 transition-all shadow-md">
            <Plus className="w-4 h-4" />
            Sell Product
          </button>
        </Link>
      </div>
    </div>
  );
}
