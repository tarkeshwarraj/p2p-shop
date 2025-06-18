

'use client'
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAppContext } from "@/context/AppContext";

const Dashboard = () => {
  const { user } = useAppContext();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push("/login"); // redirect to login
    }
  }, [user]);

  if (!user) return null; // or a loading spinner

  return (
    <DashboardClientPage user={user} />
  );
};

export default Dashboard;
