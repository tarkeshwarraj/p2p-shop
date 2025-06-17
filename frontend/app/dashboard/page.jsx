// app/dashboard/page.jsx
import { cookies } from 'next/headers';
import DashboardClientPage from './DashboardClientPage';
import { redirect } from 'next/navigation';
import axios from 'axios';

export default async function DashboardPage() {
  const cookieStore = cookies();
  const token = cookieStore.get('token')?.value;

  if (!token) {
    return redirect('/login');
  }

  try {
    // 🔐 Axios से token भेजकर verify करो
    const res = await axios.get('/api/auth/is-auth', {
      headers: {
        Cookie: `token=${token}`, // ✅ manually pass cookie
      },
    });

    const data = res.data;

    if (!res.status === 200 || !data.success) {
      return redirect('/login');
    }

    const user = data.user;
    return <DashboardClientPage user={user} />;
  } catch (err) {
    console.error("SSR Auth Error:", err.response?.data || err.message);
    return redirect('/login');
  }
}
