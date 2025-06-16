// app/dashboard/page.jsx
import { cookies } from 'next/headers';
import DashboardClientPage from './DashboardClientPage';
import { redirect } from 'next/navigation';

export default async function DashboardPage() {
  const cookieStore = cookies();
  const token = cookieStore.get('token')?.value;

  // 🔐 Backend को token भेजकर verify करो
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/is-auth`, {
    headers: {
      Cookie: `token=${token}`,
    },
    cache: 'no-store', // SSR
  });
  

  const data = await res.json();

  if (!res.ok || !data.success) {
    // Redirect on server
    return redirect('/login');
  }

  const user = data.user;

  return <DashboardClientPage user={user} />;
}
