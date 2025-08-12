import { useTranslations } from 'next-intl';
import { FileText, Download, Calendar, BarChart3, PieChart, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function ReportsPage() {
  const t = useTranslations();

  const reportTypes = [
    {
      title: 'Employee Report',
      description: 'Comprehensive employee data and statistics',
      icon: <FileText className="w-6 h-6" />,
      color: 'primary',
      lastGenerated: '2 hours ago',
    },
    {
      title: 'Attendance Report',
      description: 'Daily, weekly and monthly attendance tracking',
      icon: <Calendar className="w-6 h-6" />,
      color: 'secondary',
      lastGenerated: '1 day ago',
    },
    {
      title: 'Payroll Report',
      description: 'Salary distribution and payroll analysis',
      icon: <BarChart3 className="w-6 h-6" />,
      color: 'success',
      lastGenerated: '3 days ago',
    },
    {
      title: 'Department Report',
      description: 'Department performance and analytics',
      icon: <PieChart className="w-6 h-6" />,
      color: 'warning',
      lastGenerated: '1 week ago',
    },
    {
      title: 'Performance Report',
      description: 'Employee performance evaluations',
      icon: <TrendingUp className="w-6 h-6" />,
      color: 'accent',
      lastGenerated: '5 days ago',
    },
  ];

  const quickReports = [
    'Today\'s Attendance Summary',
    'This Week\'s New Hires',
    'Monthly Salary Overview',
    'Department Headcount',
    'Leave Requests Summary',
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-neutral-900 mb-2">
          {t('nav.reports')}
        </h1>
        <p className="text-neutral-600">
          Generate and download comprehensive HR reports and analytics
        </p>
      </div>

      {/* Quick Reports */}
      <Card className="border-neutral-200 card-shadow">
        <CardHeader>
          <CardTitle className="flex items-center text-neutral-900">
            <Download className="w-5 h-5 mr-2 text-primary-600" />
            Quick Reports
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {quickReports.map((report, index) => (
              <Button
                key={index}
                variant="outline"
                className="justify-between h-auto p-4 border-neutral-200 hover:bg-primary-50 hover:border-primary-200"
              >
                <span className="text-left font-medium">{report}</span>
                <Download className="w-4 h-4 text-neutral-400" />
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Detailed Reports */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {reportTypes.map((report, index) => (
          <Card key={index} className="border-neutral-200 card-shadow hover:card-shadow-lg transition-all-smooth">
            <CardHeader className="pb-4">
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-lg ${
                    report.color === 'primary' ? 'bg-primary-50 text-primary-600' :
                    report.color === 'secondary' ? 'bg-secondary-50 text-secondary-600' :
                    report.color === 'success' ? 'bg-success-50 text-success-600' :
                    report.color === 'warning' ? 'bg-warning-50 text-warning-600' :
                    'bg-accent-50 text-accent-600'
                  }`}>
                    {report.icon}
                  </div>
                  <div>
                    <CardTitle className="text-lg text-neutral-900">{report.title}</CardTitle>
                    <p className="text-sm text-neutral-500 mt-1">{report.description}</p>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-xs text-neutral-500">
                  Last generated: {report.lastGenerated}
                </p>
                <div className="flex space-x-2">
                  <Button size="sm" variant="outline" className="flex-1 border-neutral-200">
                    <FileText className="w-4 h-4 mr-1" />
                    Preview
                  </Button>
                  <Button 
                    size="sm" 
                    className={`${
                      report.color === 'primary' ? 'bg-primary-600 hover:bg-primary-700' :
                      report.color === 'secondary' ? 'bg-secondary-600 hover:bg-secondary-700' :
                      report.color === 'success' ? 'bg-success-600 hover:bg-success-700' :
                      report.color === 'warning' ? 'bg-warning-600 hover:bg-warning-700' :
                      'bg-accent-600 hover:bg-accent-700'
                    } text-white`}
                  >
                    <Download className="w-4 h-4 mr-1" />
                    Generate
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}