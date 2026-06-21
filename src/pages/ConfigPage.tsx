import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  Cpu,
  ShoppingBag,
  Heart,
  GraduationCap,
  Building2,
  DollarSign,
  MoreHorizontal,
  AlertTriangle,
  Lightbulb,
  LayoutGrid,
  TrendingUp,
  Users,
  Activity,
  PieChart,
  Swords,
  ChevronRight,
  Sparkles,
} from 'lucide-react';
import { useAppStore } from '@/store/appStore';
import { industryOptions, fundingStageOptions, pageTypeOptions } from '@/data/options';
import { SelectionCard } from '@/components/ui/SelectionCard';
import { Button } from '@/components/ui/Button';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { Industry, FundingStage, PageType } from '@/types';

const iconComponents: Record<string, React.ElementType> = {
  Cpu,
  ShoppingBag,
  Heart,
  GraduationCap,
  Building2,
  DollarSign,
  MoreHorizontal,
  AlertTriangle,
  Lightbulb,
  LayoutGrid,
  TrendingUp,
  Users,
  Activity,
  PieChart,
  Swords,
};

const ConfigPage = () => {
  const navigate = useNavigate();
  const {
    userConfig,
    setUserConfig,
    togglePageType,
    generateSlidesFromConfig,
    isGenerating,
  } = useAppStore();

  const handleIndustrySelect = (industry: Industry) => {
    setUserConfig({ industry });
  };

  const handleFundingStageSelect = (fundingStage: FundingStage) => {
    setUserConfig({ fundingStage });
  };

  const handleGenerate = () => {
    generateSlidesFromConfig();
    setTimeout(() => {
      navigate('/preview');
    }, 600);
  };

  const canGenerate =
    userConfig?.industry &&
    userConfig?.fundingStage &&
    userConfig?.selectedPageTypes &&
    userConfig.selectedPageTypes.length > 0;

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 bg-primary-100 text-primary-700 px-4 py-2 rounded-full mb-4">
            <Sparkles className="w-4 h-4" />
            <span className="text-sm font-medium">智能路演素材生成器</span>
          </div>
          <h1 className="text-5xl font-bold text-gray-900 mb-4 font-display">
            <span className="gradient-text">PPT 路演素材工坊</span>
          </h1>
          <p className="text-xl text-gray-500 max-w-2xl mx-auto">
            选择您的行业、融资阶段和需要的页面类型，一键生成专业的路演PPT模板
          </p>
        </motion.div>

        <div className="space-y-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-primary-500 rounded-xl flex items-center justify-center text-white font-bold">
                1
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">选择行业</h2>
                <p className="text-gray-500">请选择您的创业项目所属行业</p>
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {industryOptions.map((option) => {
                const Icon = iconComponents[option.icon];
                return (
                  <SelectionCard
                    key={option.value}
                    icon={<Icon className="w-7 h-7" />}
                    title={option.label}
                    description={option.description}
                    selected={userConfig?.industry === option.value}
                    onClick={() => handleIndustrySelect(option.value)}
                  />
                );
              })}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-primary-500 rounded-xl flex items-center justify-center text-white font-bold">
                2
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">选择融资阶段</h2>
                <p className="text-gray-500">请选择您当前的融资阶段</p>
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {fundingStageOptions.map((option) => (
                <SelectionCard
                  key={option.value}
                  title={option.label}
                  description={option.description}
                  selected={userConfig?.fundingStage === option.value}
                  onClick={() => handleFundingStageSelect(option.value)}
                />
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-primary-500 rounded-xl flex items-center justify-center text-white font-bold">
                3
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">选择页面类型</h2>
                <p className="text-gray-500">请选择您需要的PPT页面（可多选）</p>
              </div>
              {userConfig?.selectedPageTypes && (
                <span className="ml-4 bg-primary-100 text-primary-700 text-sm font-bold px-3 py-1 rounded-full">
                  已选 {userConfig.selectedPageTypes.length} 页
                </span>
              )}
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {pageTypeOptions.map((option) => {
                const Icon = iconComponents[option.icon];
                return (
                  <SelectionCard
                    key={option.value}
                    icon={<Icon className="w-6 h-6" />}
                    title={option.label}
                    description={option.description}
                    selected={userConfig?.selectedPageTypes?.includes(option.value as PageType) || false}
                    onClick={() => togglePageType(option.value as PageType)}
                  />
                );
              })}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex justify-center pt-8 pb-12"
          >
            <Button
              size="lg"
              disabled={!canGenerate || isGenerating}
              onClick={handleGenerate}
              className="flex items-center gap-2 text-lg"
            >
              {isGenerating ? (
                <>
                  <LoadingSpinner size="sm" className="text-white" />
                  生成中...
                </>
              ) : (
                <>
                  生成 PPT 模板
                  <ChevronRight className="w-5 h-5" />
                </>
              )}
            </Button>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ConfigPage;
