import { PPTSlide } from '@/types';
import { ProblemSlide } from './ProblemSlide';
import { SolutionSlide } from './SolutionSlide';
import { BusinessModelSlide } from './BusinessModelSlide';
import { MarketSlide } from './MarketSlide';
import { TeamSlide } from './TeamSlide';
import { TractionSlide } from './TractionSlide';
import { FinancialSlide } from './FinancialSlide';
import { CompetitionSlide } from './CompetitionSlide';

interface SlideRendererProps {
  slide: PPTSlide;
  companyName?: string;
}

export const SlideRenderer = ({ slide, companyName }: SlideRendererProps) => {
  switch (slide.type) {
    case 'problem':
      return <ProblemSlide slide={slide} companyName={companyName} />;
    case 'solution':
      return <SolutionSlide slide={slide} companyName={companyName} />;
    case 'business_model':
      return <BusinessModelSlide slide={slide} companyName={companyName} />;
    case 'market':
      return <MarketSlide slide={slide} companyName={companyName} />;
    case 'team':
      return <TeamSlide slide={slide} companyName={companyName} />;
    case 'traction':
      return <TractionSlide slide={slide} companyName={companyName} />;
    case 'financial':
      return <FinancialSlide slide={slide} companyName={companyName} />;
    case 'competition':
      return <CompetitionSlide slide={slide} companyName={companyName} />;
    default:
      return <ProblemSlide slide={slide} companyName={companyName} />;
  }
};
