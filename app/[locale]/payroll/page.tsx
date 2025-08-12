import { useTranslations } from 'next-intl';
import { CreditCard, DollarSign, TrendingUp, Calendar } from 'lucide-react';
import { StatCard } from '@/components/ui/stat-card';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function PayrollPage() {
  const t = useTranslations();

  const payrollStats = [
    {
      title: 'Monthly Payroll',
      value: '$124,500',
      icon: <DollarSign className="w-6 h-6" />,
      trend: { value: '+3.2%', isPositive: true },
      color: 'primary' as const,
    },
    {
      title: 'Processed This Month',
      value: '248',
      icon: <CreditCard className="w-6 h-6" />,
      color: 'success' as const,
    },
    {
      title: 'Pending Approvals',
      value: '12',
      icon: <Calendar className="w-6 h-6" />,
      color: 'warning' as const,
    },
    {
      title: 'Average Salary',
      value: '$3,450',
      icon: <TrendingUp className="w-6 h-6" />,
      trend: { value: '+5.1%', isPositive: true },
      color: 'secondary' as const,
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-neutral-900 mb-2">
            {t('nav.payroll')}
          </h1>
          <p className="text-neutral-600">
            Manage employee compensation and payroll processing
          </p>
        </div>
        <Button className="bg-primary-600 hover:bg-primary-700 text-white">
          Process Payroll
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {payrollStats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>

      {/* Payroll Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border-neutral-200 card-shadow">
          <CardHeader>
            <CardTitle className="flex items-center text-neutral-900">
              <Calendar className="w-5 h-5 mr-2 text-primary-600" />
              Upcoming Payroll
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-primary-50 rounded-lg">
                <div>
                  <p className="font-medium text-primary-900">January 2025 Payroll</p>
                  <p className="text-sm text-primary-600">Due in 5 days</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-primary-900">$124,500</p>
                  <p className="text-sm text-primary-600">248 employees</p>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-neutral-600">Base Salaries</span>
                  <span className="font-medium text-neutral-900">$98,400</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-neutral-600">Overtime</span>
                  <span className="font-medium text-neutral-900">$12,300</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-neutral-600">Bonuses</span>
                  <span className="font-medium text-neutral-900">$8,500</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-neutral-600">Benefits</span>
                  <span className="font-medium text-neutral-900">$5,300</span>
                </div>
                <hr className="border-neutral-200" />
                <div className="flex justify-between font-semibold">
                  <span className="text-neutral-900">Total</span>
                  <span className="text-primary-600">$124,500</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-neutral-200 card-shadow">
          <CardHeader>
            <CardTitle className="flex items-center text-neutral-900">
              <TrendingUp className="w-5 h-5 mr-2 text-primary-600" />
              Payroll Trends
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="h-40 bg-neutral-50 rounded-lg flex items-center justify-center">
                <p className="text-neutral-500">Payroll trend chart would go here</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-3 bg-success-50 rounded-lg">
                  <p className="text-2xl font-bold text-success-600">+3.2%</p>
                  <p className="text-sm text-success-700">vs Last Month</p>
                </div>
                <div className="text-center p-3 bg-primary-50 rounded-lg">
                  <p className="text-2xl font-bold text-primary-600">$3,450</p>
                  <p className="text-sm text-primary-700">Avg Salary</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}