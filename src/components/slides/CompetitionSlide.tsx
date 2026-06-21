import { Swords, Star } from 'lucide-react';
import { PPTSlide } from '@/types';
import { SlideLayout } from './SlideLayout';

interface CompetitionSlideProps {
  slide: PPTSlide;
  companyName?: string;
}

export const CompetitionSlide = ({ slide, companyName }: CompetitionSlideProps) => {
  return (
    <SlideLayout slide={slide} companyName={companyName}>
      <div className="grid grid-cols-2 gap-8 h-full">
        <div className="flex flex-col justify-center space-y-4">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-accent-500 to-accent-600 rounded-xl flex items-center justify-center">
              <Swords className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-bold text-gray-900">竞争优势</h3>
          </div>
          {slide.bulletPoints?.map((point, index) => (
            <div key={index} className="flex items-start gap-3">
              <Star className="w-5 h-5 text-accent-500 flex-shrink-0 mt-0.5" />
              <p className="text-gray-700 text-sm">{point}</p>
            </div>
          ))}
        </div>
        <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-6 border border-gray-100">
          <h4 className="text-lg font-semibold text-gray-900 mb-4">竞争格局分析</h4>
          <p className="text-gray-600 text-sm leading-relaxed">{slide.content}</p>
          <div className="mt-6 grid grid-cols-2 gap-3">
            <div className="p-3 bg-white rounded-lg border border-gray-200">
              <p className="text-xs text-gray-500">直接竞品</p>
              <p className="text-sm font-semibold text-gray-900 mt-1">2-3家头部公司</p>
            </div>
            <div className="p-3 bg-primary-50 rounded-lg border border-primary-200">
              <p className="text-xs text-primary-600">我们的定位</p>
              <p className="text-sm font-semibold text-primary-700 mt-1">差异化创新</p>
            </div>
          </div>
        </div>
      </div>
    </SlideLayout>
  );
};
