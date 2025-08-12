'use client';

import { useTranslations, useLocale } from 'next-intl';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { 
  User,
  Calendar,
  FileText,
  Shield,
  Heart,
  Calculator,
  File,
  FilePlus,
  AlertTriangle,
  DollarSign,
  BarChart,
  Clock,
  UserCog,
  ChevronRight
} from 'lucide-react';

const Sidebar = () => {
  const t = useTranslations();
  const locale = useLocale();
  const pathname = usePathname();
  const isRTL = locale === 'ar';

  const menuItems = [
    {
      key: 'employee_file',
      label: t('nav.employee_file'),
      icon: User,
      href: `/${locale}/employee-file`,
    },
    {
      key: 'leaves_vacations',
      label: t('nav.leaves_vacations'),
      icon: Calendar,
      href: `/${locale}/leaves-vacations`,
    },
    {
      key: 'tax_law',
      label: t('nav.tax_law'),
      icon: FileText,
      href: `/${locale}/tax-law`,
    },
    {
      key: 'social_security',
      label: t('nav.social_security'),
      icon: Shield,
      href: `/${locale}/social-security`,
    },
    {
      key: 'health_insurance',
      label: t('nav.health_insurance'),
      icon: Heart,
      href: `/${locale}/health-insurance`,
    },
    {
      key: 'salary_calculations',
      label: t('nav.salary_calculations'),
      icon: Calculator,
      href: `/${locale}/salary-calculations`,
    },
    {
      key: 'standard_transactions',
      label: t('nav.standard_transactions'),
      icon: File,
      href: `/${locale}/standard-transactions`,
    },
    {
      key: 'advanced_transactions',
      label: t('nav.advanced_transactions'),
      icon: FilePlus,
      href: `/${locale}/advanced-transactions`,
    },
    {
      key: 'disciplinary_actions',
      label: t('nav.disciplinary_actions'),
      icon: AlertTriangle,
      href: `/${locale}/disciplinary-actions`,
    },
    {
      key: 'cost_center',
      label: t('nav.cost_center'),
      icon: DollarSign,
      href: `/${locale}/cost-center`,
    },
    {
      key: 'report_generator',
      label: t('nav.report_generator'),
      icon: BarChart,
      href: `/${locale}/report-generator`,
    },
    {
      key: 'time_attendance',
      label: t('nav.time_attendance'),
      icon: Clock,
      href: `/${locale}/attendance`,
    },
    {
      key: 'self_service',
      label: t('nav.self_service'),
      icon: UserCog,
      href: `/${locale}/self-service`,
    },
  ];

  return (
    <div className="w-64 bg-white card-shadow-lg h-full flex flex-col">
      {/* Logo */}
      <div className="py-2 px-4 border-b border-neutral-200">
       <Link href={`/${locale}`}>
        <h1 className="text-2xl font-bold text-primary-600">MHG HRM</h1>
       </Link>
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