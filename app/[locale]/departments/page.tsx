import { useTranslations } from 'next-intl';
import { Building2, Users, TrendingUp, Plus } from 'lucide-react';
import { StatCard } from '@/components/ui/stat-card';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function DepartmentsPage() {
  const t = useTranslations();

  const departmentStats = [
    {
      title: 'Total Departments',
      value: '12',
      icon: <Building2 className="w-6 h-6" />,
      color: 'primary' as const,
    },
    {
      title: 'Average Team Size',
      value: '21',
      icon: <Users className="w-6 h-6" />,
      trend: { value: '+5%', isPositive: true },
      color: 'secondary' as const,
    },
    {
      title: 'Active Projects',
      value: '34',
      icon: <TrendingUp className="w-6 h-6" />,
      color: 'success' as const,
    },
  ];

  const departments = [
    {
      id: 1,
      name: 'Information Technology',
      manager: 'Ahmed Hassan',
      employees: 45,
      budget: '$120,000',
      status: 'Active',
    },
    {
      id: 2,
      name: 'Human Resources',
      manager: 'Sarah Johnson',
      employees: 8,
      budget: '$80,000',
      status: 'Active',
    },
    {
      id: 3,
      name: 'Marketing',
      manager: 'Mohammed Ali',
      employees: 12,
      budget: '$95,000',
      status: 'Active',
    },
    {
      id: 4,
      name: 'Finance',
      manager: 'Lisa Chen',
      employees: 15,
      budget: '$110,000',
      status: 'Active',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-neutral-900 mb-2">
            {t('nav.departments')}
          </h1>
          <p className="text-neutral-600">
            Manage organizational departments and teams
          </p>
        </div>
        <Button className="bg-primary-600 hover:bg-primary-700 text-white">
          <Plus className="w-4 h-4 mr-2" />
          Add Department
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {departmentStats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>

      {/* Departments Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {departments.map((dept) => (
          <Card key={dept.id} className="border-neutral-200 card-shadow hover:card-shadow-lg transition-all-smooth">
            <CardHeader className="pb-4">
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-primary-50 rounded-lg">
                    <Building2 className="w-5 h-5 text-primary-600" />
                  </div>
                  <div>
                    <CardTitle className="text-lg text-neutral-900">{dept.name}</CardTitle>
                    <p className="text-sm text-neutral-500">Manager: {dept.manager}</p>
                  </div>
                </div>
                <span className="px-2 py-1 bg-success-100 text-success-700 rounded-full text-xs font-medium">
                  {dept.status}
                </span>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-neutral-600">Employees</span>
                  <span className="font-semibold text-neutral-900">{dept.employees}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-neutral-600">Budget</span>
                  <span className="font-semibold text-neutral-900">{dept.budget}</span>
                </div>
                <div className="pt-3 border-t border-neutral-200">
                  <div className="flex space-x-2">
                    <Button size="sm" variant="outline" className="flex-1 border-neutral-200">
                      View Details
                    </Button>
                    <Button size="sm" className="bg-primary-600 hover:bg-primary-700 text-white">
                      Manage
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}