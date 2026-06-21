import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, ChevronDown, ChevronUp } from 'lucide-react';
import { Comment } from '@/types';
import { CommentItem } from './CommentItem';
import { CommentForm } from './CommentForm';

interface CommentPanelProps {
  slideId: string;
  comments: Comment[];
  onAddComment: (author: string, content: string) => void;
  onDeleteComment: (commentId: string) => void;
}

export const CommentPanel = ({
  slideId,
  comments,
  onAddComment,
  onDeleteComment,
}: CommentPanelProps) => {
  const [isOpen, setIsOpen] = useState(true);
  const [showForm, setShowForm] = useState(false);

  const handleAddComment = (author: string, content: string) => {
    onAddComment(author, content);
    setShowForm(false);
  };

  return (
    <motion.div
      initial={{ x: 400 }}
      animate={{ x: 0 }}
      className="w-96 bg-white border-l border-gray-200 flex flex-col h-full"
    >
      <div className="p-4 border-b border-gray-100 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <MessageCircle className="w-5 h-5 text-primary-600" />
          <h3 className="font-semibold text-gray-900">评论</h3>
          <span className="bg-primary-100 text-primary-700 text-xs font-bold px-2 py-0.5 rounded-full">
            {comments.length}
          </span>
        </div>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-1 text-gray-400 hover:text-gray-600"
        >
          {isOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="flex-1 overflow-hidden flex flex-col"
          >
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {comments.length === 0 ? (
                <div className="text-center py-8 text-gray-400">
                  <MessageCircle className="w-12 h-12 mx-auto mb-2 opacity-50" />
                  <p className="text-sm">暂无评论</p>
                  <p className="text-xs">点击下方按钮添加第一条评论</p>
                </div>
              ) : (
                comments.map((comment) => (
                  <CommentItem
                    key={comment.id}
                    comment={comment}
                    onDelete={onDeleteComment}
                  />
                ))
              )}
            </div>

            <div className="p-4 border-t border-gray-100">
              {!showForm ? (
                <button
                  onClick={() => setShowForm(true)}
                  className="w-full py-2 text-sm text-primary-600 hover:bg-primary-50 rounded-xl transition-colors"
                >
                  + 添加评论
                </button>
              ) : (
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-gray-500">新评论</span>
                    <button
                      onClick={() => setShowForm(false)}
                      className="p-1 text-gray-400 hover:text-gray-600"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                  <CommentForm onSubmit={handleAddComment} />
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
