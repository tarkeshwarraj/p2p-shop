// app/dashboard/page.jsx
import { cookies } from 'next/headers';
import DashboardClientPage from './DashboardClientPage';
import { redirect } from 'next/navigation';
import axios from '@/lib/axios';

export default async function DashboardPage() {
  const cookieStore = await cookies(); // ✅ await जरूरी है (Next.js 14+)
  const token = cookieStore.get('token')?.value;

  if (!token) {
    console.log("No token")
    return redirect('https://p2p-shop-1.onrender.com/login');
  }

  try {
    // 🔐 Axios से token भेजकर verify करो
    const res = await axios.get('https://p2p-shop.onrender.com/auth/is-auth', {
      headers: {
        Cookie: `token=${token}`, // ✅ manually pass cookie
      },
      withCredentials: true,
    });

    const data = res.data;
    console.log(res);

    if (!res.status === 200 || !data.success) {
      return redirect('https://p2p-shop-1.onrender.com/login');
    }

    const user = data.user;
    return <DashboardClientPage user={user} />;
  } catch (err) {
    console.error("SSR Auth Error:", err.response?.data || err.message);
    return redirect('https://p2p-shop-1.onrender.com/login');
  }
}
