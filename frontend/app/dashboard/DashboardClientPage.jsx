'use client'
import { useState } from 'react';
import DashboardHeader from "@/components/dashboardComponents/DashboardHeader";
import All from "./All";
import SellProduct from './SellProduct';
import BuyProduct from './BuyProduct';

export default function DashboardClientPage({ user }) {
  const [activeTab, setActiveTab] = useState('all');

  const renderTabComponent = () => {
    switch (activeTab) {
      case 'sell': return <SellProduct />;
      case 'buy': return <BuyProduct />;
      case 'all':
      default: return <All />;
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 p-6">
      <DashboardHeader user={user} activeTab={activeTab} setActiveTab={setActiveTab} />
      {renderTabComponent()}
    </main>
  );
}
