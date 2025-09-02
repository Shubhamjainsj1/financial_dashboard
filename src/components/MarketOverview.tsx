import React from 'react';
import { TrendingUp, TrendingDown, DollarSign } from 'lucide-react';
import { StockData } from '@/lib/api';

interface MarketOverviewProps {
  marketIndices: StockData[];
}

const MarketOverview: React.FC<MarketOverviewProps> = ({ marketIndices }) => {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
      <div className="mb-4 flex items-center gap-2">
        <DollarSign className="h-5 w-5 text-blue-600" />
        <h2 className="text-xl font-semibold">Market Overview</h2>
      </div>
      
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {marketIndices.map((index) => {
          const isUp = index.change >= 0;
          return (
            <div key={index.symbol} className="rounded-lg border border-gray-100 p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900">{index.symbol}</p>
                  <p className="text-2xl font-bold">${index.price.toFixed(2)}</p>
                </div>
                <div className={`flex items-center gap-1 ${isUp ? 'text-green-600' : 'text-red-600'}`}>
                  {isUp ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
                  <div className="text-right">
                    <p className="text-sm font-medium">{isUp ? '+' : ''}{index.change.toFixed(2)}</p>
                    <p className="text-xs">({isUp ? '+' : ''}{index.changePercent.toFixed(2)}%)</p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MarketOverview;
