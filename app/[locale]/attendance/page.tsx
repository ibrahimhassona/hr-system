import { useTranslations } from 'next-intl';
import { Clock, Calendar, CheckCircle, XCircle, Users } from 'lucide-react';
import { StatCard } from '@/components/ui/stat-card';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function AttendancePage() {
  const t = useTranslations();

  const attendanceStats = [
    {
      title: t('dashboard.presentToday'),
      value: '234',
      icon: <CheckCircle className="w-6 h-6" />,
      trend: { value: '94%', isPositive: true },
      color: 'success' as const,
    },
    {
      title: 'Absent Today',
      value: '14',
      icon: <XCircle className="w-6 h-6" />,
      color: 'error' as const,
    },
    {
      title: 'Late Arrivals',
      value: '8',
      icon: <Clock className="w-6 h-6" />,
      color: 'warning' as const,
    },
    {
      title: 'Early Departures',
      value: '3',
      icon: <Users className="w-6 h-6" />,
      color: 'accent' as const,
    },
  ];

  const todayAttendance = [
    {
      id: 1,
      name: 'Ahmed Hassan',
      department: 'IT',
      checkIn: '08:15',
      checkOut: '--',
      status: 'Present',
      workingHours: '7h 45m',
    },
    {
      id: 2,
      name: 'Sarah Johnson',
      department: 'HR',
      checkIn: '08:00',
      checkOut: '17:30',
      status: 'Completed',
      workingHours: '9h 30m',
    },
    {
      id: 3,
      name: 'Mohammed Ali',
      department: 'Marketing',
      checkIn: '09:15',
      checkOut: '--',
      status: 'Late',
      workingHours: '6h 45m',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-neutral-900 mb-2">
          {t('nav.attendance')}
        </h1>
        <p className="text-neutral-600">
          Track and manage employee attendance and working hours
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {attendanceStats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>

      {/* Today's Attendance */}
      <Card className="border-neutral-200 card-shadow">
        <CardHeader>
          <CardTitle className="flex items-center text-neutral-900">
            <Calendar className="w-5 h-5 mr-2 text-primary-600" />
           {"Today's Attendance"}
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-neutral-50 border-b border-neutral-200">
                <tr>
                  <th className="text-left py-3 px-6 text-neutral-700 font-semibold">Employee</th>
                  <th className="text-left py-3 px-6 text-neutral-700 font-semibold">Check In</th>
                  <th className="text-left py-3 px-6 text-neutral-700 font-semibold">Check Out</th>
                  <th className="text-left py-3 px-6 text-neutral-700 font-semibold">Working Hours</th>
                  <th className="text-left py-3 px-6 text-neutral-700 font-semibold">Status</th>
                </tr>
              </thead>
              <tbody>
                {todayAttendance.map((record) => (
                  <tr key={record.id} className="border-b border-neutral-200 hover:bg-neutral-50 transition-all-smooth">
                    <td className="py-4 px-6">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                          <span className="text-sm font-medium text-primary-600">
                            {record.name.charAt(0)}
                          </span>
                        </div>
                        <div>
                          <p className="font-medium text-neutral-900">{record.name}</p>
                          <p className="text-sm text-neutral-500">{record.department}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-neutral-700 font-mono">{record.checkIn}</td>
                    <td className="py-4 px-6 text-neutral-700 font-mono">{record.checkOut}</td>
                    <td className="py-4 px-6 text-neutral-700 font-mono">{record.workingHours}</td>
                    <td className="py-4 px-6">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        record.status === 'Present' ? 'bg-primary-100 text-primary-700' :
                        record.status === 'Completed' ? 'bg-success-100 text-success-700' :
                        record.status === 'Late' ? 'bg-warning-100 text-warning-700' :
                        'bg-error-100 text-error-700'
                      }`}>
                        {record.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}