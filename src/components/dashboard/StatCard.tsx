
import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

interface StatCardProps {
  title: string;
  value: string | number;
  change?: number;
  icon: LucideIcon;
  iconColor?: string;
  className?: string;
  trend?: 'up' | 'down' | 'neutral';
  isLoading?: boolean;
}

const StatCard = ({
  title,
  value,
  change,
  icon: Icon,
  iconColor,
  className,
  trend = 'neutral',
  isLoading = false,
}: StatCardProps) => {
  const trendColorMap = {
    up: 'text-green-600',
    down: 'text-red-600',
    neutral: 'text-muted-foreground',
  };

  if (isLoading) {
    return (
      <Card className={cn("overflow-hidden transition-all", className)}>
        <CardContent className="p-6">
          <div className="flex justify-between items-start">
            <div className="space-y-2">
              <Skeleton className="h-5 w-24" />
              <Skeleton className="h-8 w-16" />
              <Skeleton className="h-4 w-20" />
            </div>
            <Skeleton className="h-10 w-10 rounded-full" />
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={cn("overflow-hidden transition-all hover:shadow-md", className)}>
      <CardContent className="p-6">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <h3 className="text-2xl font-bold mt-1">{value}</h3>
            {typeof change !== 'undefined' && (
              <p className={cn('text-xs font-medium flex items-center mt-1.5', trendColorMap[trend])}>
                <span>
                  {change > 0 ? '+' : ''}
                  {change}% em relação ao mês anterior
                </span>
              </p>
            )}
          </div>
          <div className={cn(
            'p-2 rounded-full',
            iconColor ? `bg-${iconColor}-100 text-${iconColor}-600` : 'bg-mvura-100 text-mvura-600'
          )}>
            <Icon className="h-6 w-6" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default StatCard;
