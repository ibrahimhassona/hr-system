'use client';

import { useTranslations, useLocale } from 'next-intl';
import { useRouter } from 'next/navigation';
import { Bell, Search, Globe, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';

const Header = () => {
  const t = useTranslations();
  const locale = useLocale();
  const router = useRouter();
  const isRTL = locale === 'ar';

  const handleLanguageChange = (newLocale: string) => {
    const currentPath = window.location.pathname.replace(`/${locale}`, '');
    router.push(`/${newLocale}${currentPath}`);
  };

  return (
    <header className="bg-white border-b border-neutral-200 px-6 py-4 flex items-center justify-between card-shadow">
      {/* Search */}
      <div className="flex-1 max-w-md">
        <div className="relative">
          <Search className={`absolute ${isRTL ? 'right-3' : 'left-3'} top-1/2 transform -translate-y-1/2 w-4 h-4 text-neutral-400`} />
          <Input
            placeholder={t('common.search')}
            className={`${isRTL ? 'pr-10' : 'pl-10'} border-neutral-200 focus:border-primary-300 focus:ring-primary-200`}
          />
        </div>
      </div>

      {/* Actions */}
      <div className={`flex items-center space-x-4 ${isRTL ? 'space-x-reverse' : ''}`}>
        {/* Language Switcher */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="text-neutral-600 hover:text-primary-600">
              <Globe className="w-4 h-4 mr-2" />
              {locale.toUpperCase()}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align={isRTL ? 'start' : 'end'}>
            <DropdownMenuItem
              onClick={() => handleLanguageChange('ar')}
              className={locale === 'ar' ? 'bg-primary-50 text-primary-600' : ''}
            >
              العربية
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => handleLanguageChange('en')}
              className={locale === 'en' ? 'bg-primary-50 text-primary-600' : ''}
            >
              English
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Notifications */}
        <Button variant="ghost" size="sm" className="text-neutral-600 hover:text-primary-600 relative">
          <Bell className="w-4 h-4" />
          <span className="absolute -top-1 -right-1 w-2 h-2 bg-error-500 rounded-full"></span>
        </Button>

        {/* User Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="text-neutral-600 hover:text-primary-600">
              <User className="w-4 h-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align={isRTL ? 'start' : 'end'}>
            <DropdownMenuItem>
              {isRTL ? 'الملف الشخصي' : 'Profile'}
            </DropdownMenuItem>
            <DropdownMenuItem>
              {isRTL ? 'تسجيل الخروج' : 'Logout'}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default Header;