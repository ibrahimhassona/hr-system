import React from 'react';
import { 
  Users, 
  Building2, 
  Clock, 
  FileText,
  Plus,
  TrendingUp,
  Calendar,
  UserPlus,
  Award,
  DollarSign,
  BarChart3,
  Bell,
  Search,
  Filter,
  Download,
  Eye,
  ArrowUpRight,
  ArrowDownRight,
  MapPin,
  Mail,
  Phone
} from 'lucide-react';

export default function HRDashboard() {
  const stats = [
    {
      title: 'إجمالي الموظفين',
      value: '1,248',
      icon: <Users className="w-7 h-7" />,
      trend: { value: '+12%', isPositive: true },
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-600'
    },
    {
      title: 'الأقسام النشطة',
      value: '18',
      icon: <Building2 className="w-7 h-7" />,
      trend: { value: '+3', isPositive: true },
      color: 'from-emerald-500 to-emerald-600',
      bgColor: 'bg-emerald-50',
      textColor: 'text-emerald-600'
    },
    {
      title: 'الحضور اليوم',
      value: '1,156',
      icon: <Clock className="w-7 h-7" />,
      trend: { value: '92.6%', isPositive: true },
      color: 'from-amber-500 to-amber-600',
      bgColor: 'bg-amber-50',
      textColor: 'text-amber-600'
    },
    {
      title: 'الطلبات المعلقة',
      value: '23',
      icon: <FileText className="w-7 h-7" />,
      trend: { value: '-8', isPositive: true },
      color: 'from-purple-500 to-purple-600',
      bgColor: 'bg-purple-50',
      textColor: 'text-purple-600'
    }
  ];

  const recentActivities = [
    { 
      id: 1, 
      text: 'انضم أحمد حسن الجديد إلى قسم تكنولوجيا المعلومات', 
      time: 'منذ ساعتين',
      type: 'join',
      user: 'أحمد حسن'
    },
    { 
      id: 2, 
      text: 'أكملت سارة محمد برنامج التدريب في إدارة المشاريع', 
      time: 'منذ 4 ساعات',
      type: 'training',
      user: 'سارة محمد'
    },
    { 
      id: 3, 
      text: 'تمت معالجة كشوف المرتبات الشهرية بنجاح', 
      time: 'منذ يوم واحد',
      type: 'payroll',
      user: 'النظام'
    },
    { 
      id: 4, 
      text: 'تم جدولة اجتماع القسم لفريق التسويق', 
      time: 'منذ يومين',
      type: 'meeting',
      user: 'فريق التسويق'
    }
  ];

  const quickActions = [
    { icon: <UserPlus className="w-5 h-5" />, label: 'إضافة موظف جديد', color: 'bg-blue-500 hover:bg-blue-600' },
    { icon: <FileText className="w-5 h-5" />, label: 'إنشاء تقرير', color: 'bg-emerald-500 hover:bg-emerald-600' },
    { icon: <Calendar className="w-5 h-5" />, label: 'عرض الحضور', color: 'bg-amber-500 hover:bg-amber-600' },
    { icon: <Award className="w-5 h-5" />, label: 'تقييم الأداء', color: 'bg-purple-500 hover:bg-purple-600' },
    { icon: <DollarSign className="w-5 h-5" />, label: 'إدارة الرواتب', color: 'bg-pink-500 hover:bg-pink-600' },
    { icon: <BarChart3 className="w-5 h-5" />, label: 'التحليلات', color: 'bg-indigo-500 hover:bg-indigo-600' }
  ];

  const upcomingEvents = [
    { id: 1, title: 'اجتماع فريق التطوير', date: '15 أغسطس', time: '10:00 ص', type: 'meeting' },
    { id: 2, title: 'ورشة التدريب الشهرية', date: '18 أغسطس', time: '02:00 م', type: 'training' },
    { id: 3, title: 'مراجعة الأداء الربعية', date: '22 أغسطس', time: '09:00 ص', type: 'review' }
  ];

  const topPerformers = [
    { id: 1, name: 'فاطمة أحمد', department: 'التسويق', score: 98, avatar: 'F' },
    { id: 2, name: 'محمد علي', department: 'التطوير', score: 96, avatar: 'M' },
    { id: 3, name: 'نور حسام', department: 'المبيعات', score: 94, avatar: 'N' }
  ];

  const StatCard = ({ stat }:any) => (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 group">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <div className={`inline-flex p-3 rounded-xl ${stat.bgColor} mb-4 group-hover:scale-110 transition-transform duration-300`}>
            <div className={stat.textColor}>
              {stat.icon}
            </div>
          </div>
          <h3 className="text-sm font-medium text-gray-600 mb-1">{stat.title}</h3>
          <p className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</p>
          {stat.trend && (
            <div className="flex items-center space-x-2 rtl:space-x-reverse">
              {stat.trend.isPositive ? (
                <ArrowUpRight className="w-4 h-4 text-emerald-500" />
              ) : (
                <ArrowDownRight className="w-4 h-4 text-red-500" />
              )}
              <span className={`text-sm font-medium ${stat.trend.isPositive ? 'text-emerald-500' : 'text-red-500'}`}>
                {stat.trend.value}
              </span>
              <span className="text-xs text-gray-500">من الشهر الماضي</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                مرحباً بك في نظام الموارد البشرية
              </h1>
              <p className="text-gray-600">
                إدارة شاملة ومتقدمة لموارد مؤسستك البشرية
              </p>
            </div>
            <div className="flex items-center space-x-3 rtl:space-x-reverse">
              <div className="flex items-center space-x-3 rtl:space-x-reverse bg-gray-50 px-4 py-2 rounded-full">
                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-medium text-sm">
                  أ
                </div>
                <span className="font-medium text-gray-700">أحمد الشرع</span>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <StatCard key={index} stat={stat} />
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Activities */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
              <div className="p-6 border-b border-gray-100">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-semibold text-gray-900 flex items-center">
                    <TrendingUp className="w-5 h-5 mr-3 text-blue-500" />
                    الأنشطة الأخيرة
                  </h3>
                  <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                    عرض الكل
                  </button>
                </div>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {recentActivities.map((activity) => (
                    <div key={activity.id} className="flex items-start space-x-4 rtl:space-x-reverse p-4 rounded-xl hover:bg-gray-50 transition-colors group">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 group-hover:bg-blue-200 transition-colors">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-gray-900 font-medium text-sm leading-relaxed">
                          {activity.text}
                        </p>
                        <p className="text-gray-500 text-xs mt-1 flex items-center">
                          <Clock className="w-3 h-3 mr-1" />
                          {activity.time}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
              <div className="p-6 border-b border-gray-100">
                <h3 className="text-xl font-semibold text-gray-900 flex items-center">
                  <Plus className="w-5 h-5 mr-3 text-blue-500" />
                  الإجراءات السريعة
                </h3>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 gap-3">
                  {quickActions.map((action, index) => (
                    <button
                      key={index}
                      className={`${action.color} text-white p-4 rounded-xl text-right flex items-center justify-between transition-all duration-300 hover:scale-105 hover:shadow-lg`}
                    >
                      <span className="font-medium text-sm">{action.label}</span>
                      {action.icon}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Upcoming Events */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
              <div className="p-6 border-b border-gray-100">
                <h3 className="text-xl font-semibold text-gray-900 flex items-center">
                  <Calendar className="w-5 h-5 mr-3 text-blue-500" />
                  الأحداث القادمة
                </h3>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {upcomingEvents.map((event) => (
                    <div key={event.id} className="flex items-center space-x-3 rtl:space-x-reverse p-3 rounded-xl hover:bg-gray-50 transition-colors">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center text-white font-bold text-sm">
                        {event.date.split(' ')[0]}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-gray-900 text-sm">{event.title}</p>
                        <p className="text-gray-500 text-xs">{event.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Top Performers */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
            <div className="p-6 border-b border-gray-100">
              <h3 className="text-xl font-semibold text-gray-900 flex items-center">
                <Award className="w-5 h-5 mr-3 text-blue-500" />
                أفضل الموظفين هذا الشهر
              </h3>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {topPerformers.map((performer, index) => (
                  <div key={performer.id} className="flex items-center space-x-4 rtl:space-x-reverse p-4 rounded-xl hover:bg-gray-50 transition-colors">
                    <div className="flex items-center space-x-3 rtl:space-x-reverse">
                      <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white ${index === 0 ? 'bg-yellow-500' : index === 1 ? 'bg-gray-400' : 'bg-orange-500'}`}>
                        {index + 1}
                      </span>
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center font-medium text-blue-600">
                        {performer.avatar}
                      </div>
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">{performer.name}</p>
                      <p className="text-sm text-gray-500">{performer.department}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-emerald-600">{performer.score}%</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Department Overview */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
            <div className="p-6 border-b border-gray-100">
              <h3 className="text-xl font-semibold text-gray-900 flex items-center">
                <Building2 className="w-5 h-5 mr-3 text-blue-500" />
                نظرة عامة على الأقسام
              </h3>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {[
                  { name: 'تكنولوجيا المعلومات', employees: 89, color: 'bg-blue-500' },
                  { name: 'التسويق', employees: 67, color: 'bg-emerald-500' },
                  { name: 'المبيعات', employees: 124, color: 'bg-amber-500' },
                  { name: 'الموارد البشرية', employees: 23, color: 'bg-purple-500' },
                  { name: 'المالية', employees: 45, color: 'bg-pink-500' }
                ].map((dept, index) => (
                  <div key={index} className="flex items-center space-x-4 rtl:space-x-reverse">
                    <div className={`w-3 h-3 ${dept.color} rounded-full`}></div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="font-medium text-gray-900">{dept.name}</span>
                        <span className="text-sm text-gray-500">{dept.employees} موظف</span>
                      </div>
                      <div className="mt-2 bg-gray-200 rounded-full h-2">
                        <div 
                          className={`h-2 ${dept.color} rounded-full transition-all duration-500`}
                          style={{ width: `${(dept.employees / 150) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}