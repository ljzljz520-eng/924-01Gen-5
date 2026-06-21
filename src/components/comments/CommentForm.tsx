import { useState } from 'react';
import { Send } from 'lucide-react';
import { Button } from '../ui/Button';

interface CommentFormProps {
  onSubmit: (author: string, content: string) => void;
}

export const CommentForm = ({ onSubmit }: CommentFormProps) => {
  const [author, setAuthor] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!author.trim() || !content.trim()) return;
    onSubmit(author.trim(), content.trim());
    setContent('');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div>
        <input
          type="text"
          placeholder="你的名字"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-100 outline-none transition-all text-sm"
        />
      </div>
      <div className="flex gap-2">
        <textarea
          placeholder="添加评论..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={3}
          className="flex-1 px-4 py-2 rounded-xl border border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-100 outline-none transition-all text-sm resize-none"
        />
        <Button type="submit" size="sm" disabled={!author.trim() || !content.trim()}>
          <Send className="w-4 h-4" />
        </Button>
      </div>
    </form>
  );
};
