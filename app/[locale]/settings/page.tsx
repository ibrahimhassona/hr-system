'use client';

import { useTranslations, useLocale } from 'next-intl';
import { useState } from 'react';
import { Settings, Save, Globe, Bell, Shield, Database } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export default function SettingsPage() {
  const t = useTranslations();
  const locale = useLocale();
  const isRTL = locale === 'ar';
  
  const [settings, setSettings] = useState({
    companyName: 'MHG Corporation',
    email: 'admin@mhg.com',
    timezone: 'UTC+3',
    language: locale,
    notifications: {
      email: true,
      push: false,
      sms: true,
    },
    security: {
      twoFactor: false,
      sessionTimeout: '24',
    },
  });

  const handleSave = () => {
    console.log('Saving settings:', settings);
    // Implementation would go here
  };

  const settingSections = [
    {
      title: 'General Settings',
      icon: <Settings className="w-5 h-5" />,
      id: 'general',
    },
    {
      title: 'Language & Region',
      icon: <Globe className="w-5 h-5" />,
      id: 'language',
    },
    {
      title: 'Notifications',
      icon: <Bell className="w-5 h-5" />,
      id: 'notifications',
    },
    {
      title: 'Security',
      icon: <Shield className="w-5 h-5" />,
      id: 'security',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-neutral-900 mb-2">
            {t('nav.settings')}
          </h1>
          <p className="text-neutral-600">
            Configure system preferences and manage your account
          </p>
        </div>
        <Button onClick={handleSave} className="bg-primary-600 hover:bg-primary-700 text-white">
          <Save className={`w-4 h-4 ${isRTL ? 'ml-2' : 'mr-2'}`} />
          {t('common.save')}
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Settings Navigation */}
        <div className="lg:col-span-1">
          <Card className="border-neutral-200 card-shadow">
            <CardHeader>
              <CardTitle className="text-neutral-900">Settings</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <nav className="space-y-1">
                {settingSections.map((section) => (
                  <button
                    key={section.id}
                    className="w-full flex items-center px-4 py-3 text-left hover:bg-neutral-50 transition-all-smooth"
                  >
                    <div className="text-primary-600 mr-3">{section.icon}</div>
                    <span className="font-medium text-neutral-900">{section.title}</span>
                  </button>
                ))}
              </nav>
            </CardContent>
          </Card>
        </div>

        {/* Settings Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* General Settings */}
          <Card className="border-neutral-200 card-shadow">
            <CardHeader>
              <CardTitle className="flex items-center text-neutral-900">
                <Settings className="w-5 h-5 mr-2 text-primary-600" />
                General Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="companyName" className="text-neutral-700 font-medium">
                    Company Name
                  </Label>
                  <Input
                    id="companyName"
                    value={settings.companyName}
                    onChange={(e) => setSettings({...settings, companyName: e.target.value})}
                    className="mt-1 border-neutral-200 focus:border-primary-300 focus:ring-primary-200"
                  />
                </div>
                <div>
                  <Label htmlFor="email" className="text-neutral-700 font-medium">
                    Admin Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={settings.email}
                    onChange={(e) => setSettings({...settings, email: e.target.value})}
                    className="mt-1 border-neutral-200 focus:border-primary-300 focus:ring-primary-200"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="timezone" className="text-neutral-700 font-medium">
                  Timezone
                </Label>
                <Select value={settings.timezone} onValueChange={(value) => setSettings({...settings, timezone: value})}>
                  <SelectTrigger className="mt-1 border-neutral-200 focus:border-primary-300">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="UTC+3">UTC+3 (Riyadh)</SelectItem>
                    <SelectItem value="UTC+0">UTC+0 (London)</SelectItem>
                    <SelectItem value="UTC-5">UTC-5 (New York)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Language Settings */}
          <Card className="border-neutral-200 card-shadow">
            <CardHeader>
              <CardTitle className="flex items-center text-neutral-900">
                <Globe className="w-5 h-5 mr-2 text-primary-600" />
                Language & Region
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="language" className="text-neutral-700 font-medium">
                  Default Language
                </Label>
                <Select value={settings.language} onValueChange={(value) => setSettings({...settings, language: value})}>
                  <SelectTrigger className="mt-1 border-neutral-200 focus:border-primary-300">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ar">العربية (Arabic)</SelectItem>
                    <SelectItem value="en">English</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Notifications */}
          <Card className="border-neutral-200 card-shadow">
            <CardHeader>
              <CardTitle className="flex items-center text-neutral-900">
                <Bell className="w-5 h-5 mr-2 text-primary-600" />
                Notification Preferences
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-neutral-900">Email Notifications</p>
                    <p className="text-sm text-neutral-600">Receive updates via email</p>
                  </div>
                  <Switch
                    checked={settings.notifications.email}
                    onCheckedChange={(checked) => 
                      setSettings({
                        ...settings, 
                        notifications: {...settings.notifications, email: checked}
                      })
                    }
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-neutral-900">Push Notifications</p>
                    <p className="text-sm text-neutral-600">Browser push notifications</p>
                  </div>
                  <Switch
                  dir={isRTL ? 'rtl' : 'ltr'}
                    checked={settings.notifications.push}
                    onCheckedChange={(checked) => 
                      setSettings({
                        ...settings, 
                        notifications: {...settings.notifications, push: checked}
                      })
                    }
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-neutral-900">SMS Notifications</p>
                    <p className="text-sm text-neutral-600">Critical updates via SMS</p>
                  </div>
                  <Switch
                  dir={isRTL ? 'rtl' : 'ltr'}
                    checked={settings.notifications.sms}
                    onCheckedChange={(checked) => 
                      setSettings({
                        ...settings, 
                        notifications: {...settings.notifications, sms: checked}
                      })
                    }
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Security */}
          <Card className="border-neutral-200 card-shadow">
            <CardHeader>
              <CardTitle className="flex items-center text-neutral-900">
                <Shield className="w-5 h-5 mr-2 text-primary-600" />
                Security Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-neutral-900">Two-Factor Authentication</p>
                  <p className="text-sm text-neutral-600">Add an extra layer of security</p>
                </div>
                <Switch
                  checked={settings.security.twoFactor}
                  onCheckedChange={(checked) => 
                    setSettings({
                      ...settings, 
                      security: {...settings.security, twoFactor: checked}
                    })
                  }
                />
              </div>
              <div>
                <Label htmlFor="sessionTimeout" className="text-neutral-700 font-medium">
                  Session Timeout (hours)
                </Label>
                <Select 
                  value={settings.security.sessionTimeout} 
                  onValueChange={(value) => 
                    setSettings({
                      ...settings, 
                      security: {...settings.security, sessionTimeout: value}
                    })
                  }
                >
                  <SelectTrigger className="mt-1 border-neutral-200 focus:border-primary-300">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1 hour</SelectItem>
                    <SelectItem value="8">8 hours</SelectItem>
                    <SelectItem value="24">24 hours</SelectItem>
                    <SelectItem value="168">1 week</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}