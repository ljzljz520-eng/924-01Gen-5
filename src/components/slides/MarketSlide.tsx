import { PPTSlide } from '@/types';
import { SlideLayout } from './SlideLayout';
import { ChartRenderer } from '../charts/ChartRenderer';

interface MarketSlideProps {
  slide: PPTSlide;
  companyName?: string;
}

export const MarketSlide = ({ slide, companyName }: MarketSlideProps) => {
  return (
    <SlideLayout slide={slide} companyName={companyName}>
      <div className="grid grid-cols-2 gap-8 h-full">
        <div className="flex flex-col justify-center space-y-4">
          <p className="text-gray-700 text-base leading-relaxed">{slide.content}</p>
          {slide.bulletPoints?.map((point, index) => (
            <div key={index} className="flex items-start gap-3">
              <div className="w-6 h-6 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-xs font-bold text-primary-600">{index + 1}</span>
              </div>
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
