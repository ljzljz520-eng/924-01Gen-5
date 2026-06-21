import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  AlertTriangle,
  Download,
  FileWarning,
  CheckCircle2,
  FileText,
} from 'lucide-react';
import { useAppStore } from '@/store/appStore';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { getSampleDataSummary } from '@/data/templates';
import { PPTSlide } from '@/types';

interface ExportModalProps {
  onExport: () => Promise<void>;
}

export const ExportModal = ({ onExport }: ExportModalProps) => {
  const { slides, exportModalOpen, setExportModalOpen, userConfig } = useAppStore();
  const [isExporting, setIsExporting] = useState(false);
  const [exportComplete, setExportComplete] = useState(false);

  const sampleDataSlides = slides.filter((s) => s.hasSampleData);
  const sampleDataSummary = getSampleDataSummary(slides);

  const handleClose = () => {
    if (!isExporting) {
      setExportModalOpen(false);
      setExportComplete(false);
    }
  };

  const handleExport = async () => {
    setIsExporting(true);
    try {
      await onExport();
      setExportComplete(true);
    } catch (error) {
      console.error('Export failed:', error);
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <AnimatePresence>
      {exportModalOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            onClick={handleClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <div
              className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {!exportComplete ? (
                <>
                  <div className="bg-gradient-to-r from-accent-500 to-accent-600 px-6 py-5 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                        <FileWarning className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h2 className="text-xl font-bold text-white">导出前请确认</h2>
                        <p className="text-accent-100 text-sm">示例数据提醒</p>
                      </div>
                    </div>
                    <button
                      onClick={handleClose}
                      className="p-2 text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                      disabled={isExporting}
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  <div className="p-6 max-h-[60vh] overflow-y-auto">
                    <div className="mb-6 p-4 bg-accent-50 rounded-2xl border border-accent-200">
                      <div className="flex items-start gap-3">
                        <AlertTriangle className="w-6 h-6 text-accent-500 flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="font-semibold text-accent-800 mb-1">
                            重要提醒：以下页面包含示例数据
                          </p>
                          <p className="text-sm text-accent-700">
                            请务必在导出后替换为您的真实数据，切勿直接使用示例数据进行路演汇报。
                          </p>
                        </div>
                      </div>
                    </div>

                    {sampleDataSlides.length > 0 ? (
                      <div className="space-y-3">
                        <p className="text-sm font-semibold text-gray-700 mb-3">
                          含示例数据的页面（共 {sampleDataSlides.length} 页）：
                        </p>
                        {sampleDataSlides.map((slide, index) => (
                          <div
                            key={slide.id}
                            className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl border border-gray-100"
                          >
                            <div className="w-8 h-8 bg-accent-100 rounded-lg flex items-center justify-center flex-shrink-0">
                              <span className="text-sm font-bold text-accent-600">
                                {slides.findIndex((s) => s.id === slide.id) + 1}
                              </span>
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <p className="font-medium text-gray-900">{slide.title}</p>
                                <Badge variant="sample">示例数据</Badge>
                              </div>
                              <ul className="text-xs text-gray-500 space-y-0.5">
                                {slide.sampleDataNotes.map((note, i) => (
                                  <li key={i}>• {note}</li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8 text-gray-500">
                        <CheckCircle2 className="w-12 h-12 mx-auto mb-2 text-green-500" />
                        <p className="font-medium text-gray-700">太棒了！</p>
                        <p className="text-sm">当前选择的页面均不包含示例数据</p>
                      </div>
                    )}

                    {sampleDataSummary.totalSampleDataSlides > 0 && (
                      <div className="mt-6 p-4 bg-blue-50 rounded-xl border border-blue-200">
                        <p className="text-sm text-blue-800">
                          <span className="font-semibold">汇总：</span>
                          共 {sampleDataSummary.totalSampleDataSlides} 个页面包含示例数据，
                          总页数 {sampleDataSummary.totalSlides} 页。
                        </p>
                      </div>
                    )}

                    <div className="mt-6 p-4 bg-yellow-50 rounded-xl border border-yellow-200">
                      <div className="flex items-start gap-3">
                        <FileText className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="font-medium text-yellow-800 text-sm mb-1">导出说明</p>
                          <ul className="text-xs text-yellow-700 space-y-1">
                            <li>• 导出格式为 PDF，每页 PPT 对应 PDF 中的一页</li>
                            <li>• 导出内容包含当前所有页面的最新修改</li>
                            <li>• 评论内容不会包含在导出文件中</li>
                            <li>• 建议导出后检查所有数据是否已替换为真实数据</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex justify-end gap-3">
                    <Button
                      variant="secondary"
                      onClick={handleClose}
                      disabled={isExporting}
                    >
                      取消
                    </Button>
                    <Button
                      variant="accent"
                      onClick={handleExport}
                      disabled={isExporting}
                      className="flex items-center gap-2"
                    >
                      <Download className="w-4 h-4" />
                      {isExporting ? '导出中...' : '确认导出'}
                    </Button>
                  </div>
                </>
              ) : (
                <div className="p-8 text-center">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', delay: 0.1 }}
                    className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4"
                  >
                    <CheckCircle2 className="w-10 h-10 text-green-500" />
                  </motion.div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">导出成功！</h3>
                  <p className="text-gray-500 mb-6">
                    您的 PPT 模板已成功导出为 PDF 文件。
                    <br />
                    请记得替换所有示例数据为您的真实数据。
                  </p>
                  <div className="flex justify-center gap-3">
                    <Button variant="secondary" onClick={handleClose}>
                      关闭
                    </Button>
                    <Button
                      variant="primary"
                      onClick={() => {
                        setExportComplete(false);
                        handleExport();
                      }}
                      className="flex items-center gap-2"
                    >
                      <Download className="w-4 h-4" />
                      重新导出
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
