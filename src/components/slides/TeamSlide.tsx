import { User } from 'lucide-react';
import { PPTSlide } from '@/types';
import { SlideLayout } from './SlideLayout';

interface TeamSlideProps {
  slide: PPTSlide;
  companyName?: string;
}

export const TeamSlide = ({ slide, companyName }: TeamSlideProps) => {
  const teamMembers = slide.bulletPoints?.map((point) => {
    const parts = point.split('：');
    return {
      name: parts[0] || '创始人',
      role: parts[1]?.split('，')[0] || 'CEO',
      background: parts[1]?.split('，')[1] || '',
    };
  }) || [];

  return (
    <SlideLayout slide={slide} companyName={companyName}>
      <div className="h-full flex flex-col">
        <p className="text-gray-700 text-base leading-relaxed mb-6">{slide.content}</p>
        <div className="grid grid-cols-3 gap-4 flex-1">
          {teamMembers.slice(0, 6).map((member, index) => (
            <div
              key={index}
              className="flex flex-col items-center p-4 bg-gradient-to-b from-gray-50 to-white rounded-2xl border border-gray-100"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-primary-400 to-primary-600 rounded-full flex items-center justify-center mb-3 shadow-lg">
                <User className="w-8 h-8 text-white" />
              </div>
              <p className="font-bold text-gray-900 text-sm">{member.name}</p>
              <p className="text-primary-600 text-xs font-medium mb-1">{member.role}</p>
              <p className="text-gray-500 text-xs text-center">{member.background}</p>
            </div>
          ))}
        </div>
      </div>
    </SlideLayout>
  );
};
