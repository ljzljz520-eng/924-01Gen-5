import { PPTSlide } from '@/types';
import { SlideRenderer } from '../slides/SlideRenderer';

interface ExportSlidesRendererProps {
  slides: PPTSlide[];
  companyName?: string;
}

export const ExportSlidesRenderer = ({ slides, companyName }: ExportSlidesRendererProps) => {
  return (
    <div
      id="export-slides-container"
      style={{
        position: 'fixed',
        left: '-99999px',
        top: 0,
        width: '1280px',
        pointerEvents: 'none',
        opacity: 0,
        zIndex: -1,
      }}
    >
      {slides.map((slide) => (
        <div
          key={slide.id}
          id={`export-slide-${slide.id}`}
          style={{ marginBottom: '20px' }}
        >
          <SlideRenderer slide={slide} companyName={companyName} />
        </div>
      ))}
    </div>
  );
};
