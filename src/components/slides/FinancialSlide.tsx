import { PPTSlide } from '@/types';
import { SlideLayout } from './SlideLayout';
import { ChartRenderer } from '../charts/ChartRenderer';

interface FinancialSlideProps {
  slide: PPTSlide;
  companyName?: string;
}

export const FinancialSlide = ({ slide, companyName }: FinancialSlideProps) => {
  return (
    <SlideLayout slide={slide} companyName={companyName}>
      <div className="h-full flex flex-col">
        <p className="text-gray-700 text-base leading-relaxed mb-4">{slide.content}</p>
        <div className="grid grid-cols-2 gap-4 flex-1">
          {slide.charts?.slice(0, 2).map((chart) => (
            <div key={chart.id} className="bg-gray-50 rounded-2xl p-4">
              <ChartRenderer chart={chart} />
            </div>
          ))}
        </div>
        {slide.bulletPoints && slide.bulletPoints.length > 0 && (
          <div className="mt-4 flex gap-4">
            {slide.bulletPoints.map((point, index) => (
              <div
                key={index}
                className="flex-1 p-3 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border border-green-100"
              >
                <p className="text-xs text-gray-700">{point}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </SlideLayout>
  );
};
