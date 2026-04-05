import { ReactNode } from 'react';
import { DashboardLayout } from '@/components/dashboard/layout/dashboard-layout';
import { getServerUser } from '@/utils/auth/session';
import { redirect } from 'next/navigation';

interface Props {
  children: ReactNode;
}

export default async function Layout({ children }: Props) {
  const user = await getServerUser();
  if (!user) {
    redirect('/login');
  }
  return <DashboardLayout>{children}</DashboardLayout>;
}
