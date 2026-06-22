import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import {
  ChevronLeft,
  ChevronRight,
  Download,
  ArrowLeft,
  MessageCircle,
  AlertTriangle,
  Grid,
} from 'lucide-react';
import { useAppStore } from '@/store/appStore';
import { SlideRenderer } from '@/components/slides/SlideRenderer';
import { CommentPanel } from '@/components/comments/CommentPanel';
import { ExportModal } from '@/components/export/ExportModal';
import { ExportSlidesRenderer } from '@/components/export/ExportSlidesRenderer';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { getSampleDataSummary } from '@/data/templates';
import { exportToPDF } from '@/utils/exportPPT';

const PreviewPage = () => {
  const navigate = useNavigate();
  const {
    slides,
    currentSlideIndex,
    setCurrentSlideIndex,
    addComment,
    deleteComment,
    userConfig,
    setExportModalOpen,
    getSampleDataSlides,
  } = useAppStore();

  const [showComments, setShowComments] = useState(true);
  const [showThumbnails, setShowThumbnails] = useState(false);

  useEffect(() => {
    if (slides.length === 0) {
      navigate('/');
    }
  }, [slides, navigate]);

  if (slides.length === 0) {
    return null;
  }

  const currentSlide = slides[currentSlideIndex];
  const sampleDataSlides = getSampleDataSlides();
  const sampleDataSummary = getSampleDataSummary(slides);

  const goToPrev = () => {
    if (currentSlideIndex > 0) {
      setCurrentSlideIndex(currentSlideIndex - 1);
    }
  };

  const goToNext = () => {
    if (currentSlideIndex < slides.length - 1) {
      setCurrentSlideIndex(currentSlideIndex + 1);
    }
  };

  const handleAddComment = (author: string, content: string) => {
    addComment(currentSlide.id, author, content);
  };

  const handleDeleteComment = (commentId: string) => {
    deleteComment(currentSlide.id, commentId);
  };

  const handleExport = () => {
    setExportModalOpen(true);
  };

  const doExport = async () => {
    await exportToPDF(slides, userConfig?.companyName);
  };

  return (
    <div className="h-screen flex flex-col bg-gray-100">
      <div className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate('/')}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            返回配置
          </Button>
          <div className="h-6 w-px bg-gray-200" />
          <div>
            <h1 className="text-lg font-bold text-gray-900">PPT 模板预览</h1>
            <p className="text-xs text-gray-500">
              共 {slides.length} 页 · {sampleDataSlides.length} 页含示例数据
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowThumbnails(!showThumbnails)}
            className="flex items-center gap-2"
          >
            <Grid className="w-4 h-4" />
            缩略图
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowComments(!showComments)}
            className="flex items-center gap-2"
          >
            <MessageCircle className="w-4 h-4" />
            评论
            {currentSlide.comments.length > 0 && (
              <span className="bg-primary-500 text-white text-xs px-1.5 py-0.5 rounded-full">
                {currentSlide.comments.length}
              </span>
            )}
          </Button>
          <div className="h-6 w-px bg-gray-200" />
          <div className="flex flex-col items-end">
            <Button
              variant="accent"
              size="sm"
              onClick={handleExport}
              className="flex items-center gap-2"
            >
              <Download className="w-4 h-4" />
              导出 PDF
            </Button>
            <span className="text-xs text-gray-400 mt-1">PPT模板导出为PDF格式</span>
          </div>
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden">
        {showThumbnails && (
          <div className="w-48 bg-white border-r border-gray-200 p-3 overflow-y-auto space-y-2">
            <p className="text-xs font-semibold text-gray-500 uppercase mb-2">页面列表</p>
            {slides.map((slide, index) => (
              <div
                key={slide.id}
                onClick={() => setCurrentSlideIndex(index)}
                className={`p-2 rounded-lg cursor-pointer transition-all ${
                  index === currentSlideIndex
                    ? 'bg-primary-100 border-2 border-primary-500'
                    : 'bg-gray-50 border-2 border-transparent hover:bg-gray-100'
                }`}
              >
                <div className="flex items-start justify-between mb-1">
                  <span className="text-xs font-bold text-gray-500">{index + 1}</span>
                  {slide.hasSampleData && (
                    <AlertTriangle className="w-3 h-3 text-accent-500" />
                  )}
                </div>
                <p className="text-xs font-medium text-gray-700 truncate">{slide.title}</p>
              </div>
            ))}
          </div>
        )}

        <div className="flex-1 flex flex-col">
          <div className="flex-1 flex items-center justify-center p-8 overflow-auto">
            <div className="w-full max-w-5xl">
              <AnimatePresence mode="wait">
                <SlideRenderer
                  key={currentSlide.id}
                  slide={currentSlide}
                  companyName={userConfig?.companyName}
                />
              </AnimatePresence>
            </div>
          </div>

          <div className="bg-white border-t border-gray-200 px-6 py-4 flex items-center justify-between">
            <Button
              variant="secondary"
              size="sm"
              onClick={goToPrev}
              disabled={currentSlideIndex === 0}
              className="flex items-center gap-2"
            >
              <ChevronLeft className="w-4 h-4" />
              上一页
            </Button>

            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600">
                {currentSlideIndex + 1} / {slides.length}
              </span>
              {currentSlide.hasSampleData && (
                <Badge variant="sample" className="flex items-center gap-1">
                  <AlertTriangle className="w-3 h-3" />
                  此页包含示例数据
                </Badge>
              )}
            </div>

            <Button
              variant="secondary"
              size="sm"
              onClick={goToNext}
              disabled={currentSlideIndex === slides.length - 1}
              className="flex items-center gap-2"
            >
              下一页
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {showComments && (
          <CommentPanel
            slideId={currentSlide.id}
            comments={currentSlide.comments}
            onAddComment={handleAddComment}
            onDeleteComment={handleDeleteComment}
          />
        )}
      </div>

      <ExportModal onExport={doExport} />
      <ExportSlidesRenderer slides={slides} companyName={userConfig?.companyName} />
    </div>
  );
};

export default PreviewPage;
