import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import { PPTSlide } from '@/types';

export const exportToPDF = async (slides: PPTSlide[], companyName?: string): Promise<void> => {
  const pdf = new jsPDF('l', 'mm', 'a4');
  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();

  for (let i = 0; i < slides.length; i++) {
    const slide = slides[i];
    const slideElement = document.getElementById(`export-slide-${slide.id}`)?.firstElementChild as HTMLElement;

    if (!slideElement) {
      console.warn(`Slide element not found for slide ${slide.id}`);
      continue;
    }

    try {
      const canvas = await html2canvas(slideElement, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#ffffff',
        logging: false,
      });

      const imgData = canvas.toDataURL('image/png');

      if (i > 0) {
        pdf.addPage();
      }

      const imgWidth = pageWidth;
      const imgHeight = (canvas.height * pageWidth) / canvas.width;
      const yOffset = (pageHeight - imgHeight) / 2;

      pdf.addImage(imgData, 'PNG', 0, yOffset, imgWidth, imgHeight);
    } catch (error) {
      console.error(`Error capturing slide ${i + 1}:`, error);
    }
  }

  const timestamp = new Date().toISOString().slice(0, 10);
  const fileName = companyName
    ? `${companyName}_路演PPT_${timestamp}.pdf`
    : `路演PPT_${timestamp}.pdf`;

  pdf.save(fileName);
};
