import { motion } from 'framer-motion';
import { Trash2, User } from 'lucide-react';
import { Comment } from '@/types';

interface CommentItemProps {
  comment: Comment;
  onDelete: (commentId: string) => void;
}

export const CommentItem = ({ comment, onDelete }: CommentItemProps) => {
  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleString('zh-CN', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="p-4 bg-gray-50 rounded-xl border border-gray-100 group"
    >
      <div className="flex items-start justify-between mb-2">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
            <User className="w-4 h-4 text-primary-600" />
          </div>
          <div>
            <p className="font-medium text-gray-900 text-sm">{comment.author}</p>
            <p className="text-xs text-gray-400">{formatTime(comment.timestamp)}</p>
          </div>
        </div>
        <button
          onClick={() => onDelete(comment.id)}
          className="opacity-0 group-hover:opacity-100 p-1 text-gray-400 hover:text-red-500 transition-all"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
      <p className="text-gray-700 text-sm whitespace-pre-wrap">{comment.content}</p>
    </motion.div>
  );
};
