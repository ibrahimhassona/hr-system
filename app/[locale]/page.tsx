import { useTranslations } from 'next-intl';
import { 
  Users, 
  Building2, 
  Clock, 
  FileText,
  Plus,
  TrendingUp,
  Calendar,
  UserPlus
} from 'lucide-react';
import { StatCard } from '@/components/ui/stat-card';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function DashboardPage() {
  const t = useTranslations();

  const stats = [
    {
      title: t('dashboard.totalEmployees'),
      value: '248',
      icon: <Users className="w-6 h-6" />,
      trend: { value: '+12%', isPositive: true },
      color: 'primary' as const,
    },
    {
      title: t('dashboard.activeDepartments'),
      value: '12',
      icon: <Building2 className="w-6 h-6" />,
      color: 'secondary' as const,
    },
    {
      title: t('dashboard.presentToday'),
      value: '234',
      icon: <Clock className="w-6 h-6" />,
      trend: { value: '94%', isPositive: true },
      color: 'success' as const,
    },
    {
      title: t('dashboard.pendingRequests'),
      value: '8',
      icon: <FileText className="w-6 h-6" />,
      color: 'warning' as const,
    },
  ];

  const recentActivities = [
    { id: 1, text: 'New employee Ahmed Hassan joined IT Department', time: '2 hours ago' },
    { id: 2, text: 'Sarah completed training program for Project Management', time: '4 hours ago' },
    { id: 3, text: 'Monthly payroll processed successfully', time: '1 day ago' },
    { id: 4, text: 'Department meeting scheduled for Marketing team', time: '2 days ago' },
  ];

  const quickActions = [
    { icon: <UserPlus className="w-5 h-5" />, label: t('dashboard.addEmployee') },
    { icon: <FileText className="w-5 h-5" />, label: t('dashboard.generateReport') },
    { icon: <Calendar className="w-5 h-5" />, label: t('dashboard.viewAttendance') },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-neutral-900 mb-2">
          {t('dashboard.title')}
        </h1>
        <p className="text-neutral-600">
          {t('dashboard.welcome')}
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activities */}
        <div className="lg:col-span-2">
          <Card className="border-neutral-200 card-shadow">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center text-neutral-900">
                <TrendingUp className="w-5 h-5 mr-2 text-primary-600" />
                {t('dashboard.recentActivities')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivities.map((activity) => (
                  <div key={activity.id} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-neutral-50 transition-all-smooth">
                    <div className="w-2 h-2 bg-primary-500 rounded-full mt-2 flex-shrink-0"></div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-neutral-900 font-medium">
                        {activity.text}
                      </p>
                      <p className="text-xs text-neutral-500 mt-1">
                        {activity.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div>
          <Card className="border-neutral-200 card-shadow">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center text-neutral-900">
                <Plus className="w-5 h-5 mr-2 text-primary-600" />
                {t('dashboard.quickActions')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {quickActions.map((action, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    className="w-full justify-start text-left h-auto p-4 border-neutral-200 hover:bg-primary-50 hover:border-primary-200 hover:text-primary-700"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="text-primary-600">
                        {action.icon}
                      </div>
                      <span className="font-medium">{action.label}</span>
                    </div>
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}