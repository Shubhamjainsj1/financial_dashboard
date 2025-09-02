'use client';

import React, { useEffect, useState } from 'react';
import Header from '@/components/Header';
import StockCard from '@/components/StockCard';
import StockChart from '@/components/charts/StockChart';
import PortfolioChart from '@/components/charts/PortfolioChart';
import MarketOverview from '@/components/MarketOverview';
import NewsFeed from '@/components/NewsFeed';
import { 
  fetchMultipleStocks, 
  fetchHistoricalData, 
  fetchMarketNews, 
  StockData, 
  HistoricalData, 
  MarketNews 
} from '@/lib/api';
import { Activity, BarChart3, PieChart } from 'lucide-react';

export default function Dashboard() {
  const [stocks, setStocks] = useState<StockData[]>([]);
  const [historicalData, setHistoricalData] = useState<HistoricalData[]>([]);
  const [marketIndices, setMarketIndices] = useState<StockData[]>([]);
  const [news, setNews] = useState<MarketNews[]>([]);
  const [selectedStock, setSelectedStock] = useState('AAPL');
  const [loading, setLoading] = useState(true);

  // Portfolio mock data
  const portfolioData = [
    { symbol: 'AAPL', value: 25000, color: '#3B82F6' },
    { symbol: 'GOOGL', value: 20000, color: '#10B981' },
    { symbol: 'MSFT', value: 18000, color: '#F59E0B' },
    { symbol: 'TSLA', value: 15000, color: '#EF4444' },
    { symbol: 'NVDA', value: 12000, color: '#8B5CF6' },
  ];

  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        setLoading(true);
        
        // Fetch multiple stocks data
        const stockSymbols = ['AAPL', 'GOOGL', 'MSFT', 'TSLA', 'NVDA', 'AMZN'];
        const stocksData = await fetchMultipleStocks(stockSymbols);
        setStocks(stocksData);

        // Fetch market indices
        const indicesSymbols = ['SPY', 'QQQ', 'DIA'];
        const indicesData = await fetchMultipleStocks(indicesSymbols);
        setMarketIndices(indicesData);

        // Fetch historical data for selected stock
        const historical = await fetchHistoricalData(selectedStock);
        setHistoricalData(historical);

        // Fetch market news
        const newsData = await fetchMarketNews();
        setNews(newsData);
      } catch (error) {
        console.error('Error loading dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadDashboardData();
  }, [selectedStock]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        {/* Dashboard Stats */}
        <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-blue-100 p-2">
                <Activity className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Portfolio Value</p>
                <p className="text-xl font-bold">${portfolioData.reduce((sum, item) => sum + item.value, 0).toLocaleString()}</p>
              </div>
            </div>
          </div>
          
          <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-green-100 p-2">
                <BarChart3 className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Today's P&L</p>
                <p className="text-xl font-bold text-green-600">+$2,847</p>
              </div>
            </div>
          </div>
          
          <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-purple-100 p-2">
                <PieChart className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Active Positions</p>
                <p className="text-xl font-bold">{portfolioData.length}</p>
              </div>
            </div>
          </div>
          
          <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-orange-100 p-2">
                <Activity className="h-5 w-5 text-orange-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">24h Change</p>
                <p className="text-xl font-bold text-green-600">+3.2%</p>
              </div>
            </div>
          </div>
        </div>

        {/* Market Overview */}
        <div className="mb-6">
          <MarketOverview marketIndices={marketIndices} />
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Left Column - Stock Chart */}
          <div className="lg:col-span-2">
            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-xl font-semibold">Stock Performance</h2>
                <select 
                  value={selectedStock}
                  onChange={(e) => setSelectedStock(e.target.value)}
                  className="rounded-lg border border-gray-200 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
                >
                  {stocks.map((stock) => (
                    <option key={stock.symbol} value={stock.symbol}>
                      {stock.symbol}
                    </option>
                  ))}
                </select>
              </div>
              <StockChart 
                data={historicalData} 
                symbol={selectedStock}
                color="#3B82F6"
              />
            </div>
            
            {/* Stock Cards Grid */}
            <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
              {stocks.slice(0, 6).map((stock) => (
                <StockCard key={stock.symbol} stock={stock} />
              ))}
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Portfolio Allocation */}
            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
              <h2 className="mb-4 text-xl font-semibold">Portfolio Allocation</h2>
              <PortfolioChart portfolioData={portfolioData} />
            </div>

            {/* Market News */}
            <NewsFeed news={news} />
          </div>
        </div>
      </main>
    </div>
  );
}
