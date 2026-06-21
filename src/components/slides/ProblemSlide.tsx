import { AlertTriangle } from 'lucide-react';
import { PPTSlide } from '@/types';
import { SlideLayout } from './SlideLayout';

interface ProblemSlideProps {
  slide: PPTSlide;
  companyName?: string;
}

export const ProblemSlide = ({ slide, companyName }: ProblemSlideProps) => {
  return (
    <SlideLayout slide={slide} companyName={companyName}>
      <div className="grid grid-cols-2 gap-8 h-full">
        <div className="flex flex-col justify-center">
          <p className="text-gray-700 text-base leading-relaxed mb-6">{slide.content}</p>
        </div>
        <div className="space-y-4">
          {slide.bulletPoints?.map((point, index) => (
            <div
              key={index}
              className="flex items-start gap-4 p-4 bg-gradient-to-r from-red-50 to-orange-50 rounded-xl border border-red-100"
            >
              <div className="w-10 h-10 bg-red-500 rounded-lg flex items-center justify-center flex-shrink-0">
                <AlertTriangle className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="font-semibold text-gray-900 text-sm">痛点 {index + 1}</p>
                <p className="text-gray-600 text-sm mt-1">{point}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </SlideLayout>
  );
};
