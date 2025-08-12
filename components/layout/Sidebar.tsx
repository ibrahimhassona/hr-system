'use client';

import { useTranslations, useLocale } from 'next-intl';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { 
  LayoutDashboard, 
  Users, 
  Building2, 
  Clock, 
  CreditCard, 
  FileText, 
  Settings,
  ChevronRight
} from 'lucide-react';

const Sidebar = () => {
  const t = useTranslations();
  const locale = useLocale();
  const pathname = usePathname();
  const isRTL = locale === 'ar';

  const menuItems = [
    {
      key: 'dashboard',
      label: t('nav.dashboard'),
      icon: LayoutDashboard,
      href: `/${locale}`,
    },
    {
      key: 'employees',
      label: t('nav.employees'),
      icon: Users,
      href: `/${locale}/employees`,
    },
    {
      key: 'departments',
      label: t('nav.departments'),
      icon: Building2,
      href: `/${locale}/departments`,
    },
    {
      key: 'attendance',
      label: t('nav.attendance'),
      icon: Clock,
      href: `/${locale}/attendance`,
    },
    {
      key: 'payroll',
      label: t('nav.payroll'),
      icon: CreditCard,
      href: `/${locale}/payroll`,
    },
    {
      key: 'reports',
      label: t('nav.reports'),
      icon: FileText,
      href: `/${locale}/reports`,
    },
    {
      key: 'settings',
      label: t('nav.settings'),
      icon: Settings,
      href: `/${locale}/settings`,
    },
  ];

  return (
    <div className="w-64 bg-white card-shadow-lg h-full flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-neutral-200">
        <h1 className="text-2xl font-bold text-primary-600">MHG HRM</h1>
        <p className="text-sm text-neutral-500 mt-1">
          {isRTL ? 'نظام إدارة الموارد البشرية' : 'Human Resources'}
        </p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href || 
            (item.href !== `/${locale}` && pathname.startsWith(item.href));
          
          return (
            <Link
              key={item.key}
              href={item.href}
              className={`
                flex items-center px-4 py-3 rounded-lg transition-all-smooth
                ${isActive 
                  ? 'bg-primary-50 text-primary-600 border-r-2 border-primary-600' 
                  : 'text-neutral-600 hover:bg-neutral-50 hover:text-primary-600'
                }
                ${isRTL ? 'flex-row-reverse' : ''}
              `}
            >
              <Icon className={`w-5 h-5 ${isRTL ? 'ml-3' : 'mr-3'}`} />
              <span className="font-medium flex-1">{item.label}</span>
              {isActive && (
                <ChevronRight 
                  className={`w-4 h-4 ${isRTL ? 'rotate-180' : ''}`} 
                />
              )}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-neutral-200">
        <div className="text-xs text-neutral-400 text-center">
          © 2025 MHG HRM
        </div>
      </div>
    </div>
  );
};

export default Sidebar;