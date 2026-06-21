import { DollarSign, Users, TrendingUp, Package } from 'lucide-react';
import { PPTSlide } from '@/types';
import { SlideLayout } from './SlideLayout';

interface BusinessModelSlideProps {
  slide: PPTSlide;
  companyName?: string;
}

export const BusinessModelSlide = ({ slide, companyName }: BusinessModelSlideProps) => {
  const icons = [DollarSign, Users, TrendingUp, Package];

  return (
    <SlideLayout slide={slide} companyName={companyName}>
      <div className="h-full flex flex-col">
        <p className="text-gray-700 text-base leading-relaxed mb-6">{slide.content}</p>
        <div className="grid grid-cols-2 gap-4 flex-1">
          {slide.bulletPoints?.map((point, index) => {
            const Icon = icons[index % icons.length];
            return (
              <div
                key={index}
                className="p-5 bg-gradient-to-br from-primary-50 to-white rounded-2xl border border-primary-100 flex flex-col"
              >
                <div className="w-10 h-10 bg-primary-500 rounded-lg flex items-center justify-center mb-3">
                  <Icon className="w-5 h-5 text-white" />
                </div>
                <p className="text-sm font-semibold text-gray-900 mb-1">
                  {point.split('：')[0] || point.split(':')[0]}
                </p>
                <p className="text-xs text-gray-600">
                  {point.split('：')[1] || point.split(':')[1] || point}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </SlideLayout>
  );
};
