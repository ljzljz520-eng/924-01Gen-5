import { PPTSlide } from '@/types';
import { SlideLayout } from './SlideLayout';
import { ChartRenderer } from '../charts/ChartRenderer';

interface TractionSlideProps {
  slide: PPTSlide;
  companyName?: string;
}

export const TractionSlide = ({ slide, companyName }: TractionSlideProps) => {
  return (
    <SlideLayout slide={slide} companyName={companyName}>
      <div className="grid grid-cols-2 gap-8 h-full">
        <div className="flex flex-col justify-center space-y-4">
          <p className="text-gray-700 text-base leading-relaxed">{slide.content}</p>
          {slide.bulletPoints?.map((point, index) => (
            <div key={index} className="flex items-center gap-3">
              <div className="w-3 h-3 bg-green-500 rounded-full flex-shrink-0" />
              <p className="text-gray-600 text-sm">{point}</p>
            </div>
          ))}
        </div>
        <div className="bg-gray-50 rounded-2xl p-4">
          {slide.charts && slide.charts.length > 0 && (
            <ChartRenderer chart={slide.charts[0]} />
          )}
        </div>
      </div>
    </SlideLayout>
  );
};
