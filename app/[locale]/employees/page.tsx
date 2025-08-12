'use client';

import { useTranslations, useLocale } from 'next-intl';
import { useState } from 'react';
import { 
  Users, 
  Search, 
  Plus, 
  Edit, 
  Trash2, 
  Eye,
  Filter,
  Download
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export default function EmployeesPage() {
  const t = useTranslations();
  const locale = useLocale();
  const isRTL = locale === 'ar';
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('all');

  const employees = [
    {
      id: 1,
      name: 'Ahmed Hassan',
      position: 'Software Engineer',
      department: 'IT',
      email: 'ahmed@company.com',
      phone: '+966 50 123 4567',
      status: 'Active',
    },
    {
      id: 2,
      name: 'Sarah Johnson',
      position: 'HR Manager',
      department: 'HR',
      email: 'sarah@company.com',
      phone: '+966 55 987 6543',
      status: 'Active',
    },
    {
      id: 3,
      name: 'Mohammed Ali',
      position: 'Marketing Specialist',
      department: 'Marketing',
      email: 'mohammed@company.com',
      phone: '+966 54 456 7890',
      status: 'Active',
    },
    {
      id: 4,
      name: 'Lisa Chen',
      position: 'Accountant',
      department: 'Finance',
      email: 'lisa@company.com',
      phone: '+966 56 234 5678',
      status: 'On Leave',
    },
  ];

  const departments = [
    { value: 'all', label: isRTL ? 'جميع الأقسام' : 'All Departments' },
    { value: 'IT', label: 'IT' },
    { value: 'HR', label: 'HR' },
    { value: 'Marketing', label: isRTL ? 'التسويق' : 'Marketing' },
    { value: 'Finance', label: isRTL ? 'المالية' : 'Finance' },
  ];

  const filteredEmployees = employees.filter(employee => {
    const matchesSearch = employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         employee.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment = selectedDepartment === 'all' || employee.department === selectedDepartment;
    return matchesSearch && matchesDepartment;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-neutral-900 mb-2">
            {t('employees.title')}
          </h1>
          <p className="text-neutral-600">
            {isRTL ? 'إدارة وتتبع جميع الموظفين' : 'Manage and track all employees'}
          </p>
        </div>
        <Button className="bg-primary-600 hover:bg-primary-700 text-white">
          <Plus className={`w-4 h-4 ${isRTL ? 'ml-2' : 'mr-2'}`} />
          {t('employees.addNew')}
        </Button>
      </div>

      {/* Filters */}
      <Card className="border-neutral-200 card-shadow">
        <CardContent className="p-6">
          <div className={`flex flex-col md:flex-row gap-4 ${isRTL ? 'md:flex-row-reverse' : ''}`}>
            <div className="flex-1">
              <div className="relative">
                <Search className={`absolute ${isRTL ? 'right-3' : 'left-3'} top-1/2 transform -translate-y-1/2 w-4 h-4 text-neutral-400`} />
                <Input
                  placeholder={t('employees.search')}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className={`${isRTL ? 'pr-10' : 'pl-10'} border-neutral-200 focus:border-primary-300 focus:ring-primary-200`}
                />
              </div>
            </div>
            <div className="w-full md:w-48">
              <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
                <SelectTrigger className="border-neutral-200 focus:border-primary-300 focus:ring-primary-200">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {departments.map((dept) => (
                    <SelectItem key={dept.value} value={dept.value}>
                      {dept.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <Button variant="outline" className="border-neutral-200 hover:bg-neutral-50">
              <Filter className={`w-4 h-4 ${isRTL ? 'ml-2' : 'mr-2'}`} />
              {t('common.filter')}
            </Button>
            <Button variant="outline" className="border-neutral-200 hover:bg-neutral-50">
              <Download className={`w-4 h-4 ${isRTL ? 'ml-2' : 'mr-2'}`} />
              {t('common.export')}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Employee Table */}
      <Card className="border-neutral-200 card-shadow">
        <CardHeader>
          <CardTitle className="flex items-center text-neutral-900">
            <Users className={`w-5 h-5 ${isRTL ? 'ml-2' : 'mr-2'} text-primary-600`} />
            {isRTL ? `الموظفون (${filteredEmployees.length})` : `Employees (${filteredEmployees.length})`}
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="border-neutral-200">
                <TableHead className="text-neutral-700 font-semibold">
                  {t('employees.name')}
                </TableHead>
                <TableHead className="text-neutral-700 font-semibold">
                  {t('employees.position')}
                </TableHead>
                <TableHead className="text-neutral-700 font-semibold">
                  {t('employees.department')}
                </TableHead>
                <TableHead className="text-neutral-700 font-semibold">
                  {t('employees.email')}
                </TableHead>
                <TableHead className="text-neutral-700 font-semibold">
                  {t('employees.phone')}
                </TableHead>
                <TableHead className="text-neutral-700 font-semibold text-center">
                  {t('employees.actions')}
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredEmployees.map((employee) => (
                <TableRow key={employee.id} className="border-neutral-200 hover:bg-neutral-50 transition-all-smooth">
                  <TableCell>
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                        <span className="text-sm font-medium text-primary-600">
                          {employee.name.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <p className="font-medium text-neutral-900">{employee.name}</p>
                        <p className={`text-sm ${employee.status === 'Active' ? 'text-success-600' : 'text-warning-600'}`}>
                          {employee.status}
                        </p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-neutral-700">{employee.position}</TableCell>
                  <TableCell>
                    <span className="px-2 py-1 bg-secondary-100 text-secondary-700 rounded-full text-xs font-medium">
                      {employee.department}
                    </span>
                  </TableCell>
                  <TableCell className="text-neutral-700">{employee.email}</TableCell>
                  <TableCell className="text-neutral-700">{employee.phone}</TableCell>
                  <TableCell>
                    <div className="flex items-center justify-center space-x-2">
                      <Button
                        size="sm"
                        variant="ghost"
                        className="text-neutral-600 hover:text-primary-600 hover:bg-primary-50"
                      >
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="text-neutral-600 hover:text-warning-600 hover:bg-warning-50"
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="text-neutral-600 hover:text-error-600 hover:bg-error-50"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}