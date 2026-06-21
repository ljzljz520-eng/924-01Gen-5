import { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle } from 'lucide-react';
import { PPTSlide } from '@/types';
import { Badge } from '../ui/Badge';

interface SlideLayoutProps {
  slide: PPTSlide;
  children: ReactNode;
  companyName?: string;
}

export const SlideLayout = ({ slide, children, companyName }: SlideLayoutProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 0.3 }}
      className="slide-container relative flex flex-col"
      id={`slide-${slide.id}`}
    >
      <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-primary-600 via-primary-500 to-accent-500" />

      <div className="flex-1 p-8 flex flex-col">
        <div className="flex items-start justify-between mb-6">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              {slide.hasSampleData && (
                <Badge variant="sample" className="flex items-center gap-1">
                  <AlertTriangle className="w-3 h-3" />
                  含示例数据
                </Badge>
              )}
            </div>
            <h1 className="text-3xl font-bold text-gray-900 font-display">{slide.title}</h1>
            {slide.subtitle && (
              <p className="text-lg text-gray-500 mt-2">{slide.subtitle}</p>
            )}
          </div>
          {companyName && (
            <div className="text-right">
              <p className="text-sm text-gray-400">{companyName}</p>
            </div>
          )}
        </div>

        <div className="flex-1">{children}</div>

        {slide.hasSampleData && slide.sampleDataNotes.length > 0 && (
          <div className="mt-4 p-3 bg-accent-50 rounded-lg border border-accent-200">
            <p className="text-xs text-accent-700 font-medium mb-1">⚠️ 示例数据说明：</p>
            <ul className="text-xs text-accent-600 space-y-0.5">
              {slide.sampleDataNotes.map((note, index) => (
                <li key={index}>• {note}</li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <div className="px-8 py-3 bg-gray-50 border-t border-gray-100 flex justify-between items-center">
        <p className="text-xs text-gray-400">
          路演素材工坊 · 请勿直接使用示例数据进行汇报
        </p>
        <p className="text-xs text-gray-400">
          {new Date().getFullYear()}
        </p>
      </div>
    </motion.div>
  );
};
