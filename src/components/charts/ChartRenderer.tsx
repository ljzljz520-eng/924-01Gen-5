import { ChartData } from '@/types';
import { LineChartComponent } from './LineChartComponent';
import { BarChartComponent } from './BarChartComponent';
import { PieChartComponent } from './PieChartComponent';
import { AreaChartComponent } from './AreaChartComponent';

interface ChartRendererProps {
  chart: ChartData;
}

export const ChartRenderer = ({ chart }: ChartRendererProps) => {
  switch (chart.type) {
    case 'line':
      return <LineChartComponent chart={chart} />;
    case 'bar':
      return <BarChartComponent chart={chart} />;
    case 'pie':
      return <PieChartComponent chart={chart} />;
    case 'area':
      return <AreaChartComponent chart={chart} />;
    default:
      return <BarChartComponent chart={chart} />;
  }
};
