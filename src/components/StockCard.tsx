import React from 'react';
import { ArrowDown, ArrowUp } from 'lucide-react';
import { StockData } from '@/lib/api';

interface StockCardProps {
  stock: StockData;
}

const StockCard: React.FC<StockCardProps> = ({ stock }) => {
  const isUp = stock.change >= 0;

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold">{stock.symbol}</h3>
          <p className="text-sm text-gray-500">Market Cap: {stock.marketCap ? `$${(stock.marketCap / 1e9).toFixed(1)}B` : '—'}</p>
        </div>
        <div className={`flex items-center gap-1 ${isUp ? 'text-green-600' : 'text-red-600'}`}>
          {isUp ? <ArrowUp className="h-4 w-4" /> : <ArrowDown className="h-4 w-4" />}
          <span className="text-sm font-medium">{isUp ? '+' : ''}{stock.change.toFixed(2)} ({stock.changePercent.toFixed(2)}%)</span>
        </div>
      </div>
      <div className="mt-3 flex items-end justify-between">
        <div>
          <p className="text-2xl font-bold">${stock.price.toFixed(2)}</p>
          <p className="text-xs text-gray-500">H: ${stock.high.toFixed(2)} · L: ${stock.low.toFixed(2)}</p>
        </div>
        <div className="text-right">
          <p className="text-sm text-gray-600">Vol: {stock.volume.toLocaleString()}</p>
        </div>
      </div>
    </div>
  );
};

export default StockCard;

