import { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SelectionCardProps {
  icon?: ReactNode;
  title: string;
  description: string;
  selected: boolean;
  onClick: () => void;
  disabled?: boolean;
  className?: string;
}

export const SelectionCard = ({
  icon,
  title,
  description,
  selected,
  onClick,
  disabled = false,
  className,
}: SelectionCardProps) => {
  return (
    <motion.div
      whileHover={!disabled ? { y: -4, scale: 1.02 } : {}}
      whileTap={!disabled ? { scale: 0.98 } : {}}
      onClick={!disabled ? onClick : undefined}
      className={cn(
        'relative p-6 rounded-2xl border-2 transition-all duration-300 cursor-pointer',
        selected
          ? 'border-primary-500 bg-primary-50 shadow-xl'
          : 'border-gray-200 bg-white hover:border-primary-300 hover:shadow-lg',
        disabled && 'opacity-50 cursor-not-allowed',
        className
      )}
    >
      {selected && (
        <div className="absolute top-4 right-4 w-6 h-6 bg-primary-500 rounded-full flex items-center justify-center">
          <Check className="w-4 h-4 text-white" />
        </div>
      )}

      {icon && (
        <div
          className={cn(
            'w-14 h-14 rounded-xl flex items-center justify-center mb-4',
            selected ? 'bg-primary-500 text-white' : 'bg-gray-100 text-primary-600'
          )}
        >
          {icon}
        </div>
      )}

      <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-sm text-gray-500">{description}</p>
    </motion.div>
  );
};
