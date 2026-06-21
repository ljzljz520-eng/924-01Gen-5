import {
  Cpu,
  ShoppingBag,
  Heart,
  GraduationCap,
  Building2,
  DollarSign,
  MoreHorizontal,
  AlertTriangle,
  Lightbulb,
  LayoutGrid,
  TrendingUp,
  Users,
  Activity,
  PieChart,
  Swords,
  LucideIcon,
} from 'lucide-react';

const iconMap: Record<string, LucideIcon> = {
  Cpu,
  ShoppingBag,
  Heart,
  GraduationCap,
  Building2,
  DollarSign,
  MoreHorizontal,
  AlertTriangle,
  Lightbulb,
  LayoutGrid,
  TrendingUp,
  Users,
  Activity,
  PieChart,
  Swords,
};

interface IconMapperProps {
  name: string;
  className?: string;
}

export const IconMapper = ({ name, className }: IconMapperProps) => {
  const Icon = iconMap[name] || MoreHorizontal;
  return <Icon className={className} />;
};
