import React from 'react';
import { Newspaper, ExternalLink } from 'lucide-react';
import { MarketNews } from '@/lib/api';
import { formatDistanceToNow } from 'date-fns';

interface NewsFeedProps {
  news: MarketNews[];
}

const NewsFeed: React.FC<NewsFeedProps> = ({ news }) => {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
      <div className="mb-4 flex items-center gap-2">
        <Newspaper className="h-5 w-5 text-blue-600" />
        <h2 className="text-xl font-semibold">Market News</h2>
      </div>
      
      <div className="space-y-4">
        {news.map((article, index) => (
          <div key={index} className="border-b border-gray-100 pb-4 last:border-b-0">
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1">
                <h3 className="font-medium text-gray-900 hover:text-blue-600 cursor-pointer">
                  {article.title}
                </h3>
                <p className="mt-1 text-sm text-gray-600 line-clamp-2">
                  {article.description}
                </p>
                <div className="mt-2 flex items-center gap-4 text-xs text-gray-500">
                  <span>{article.source}</span>
                  <span>•</span>
                  <span>{formatDistanceToNow(new Date(article.publishedAt), { addSuffix: true })}</span>
                </div>
              </div>
              <ExternalLink className="h-4 w-4 text-gray-400 hover:text-blue-600 cursor-pointer flex-shrink-0" />
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-4 text-center">
        <button className="text-sm text-blue-600 hover:text-blue-800 font-medium">
          View All News
        </button>
      </div>
    </div>
  );
};

export default NewsFeed;
