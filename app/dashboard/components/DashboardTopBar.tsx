'use client';

import Link from 'next/link';
import UserDropdown from '@/components/UserDropdown';

export default function DashboardTopBar() {

  return (
    <div className="bg-white dark:bg-neutral-dark border-b border-slate-200 dark:border-slate-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/dashboard">
            <h1 className="text-xl font-semibold text-slate-900 dark:text-white cursor-pointer hover:text-slate-700 dark:hover:text-slate-200 transition-colors">
              Dashboard
            </h1>
          </Link>
          
          <UserDropdown />
        </div>
      </div>
    </div>
  );
}