'use client';

import { useTranslations } from 'next-intl';
import { useLocale } from 'next-intl';
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { CalendarIcon, Plus, Search, Filter, Clock, AlertCircle, CheckCircle, XCircle, FileText } from 'lucide-react';
import { toast } from 'sonner';

export default function LeavesManagementPage() {
  const t = useTranslations("leaves_vacations");
  const locale = useLocale();
  const isRTL = locale === 'ar';

  // Sample data
  const [leaves, setLeaves] = useState([
    {
      id: 1,
      type: 'annual',
      startDate: new Date('2025-09-01'),
      endDate: new Date('2025-09-05'),
      days: 5,
      status: 'approved',
      notes: 'Family vacation',
    },
    {
      id: 2,
      type: 'sick',
      startDate: new Date('2025-08-10'),
      endDate: new Date('2025-08-12'),
      days: 3,
      status: 'pending',
      notes: 'Medical leave',
    },
    {
      id: 3,
      type: 'emergency',
      startDate: new Date('2025-07-20'),
      endDate: new Date('2025-07-20'),
      days: 1,
      status: 'rejected',
      notes: 'Personal emergency',
    },
  ]);

  const summary = {
    annualTotal: 30,
    annualUsed: 10,
    annualRemaining: 20,
    sickDays: 5,
  };

  // Filters
  const [filterType, setFilterType] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [dateRange, setDateRange] = useState<{ from: Date | undefined; to: Date | undefined }>({ from: undefined, to: undefined });

  // New Leave Form
  const [newLeaveType, setNewLeaveType] = useState('');
  const [newStartDate, setNewStartDate] = useState<Date | undefined>(undefined);
  const [newEndDate, setNewEndDate] = useState<Date | undefined>(undefined);
  const [newNotes, setNewNotes] = useState('');

  const filteredLeaves = leaves.filter(leave => {
    let matches = true;
    if (filterType && leave.type !== filterType) matches = false;
    if (filterStatus && leave.status !== filterStatus) matches = false;
    if (searchTerm && !leave.notes.toLowerCase().includes(searchTerm.toLowerCase())) matches = false;
    if (dateRange.from && leave.startDate < dateRange.from) matches = false;
    if (dateRange.to && leave.endDate > dateRange.to) matches = false;
    return matches;
  });

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'annual':
        return <CalendarIcon className="w-4 h-4" />;
      case 'sick':
        return <AlertCircle className="w-4 h-4" />;
      case 'emergency':
        return <Clock className="w-4 h-4" />;
      default:
        return <FileText className="w-4 h-4" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'approved':
        return <Badge variant="default" className="bg-green-100 text-green-800">{t('approved')}</Badge>;
      case 'pending':
        return <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">{t('pending')}</Badge>;
      case 'rejected':
        return <Badge variant="destructive" className="bg-red-100 text-red-800">{t('rejected')}</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const handleSubmitNewLeave = () => {
    if (!newLeaveType || !newStartDate || !newEndDate) {
      toast.error(t('fill_all_fields'));
      return;
    }

    const days = Math.ceil((newEndDate.getTime() - newStartDate.getTime()) / (1000 * 3600 * 24)) + 1;

    const newLeave = {
      id: leaves.length + 1,
      type: newLeaveType,
      startDate: newStartDate,
      endDate: newEndDate,
      days,
      status: 'pending',
      notes: newNotes,
    };

    setLeaves([...leaves, newLeave]);
    setNewLeaveType('');
    setNewStartDate(undefined);
    setNewEndDate(undefined);
    setNewNotes('');
    toast.success(t('leave_requested'));
  };

  return (
    <div dir={isRTL ? 'rtl' : 'ltr'} className="min-h-screen bg-neutral-50">
      {/* Top Bar */}
      <div className="bg-white shadow-md p-4 rounded-md ">
        <div className="max-w-8xl mx-auto flex items-center justify-between">
          <h1 className="text-2xl font-bold text-neutral-900">{t('leaves_management')}</h1>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-primary-600 hover:bg-primary-700 text-white">
                <Plus className="w-4 h-4 mr-2 rtl:mr-0 rtl:ml-2" />
                {t('add_new_leave')}
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>{t('new_leave_request')}</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <Select value={newLeaveType} onValueChange={setNewLeaveType}>
                  <SelectTrigger>
                    <SelectValue placeholder={t('select_type')} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="annual">{t('annual')}</SelectItem>
                    <SelectItem value="sick">{t('sick')}</SelectItem>
                    <SelectItem value="emergency">{t('emergency')}</SelectItem>
                  </SelectContent>
                </Select>
                <div className="flex space-x-4 rtl:space-x-reverse">
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="w-full justify-between">
                        {newStartDate ? format(newStartDate, 'PPP') : <span>{t('start_date')}</span>}
                        <CalendarIcon className="ml-2 rtl:ml-0 rtl:mr-2 h-4 w-4" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={newStartDate}
                        onSelect={setNewStartDate}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="w-full justify-between">
                        {newEndDate ? format(newEndDate, 'PPP') : <span>{t('end_date')}</span>}
                        <CalendarIcon className="ml-2 rtl:ml-0 rtl:mr-2 h-4 w-4" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={newEndDate}
                        onSelect={setNewEndDate}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                <Input
                  placeholder={t('notes')}
                  value={newNotes}
                  onChange={(e) => setNewNotes(e.target.value)}
                />
                <Button onClick={handleSubmitNewLeave} className="w-full bg-primary-600 hover:bg-primary-700 text-white">
                  {t('submit_request')}
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-8xl mx-auto py-6 space-y-6">
        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="bg-white shadow-sm">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <p className="text-sm text-neutral-500">{t('annual_total')}</p>
                <CalendarIcon className="w-4 h-4 text-primary-600" />
              </div>
              <p className="text-2xl font-bold">{summary.annualTotal}</p>
            </CardContent>
          </Card>
          <Card className="bg-white shadow-sm">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <p className="text-sm text-neutral-500">{t('used_days')}</p>
                <Clock className="w-4 h-4 text-primary-600" />
              </div>
              <p className="text-2xl font-bold">{summary.annualUsed}</p>
            </CardContent>
          </Card>
          <Card className="bg-white shadow-sm">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <p className="text-sm text-neutral-500">{t('remaining_days')}</p>
                <CheckCircle className="w-4 h-4 text-primary-600" />
              </div>
              <p className="text-2xl font-bold">{summary.annualRemaining}</p>
            </CardContent>
          </Card>
          <Card className="bg-white shadow-sm">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <p className="text-sm text-neutral-500">{t('sick_days')}</p>
                <AlertCircle className="w-4 h-4 text-primary-600" />
              </div>
              <p className="text-2xl font-bold">{summary.sickDays}</p>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 w-4 h-4 text-neutral-500 rtl:left-auto rtl:right-3" />
            <Input
              placeholder={t('search_notes')}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 rtl:pl-0 rtl:pr-10"
            />
          </div>
          <Select value={filterType} onValueChange={setFilterType}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder={t('filter_type')} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="annual">{t('annual')}</SelectItem>
              <SelectItem value="sick">{t('sick')}</SelectItem>
              <SelectItem value="emergency">{t('emergency')}</SelectItem>
            </SelectContent>
          </Select>
          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder={t('filter_status')} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="approved">{t('approved')}</SelectItem>
              <SelectItem value="pending">{t('pending')}</SelectItem>
              <SelectItem value="rejected">{t('rejected')}</SelectItem>
            </SelectContent>
          </Select>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="w-[240px] justify-between">
                <Filter className="mr-2 rtl:mr-0 rtl:ml-2 h-4 w-4" />
                {dateRange.from ? (
                  <>
                    {format(dateRange.from, 'LLL dd, y')} - {format(dateRange.to || dateRange.from, 'LLL dd, y')}
                  </>
                ) : (
                  <span>{t('filter_date')}</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                initialFocus
                mode="range"
                defaultMonth={dateRange.from}
                selected={{ from: dateRange.from, to: dateRange.to }}
                onSelect={setDateRange as any}
                numberOfMonths={2}
              />
            </PopoverContent>
          </Popover>
        </div>

        {/* Leaves Table */}
        <Card className="overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{t('request_id')}</TableHead>
                <TableHead>{t('type')}</TableHead>
                <TableHead>{t('start_date')}</TableHead>
                <TableHead>{t('end_date')}</TableHead>
                <TableHead>{t('days')}</TableHead>
                <TableHead>{t('status')}</TableHead>
                <TableHead>{t('actions')}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredLeaves.map((leave) => (
                <TableRow key={leave.id}>
                  <TableCell>{leave.id}</TableCell>
                  <TableCell className="flex items-center">
                    {getTypeIcon(leave.type)}
                    <span className="ml-2 rtl:ml-0 rtl:mr-2">{t(leave.type)}</span>
                  </TableCell>
                  <TableCell>{format(leave.startDate, 'PPP')}</TableCell>
                  <TableCell>{format(leave.endDate, 'PPP')}</TableCell>
                  <TableCell>{leave.days}</TableCell>
                  <TableCell>{getStatusBadge(leave.status)}</TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm">
                      {t('view_details')}
                    </Button>
                    {leave.status === 'pending' && (
                      <Button variant="ghost" size="sm" className="text-red-600">
                        {t('cancel')}
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      </div>
    </div>
  );
}