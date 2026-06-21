import {
  IndustryOption,
  FundingStageOption,
  PageTypeOption,
} from '@/types';

export const industryOptions: IndustryOption[] = [
  {
    value: 'tech',
    label: '科技/互联网',
    icon: 'Cpu',
    description: 'AI、SaaS、平台型产品等',
  },
  {
    value: 'consumer',
    label: '消费零售',
    icon: 'ShoppingBag',
    description: '品牌、电商、新零售等',
  },
  {
    value: 'healthcare',
    label: '医疗健康',
    icon: 'Heart',
    description: '医疗器械、医药、数字健康等',
  },
  {
    value: 'education',
    label: '教育培训',
    icon: 'GraduationCap',
    description: 'K12、职业教育、素质教育等',
  },
  {
    value: 'enterprise',
    label: '企业服务',
    icon: 'Building2',
    description: 'HR、CRM、协同办公等',
  },
  {
    value: 'finance',
    label: '金融科技',
    icon: 'DollarSign',
    description: '支付、信贷、财富管理等',
  },
  {
    value: 'other',
    label: '其他行业',
    icon: 'MoreHorizontal',
    description: '未归类的其他创业领域',
  },
];

export const fundingStageOptions: FundingStageOption[] = [
  {
    value: 'seed',
    label: '种子轮',
    description: '只有想法和团队，需要验证产品',
  },
  {
    value: 'angel',
    label: '天使轮',
    description: '已有产品原型，开始小规模验证',
  },
  {
    value: 'pre_a',
    label: 'Pre-A轮',
    description: '产品已上线，有初步数据验证',
  },
  {
    value: 'a_round',
    label: 'A轮',
    description: '商业模式得到验证，需要资金扩张',
  },
  {
    value: 'b_plus',
    label: 'B轮及以后',
    description: '业务快速增长，追求规模化盈利',
  },
];

export const pageTypeOptions: PageTypeOption[] = [
  {
    value: 'problem',
    label: '问题痛点',
    icon: 'AlertTriangle',
    description: '描述行业痛点和用户需求',
  },
  {
    value: 'solution',
    label: '解决方案',
    icon: 'Lightbulb',
    description: '产品如何解决上述问题',
  },
  {
    value: 'business_model',
    label: '商业模式',
    icon: 'LayoutGrid',
    description: '收入来源和盈利模式',
  },
  {
    value: 'market',
    label: '市场规模',
    icon: 'TrendingUp',
    description: '目标市场和增长潜力',
  },
  {
    value: 'team',
    label: '团队介绍',
    icon: 'Users',
    description: '核心团队背景和优势',
  },
  {
    value: 'traction',
    label: '运营数据',
    icon: 'Activity',
    description: '关键业务指标和增长趋势',
  },
  {
    value: 'financial',
    label: '财务预测',
    icon: 'PieChart',
    description: '营收预测和资金需求',
  },
  {
    value: 'competition',
    label: '竞争格局',
    icon: 'Swords',
    description: '竞品分析和差异化优势',
  },
];
