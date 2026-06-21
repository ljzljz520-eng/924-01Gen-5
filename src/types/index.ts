export type Industry =
  | 'tech'
  | 'consumer'
  | 'healthcare'
  | 'education'
  | 'enterprise'
  | 'finance'
  | 'other';

export type FundingStage = 'seed' | 'angel' | 'pre_a' | 'a_round' | 'b_plus';

export type PageType =
  | 'problem'
  | 'solution'
  | 'business_model'
  | 'market'
  | 'team'
  | 'financial'
  | 'traction'
  | 'competition';

export interface UserConfig {
  industry: Industry;
  fundingStage: FundingStage;
  selectedPageTypes: PageType[];
  companyName?: string;
}

export interface Comment {
  id: string;
  pageId: string;
  author: string;
  content: string;
  timestamp: string;
}

export interface ChartDataPoint {
  label: string;
  value: number;
}

export interface ChartData {
  id: string;
  pageId: string;
  type: 'line' | 'bar' | 'pie' | 'area';
  isSampleData: boolean;
  title: string;
  data: ChartDataPoint[];
}

export interface PPTSlide {
  id: string;
  type: PageType;
  title: string;
  subtitle?: string;
  content: string;
  bulletPoints?: string[];
  charts?: ChartData[];
  hasSampleData: boolean;
  sampleDataNotes: string[];
  comments: Comment[];
}

export interface IndustryOption {
  value: Industry;
  label: string;
  icon: string;
  description: string;
}

export interface FundingStageOption {
  value: FundingStage;
  label: string;
  description: string;
}

export interface PageTypeOption {
  value: PageType;
  label: string;
  icon: string;
  description: string;
}
