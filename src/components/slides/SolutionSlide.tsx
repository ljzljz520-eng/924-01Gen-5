import { Lightbulb, CheckCircle } from 'lucide-react';
import { PPTSlide } from '@/types';
import { SlideLayout } from './SlideLayout';

interface SolutionSlideProps {
  slide: PPTSlide;
  companyName?: string;
}

export const SolutionSlide = ({ slide, companyName }: SolutionSlideProps) => {
  return (
    <SlideLayout slide={slide} companyName={companyName}>
      <div className="grid grid-cols-2 gap-8 h-full">
        <div className="flex items-center justify-center">
          <div className="w-48 h-48 bg-gradient-to-br from-primary-500 to-primary-700 rounded-3xl flex items-center justify-center shadow-2xl">
            <Lightbulb className="w-24 h-24 text-white" />
          </div>
        </div>
        <div className="space-y-4">
          <p className="text-gray-700 text-base leading-relaxed mb-4">{slide.content}</p>
          {slide.bulletPoints?.map((point, index) => (
            <div key={index} className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
              <p className="text-gray-700 text-sm">{point}</p>
            </div>
          ))}
        </div>
      </div>
    </SlideLayout>
  );
};
