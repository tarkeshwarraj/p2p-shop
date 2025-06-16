'use client'
import { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';
import DashboardHeader from "@/components/dashboardComponents/DashboardHeader";
import All from "./All";
import SellProduct from './SellProduct';
import BuyProduct from './BuyProduct';

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState('all');
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/auth/check', {
          credentials: 'include', // 👈 cookie send करने के लिए जरूरी है
        });

        if (res.status !== 200) {
          router.push('/login'); // 👈 Redirect to login
        } else {
          setLoading(false);
        }
      } catch (error) {
        router.push('/login');
      }
    };

    checkAuth();
  }, [router]);

  if (loading) return <p>Loading...</p>;

  const renderTabComponent = () => {
    switch (activeTab) {
      case 'sell':
        return <SellProduct />;
      case 'buy':
        return <BuyProduct />;
      case 'all':
      default:
        return <All />;
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 p-6">
      <DashboardHeader activeTab={activeTab} setActiveTab={setActiveTab} />
      {renderTabComponent()}
    </main>
  );
}
