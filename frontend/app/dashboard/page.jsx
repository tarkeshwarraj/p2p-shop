'use client'
import { useState } from "react";
import DashboardHeader from "@/components/dashboardComponents/DashboardHeader";
import All from "./All";
import SellProduct from './SellProduct';
import BuyProduct from './BuyProduct';
import OrderHistory from './OrderHistory';

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState('all');

  const renderTabComponent =() => {
    switch (activeTab) {
      case 'sell':
        return <SellProduct/>
      case 'buy':
        return <BuyProduct/>
      case 'order':
        return <OrderHistory/>
      case 'all':
        default:
          return <All/>;
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 p-6">
      <DashboardHeader activeTab={activeTab} setActiveTab={setActiveTab} />
      {renderTabComponent()}
      {/* Add more sections here */}
    </main>
  );
}
