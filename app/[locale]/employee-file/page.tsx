'use client';

import { useTranslations } from 'next-intl';
import { useLocale } from 'next-intl';
import { useState, useMemo } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { 
  User, Mail, Phone, Calendar, Briefcase, 
  DollarSign, Clock, Star, Edit, Send, 
  Printer, AlertTriangle, FileText, RotateCcw
} from 'lucide-react';

interface Employee {
  fullName: string;
  jobTitle: string;
  department: string;
  email: string;
  phone: string;
  gender: string;
  birthDate: string;
  employeeId: string;
  joinDate: string;
  manager: string;
  status: string;
  salary: string;
  lastSalaryUpdate: string;
  allowances: string;
  remainingLeaves: number;
  usedLeaves: number;
  leaveRequests: {
    date: string;
    type: string;
    duration: string;
    status: string;
  }[];
  lastEvaluation: string;
  strengths: string;
  improvements: string;
  documents: {
    name: string;
    date: string;
    status: string;
  }[];
}

export default function EmployeeProfilePage() {
  const locale = useLocale();
  const isRTL = locale === 'ar';
  const t = useTranslations("profile");
  
  const [profileImage, setProfileImage] = useState('/placeholder-avatar.jpg');

  // Employee data with memoization
  const employee: Employee = useMemo(() => ({
    fullName: isRTL ? 'أحمد حسن' : 'Ahmed Hassan',
    jobTitle: isRTL ? 'مهندس برمجيات' : 'Software Engineer',
    department: isRTL ? 'تكنولوجيا المعلومات' : 'Information Technology',
    email: 'ahmed.hassan@company.com',
    phone: '+966 500 123456',
    gender: isRTL ? 'ذكر' : 'Male',
    birthDate: '1990-05-15',
    employeeId: 'EMP-00123',
    joinDate: '2020-01-15',
    manager: isRTL ? 'سارة علي' : 'Sarah Ali',
    status: isRTL ? 'نشط' : 'Active',
    salary: isRTL ? '15,000 ريال' : '$4,000',
    lastSalaryUpdate: '2023-06-01',
    allowances: isRTL ? 'بدل سكن: 2,000 ريال، بدل نقل: 500 ريال' : 'Housing Allowance: $500, Transportation: $150',
    remainingLeaves: 15,
    usedLeaves: 5,
    leaveRequests: [
      { 
        date: '2023-07-10', 
        type: isRTL ? 'إجازة سنوية' : 'Annual Leave', 
        duration: isRTL ? '5 أيام' : '5 days', 
        status: isRTL ? 'مقبولة' : 'Approved' 
      },
      { 
        date: '2023-08-20', 
        type: isRTL ? 'إجازة مرضية' : 'Sick Leave', 
        duration: isRTL ? '2 أيام' : '2 days', 
        status: isRTL ? 'معلقة' : 'Pending' 
      },
    ],
    lastEvaluation: isRTL ? 'ممتاز (4.8/5)' : 'Excellent (4.8/5)',
    strengths: isRTL ? 'مهارات تقنية عالية، عمل جماعي جيد' : 'Strong technical skills, good team player',
    improvements: isRTL ? 'تحسين إدارة الوقت' : 'Improve time management',
    documents: [
      { 
        name: isRTL ? 'عقد التوظيف' : 'Employment Contract', 
        date: '2020-01-15', 
        status: isRTL ? 'مكتمل' : 'Completed' 
      },
      { 
        name: isRTL ? 'شهادة طبية' : 'Medical Certificate', 
        date: '2023-01-10', 
        status: isRTL ? 'مكتمل' : 'Completed' 
      },
    ],
  }), [isRTL]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.length) return;
    
    const file = e.target.files[0];
    if (!file.type.startsWith('image/')) {
      alert(t('invalid_image'));
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      if (reader.result) setProfileImage(reader.result.toString());
    };
    reader.readAsDataURL(file);
  };

  // Status badge variants
  const getStatusVariant = (status: string) => {
    const activeText = isRTL ? 'نشط' : 'Active';
    const approvedText = isRTL ? 'مقبولة' : 'Approved';
    
    return status === activeText || status === approvedText 
      ? 'default' 
      : 'destructive';
  };

  // RTL safe icon placement
  const IconWrapper = ({ children }: { children: React.ReactNode }) => (
    <span className={isRTL ? 'ml-2' : 'mr-2'}>{children}</span>
  );

  return (
    <div className="min-h-screen p-4 md:p-6">
      <Card className="max-w-8xl mx-auto bg-white/80 shadow-lg rounded-md overflow-hidden">
        {/* Header Section */}
        <div className={`p-6  flex flex-col md:flex-row items-center justify-between gap-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
          <div className={`flex items-center gap-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
            <div className="relative">
              <Avatar className="w-20 h-20 md:w-24 md:h-24 border-4 border-white shadow-md">
                <AvatarImage src={profileImage} alt={employee.fullName} />
                <AvatarFallback className="bg-gray-200">
                  {employee.fullName.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <label 
                htmlFor="profile-upload" 
                className="absolute -bottom-1 -right-1 bg-white rounded-full p-1.5 shadow-md cursor-pointer border hover:bg-gray-50 transition-all"
                title={t('change_photo')}
              >
                <Edit size={18} className="text-blue-600" />
                <Input 
                  id="profile-upload" 
                  type="file" 
                  accept="image/*" 
                  className="hidden" 
                  onChange={handleImageChange}
                />
              </label>
            </div>
            <div className={`flex flex-col ${isRTL ? 'items-end' : ''}`}>
              <h1 className="text-xl md:text-2xl font-bold text-gray-900">
                {employee.fullName}
              </h1>
              <p className="text-gray-600 text-sm md:text-base">
                {employee.jobTitle} • {employee.department}
              </p>
              <Badge variant="outline" className="mt-2 w-fit">
                {employee.status}
              </Badge>
            </div>
          </div>
          
          <div className={`flex flex-wrap gap-2 ${isRTL ? 'justify-end' : ''}`}>
            <Button variant="outline" size="sm" className="gap-1.5">
              <Edit size={16} />
              {t('edit_profile')}
            </Button>
            <Button variant="outline" size="sm" className="gap-1.5">
              <Send size={16} />
              {t('send_message')}
            </Button>
            <Button variant="outline" size="sm" className="gap-1.5">
              <Printer size={16} />
              {t('print_file')}
            </Button>
            <Button variant="destructive" size="sm" className="gap-1.5">
              <AlertTriangle size={16} />
              {t('terminate_service')}
            </Button>
          </div>
        </div>

        {/* Tab Navigation */}
        <Tabs defaultValue="personal" className="p-4 md:p-6">
          <TabsList className={`w-full flex overflow-x-auto py-1 mb-6 ${isRTL ? 'flex-row-reverse' : ''}`}>
            <TabsTrigger value="personal" className="gap-1.5">
              <User size={16} /> {t('personal_info')}
            </TabsTrigger>
            <TabsTrigger value="job" className="gap-1.5">
              <Briefcase size={16} /> {t('job_records')}
            </TabsTrigger>
            <TabsTrigger value="documents" className="gap-1.5">
              <FileText size={16} /> {t('documents')}
            </TabsTrigger>
            <TabsTrigger value="evaluations" className="gap-1.5">
              <Star size={16} /> {t('evaluations')}
            </TabsTrigger>
          </TabsList>

          {/* Personal Info Tab */}
          <TabsContent value="personal">
            <Card>
              <CardHeader className="flex flex-row items-center gap-2 pb-3">
                <User size={20} className="text-blue-600" />
                <CardTitle>{t('basic_info')}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <InfoField 
                    label={t('email')} 
                    value={employee.email} 
                    icon={<Mail size={16} className="text-gray-500" />}
                    isRTL={isRTL}
                  />
                  <InfoField 
                    label={t('phone')} 
                    value={employee.phone} 
                    icon={<Phone size={16} className="text-gray-500" />}
                    isRTL={isRTL}
                  />
                  <InfoField 
                    label={t('gender')} 
                    value={employee.gender} 
                    icon={<User size={16} className="text-gray-500" />}
                    isRTL={isRTL}
                  />
                  <InfoField 
                    label={t('birth_date')} 
                    value={employee.birthDate} 
                    icon={<Calendar size={16} className="text-gray-500" />}
                    isRTL={isRTL}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Job Records Tab */}
          <TabsContent value="job" className="space-y-5">
            <Card>
              <CardHeader className="flex flex-row items-center gap-2 pb-3">
                <Briefcase size={20} className="text-blue-600" />
                <CardTitle>{t('job_info')}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <InfoField 
                    label={t('employee_id')} 
                    value={employee.employeeId} 
                    isRTL={isRTL}
                  />
                  <InfoField 
                    label={t('join_date')} 
                    value={employee.joinDate} 
                    icon={<Calendar size={16} className="text-gray-500" />}
                    isRTL={isRTL}
                  />
                  <InfoField 
                    label={t('manager')} 
                    value={employee.manager} 
                    isRTL={isRTL}
                  />
                  <InfoField 
                    label={t('department')} 
                    value={employee.department} 
                    isRTL={isRTL}
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center gap-2 pb-3">
                <DollarSign size={20} className="text-blue-600" />
                <CardTitle>{t('salary_info')}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <InfoField 
                    label={t('current_salary')} 
                    value={employee.salary} 
                    isRTL={isRTL}
                  />
                  <InfoField 
                    label={t('last_update')} 
                    value={employee.lastSalaryUpdate} 
                    isRTL={isRTL}
                  />
                  <div className="md:col-span-2">
                    <InfoField 
                      label={t('allowances')} 
                      value={employee.allowances} 
                      isRTL={isRTL}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center gap-2 pb-3">
                <Clock size={20} className="text-blue-600" />
                <CardTitle>{t('leaves_info')}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <InfoCard 
                    label={t('remaining_days')} 
                    value={employee.remainingLeaves.toString()} 
                    variant="success"
                    isRTL={isRTL}
                  />
                  <InfoCard 
                    label={t('used_days')} 
                    value={employee.usedLeaves.toString()} 
                    variant="neutral"
                    isRTL={isRTL}
                  />
                </div>
                
                <h3 className="font-medium text-gray-700 mb-3">
                  {t('recent_requests')}
                </h3>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>{t('date')}</TableHead>
                      <TableHead>{t('type')}</TableHead>
                      <TableHead>{t('duration')}</TableHead>
                      <TableHead className="text-right">{t('status')}</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {employee.leaveRequests.map((req, index) => (
                      <TableRow key={index}>
                        <TableCell>{req.date}</TableCell>
                        <TableCell>{req.type}</TableCell>
                        <TableCell>{req.duration}</TableCell>
                        <TableCell className="text-right">
                          <Badge variant={getStatusVariant(req.status)}>
                            {req.status}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Documents Tab */}
          <TabsContent value="documents">
            <Card>
              <CardHeader className="flex flex-row items-center gap-2 pb-3">
                <FileText size={20} className="text-blue-600" />
                <CardTitle>{t('documents')}</CardTitle>
                <Button size="sm" variant="outline" className="ml-auto gap-1.5">
                  <RotateCcw size={14} />
                  {t('refresh')}
                </Button>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>{t('name')}</TableHead>
                      <TableHead>{t('date')}</TableHead>
                      <TableHead className="text-right">{t('status')}</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {employee.documents.map((doc, index) => (
                      <TableRow key={index} className="hover:bg-gray-50">
                        <TableCell className="font-medium">{doc.name}</TableCell>
                        <TableCell>{doc.date}</TableCell>
                        <TableCell className="text-right">
                          <Badge variant="default">{doc.status}</Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Evaluations Tab */}
          <TabsContent value="evaluations">
            <Card>
              <CardHeader className="flex flex-row items-center gap-2 pb-3">
                <Star size={20} className="text-blue-600" />
                <CardTitle>{t('evaluations')}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-5">
                <InfoCard 
                  label={t('last_evaluation')} 
                  value={employee.lastEvaluation} 
                  variant="accent"
                  isRTL={isRTL}
                />
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="border-l-4 border-green-500 pl-4 py-1">
                    <h3 className="text-sm font-medium text-gray-500 mb-1">
                      {t('strengths')}
                    </h3>
                    <p className="text-gray-800">{employee.strengths}</p>
                  </div>
                  
                  <div className="border-l-4 border-yellow-500 pl-4 py-1">
                    <h3 className="text-sm font-medium text-gray-500 mb-1">
                      {t('improvements')}
                    </h3>
                    <p className="text-gray-800">{employee.improvements}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  );
}

// Helper components
const InfoField = ({
  label,
  value,
  icon,
  isRTL
}: {
  label: string;
  value: string;
  icon?: React.ReactNode;
  isRTL: boolean;
}) => (
  <div className={`flex flex-col ${isRTL ? 'text-right' : ''}`}>
    <span className="text-sm text-gray-500 flex items-center gap-1.5">
      {icon}
      {label}
    </span>
    <span className="font-medium text-gray-900 mt-0.5">{value}</span>
  </div>
);

const InfoCard = ({
  label,
  value,
  variant = 'neutral',
  isRTL
}: {
  label: string;
  value: string;
  variant?: 'success' | 'neutral' | 'accent';
  isRTL: boolean;
}) => {
  const variantClasses = {
    success: 'border-green-500 bg-green-50',
    neutral: 'border-gray-300 bg-gray-50',
    accent: 'border-blue-500 bg-blue-50'
  };
  
  return (
    <div className={`border-l-4 rounded-r p-4 ${variantClasses[variant]} ${isRTL ? 'border-r-4 border-l-0 rounded-l rounded-r-none text-right' : ''}`}>
      <h3 className="text-sm font-medium text-gray-500">{label}</h3>
      <p className="text-lg font-semibold text-gray-900 mt-1">{value}</p>
    </div>
  );
};