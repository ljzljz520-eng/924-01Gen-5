import { ReactNode } from 'react';
import { AlertTriangle } from 'lucide-react';
import { Badge } from '../ui/Badge';
import { ChartData } from '@/types';

interface ChartWrapperProps {
  chart: ChartData;
  children: ReactNode;
}

export const ChartWrapper = ({ chart, children }: ChartWrapperProps) => {
  return (
    <div className="relative h-full flex flex-col">
      {chart.isSampleData && (
        <div className="absolute top-2 right-2 z-10">
          <Badge variant="sample" className="flex items-center gap-1">
            <AlertTriangle className="w-3 h-3" />
            示例数据
          </Badge>
        </div>
      )}
      <h4 className="text-sm font-semibold text-gray-700 mb-2 text-center">{chart.title}</h4>
      <div className="flex-1">{children}</div>
    </div>
  );
};
