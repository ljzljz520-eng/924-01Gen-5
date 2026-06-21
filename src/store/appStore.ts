import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Industry, FundingStage, PageType, UserConfig, PPTSlide, Comment } from '../types';
import { generateSlides, getSampleDataSummary } from '../data/templates';

interface AppState {
  userConfig: UserConfig | null;
  slides: PPTSlide[];
  currentSlideIndex: number;
  isGenerating: boolean;
  exportModalOpen: boolean;

  setUserConfig: (config: Partial<UserConfig>) => void;
  generateSlidesFromConfig: () => void;
  setCurrentSlideIndex: (index: number) => void;
  addComment: (slideId: string, author: string, content: string) => void;
  deleteComment: (slideId: string, commentId: string) => void;
  updateSlideContent: (slideId: string, updates: Partial<PPTSlide>) => void;
  togglePageType: (pageType: PageType) => void;
  setExportModalOpen: (open: boolean) => void;
  resetAll: () => void;
  getSampleDataSlides: () => PPTSlide[];
}

const initialState = {
  userConfig: null,
  slides: [],
  currentSlideIndex: 0,
  isGenerating: false,
  exportModalOpen: false,
};

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      ...initialState,

      setUserConfig: (config) =>
        set((state) => ({
          userConfig: state.userConfig
            ? { ...state.userConfig, ...config }
            : (config as UserConfig),
        })),

      togglePageType: (pageType) =>
        set((state) => {
          if (!state.userConfig) return state;
          const currentSelected = state.userConfig.selectedPageTypes || [];
          const newSelected = currentSelected.includes(pageType)
            ? currentSelected.filter((p) => p !== pageType)
            : [...currentSelected, pageType];
          return {
            userConfig: {
              ...state.userConfig,
              selectedPageTypes: newSelected,
            },
          };
        }),

      generateSlidesFromConfig: () => {
        const { userConfig } = get();
        if (!userConfig || !userConfig.industry || !userConfig.fundingStage) {
          return;
        }
        if (!userConfig.selectedPageTypes || userConfig.selectedPageTypes.length === 0) {
          return;
        }

        set({ isGenerating: true });

        setTimeout(() => {
          const slides = generateSlides(
            userConfig.industry,
            userConfig.fundingStage,
            userConfig.selectedPageTypes
          );
          set({ slides, currentSlideIndex: 0, isGenerating: false });
        }, 500);
      },

      setCurrentSlideIndex: (index) => set({ currentSlideIndex: index }),

      addComment: (slideId, author, content) =>
        set((state) => {
          const newComment: Comment = {
            id: `comment-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
            pageId: slideId,
            author,
            content,
            timestamp: new Date().toISOString(),
          };
          return {
            slides: state.slides.map((slide) =>
              slide.id === slideId
                ? { ...slide, comments: [...slide.comments, newComment] }
                : slide
            ),
          };
        }),

      deleteComment: (slideId, commentId) =>
        set((state) => ({
          slides: state.slides.map((slide) =>
            slide.id === slideId
              ? {
                  ...slide,
                  comments: slide.comments.filter((c) => c.id !== commentId),
                }
              : slide
          ),
        })),

      updateSlideContent: (slideId, updates) =>
        set((state) => ({
          slides: state.slides.map((slide) =>
            slide.id === slideId ? { ...slide, ...updates } : slide
          ),
        })),

      setExportModalOpen: (open) => set({ exportModalOpen: open }),

      resetAll: () => set(initialState),

      getSampleDataSlides: () => {
        const { slides } = get();
        return slides.filter((slide) => slide.hasSampleData);
      },
    }),
    {
      name: 'ppt-workshop-storage',
      partialize: (state) => ({
        userConfig: state.userConfig,
        slides: state.slides,
      }),
    }
  )
);
