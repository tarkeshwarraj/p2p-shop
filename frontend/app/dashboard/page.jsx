'use client'
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAppContext } from "@/context/AppContext";
import DashboardClientPage from "./DashboardClientPage";

const Dashboard = () => {
  const { user } = useAppContext();
  const router = useRouter();
  console.log(user);

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
