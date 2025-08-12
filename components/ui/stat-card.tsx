interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  trend?: {
    value: string;
    isPositive: boolean;
  };
  color?: 'primary' | 'secondary' | 'accent' | 'success' | 'warning' | 'error';
}

export const StatCard = ({ 
  title, 
  value, 
  icon, 
  trend, 
  color = 'primary' 
}: StatCardProps) => {
  const colorClasses = {
    primary: 'bg-primary-50 text-primary-600 border-primary-100',
    secondary: 'bg-secondary-50 text-secondary-600 border-secondary-100',
    accent: 'bg-accent-50 text-accent-600 border-accent-100',
    success: 'bg-success-50 text-success-600 border-success-100',
    warning: 'bg-warning-50 text-warning-600 border-warning-100',
    error: 'bg-error-50 text-error-600 border-error-100',
  };

  return (
    <div className="bg-white rounded-lg border border-neutral-200 p-6 card-shadow transition-all-smooth hover:card-shadow-lg">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-sm text-neutral-600 mb-1">{title}</p>
          <p className="text-3xl font-bold text-neutral-900">{value}</p>
          {trend && (
            <p className={`text-sm mt-2 ${
              trend.isPositive ? 'text-success-600' : 'text-error-600'
            }`}>
              {trend.isPositive ? '↑' : '↓'} {trend.value}
            </p>
          )}
        </div>
        <div className={`
          p-3 rounded-lg border-2 ${colorClasses[color]}
        `}>
          {icon}
        </div>
      </div>
    </div>
  );
};