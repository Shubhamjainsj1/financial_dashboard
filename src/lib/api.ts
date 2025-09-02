import axios from 'axios';

// Types for financial data
export interface StockData {
  symbol: string;
  price: number;
  change: number;
  changePercent: number;
  volume: number;
  marketCap?: number;
  high: number;
  low: number;
}

export interface HistoricalData {
  date: string;
  price: number;
  volume: number;
}

export interface MarketNews {
  title: string;
  description: string;
  url: string;
  publishedAt: string;
  source: string;
}

// Mock API functions (replace with real API endpoints)
export const fetchStockData = async (symbol: string): Promise<StockData> => {
  // Mock data - replace with real API call
  // For production, use APIs like Alpha Vantage, Finnhub, or Yahoo Finance
  return new Promise((resolve) => {
    setTimeout(() => {
      const mockPrice = 150 + Math.random() * 100;
      const mockChange = (Math.random() - 0.5) * 10;
      resolve({
        symbol: symbol.toUpperCase(),
        price: mockPrice,
        change: mockChange,
        changePercent: (mockChange / mockPrice) * 100,
        volume: Math.floor(Math.random() * 1000000),
        high: mockPrice + Math.random() * 5,
        low: mockPrice - Math.random() * 5,
        marketCap: mockPrice * 1000000000
      });
    }, 300);
  });
};

export const fetchHistoricalData = async (symbol: string, period: string = '1M'): Promise<HistoricalData[]> => {
  // Mock historical data - replace with real API call
  return new Promise((resolve) => {
    setTimeout(() => {
      const data: HistoricalData[] = [];
      const basePrice = 150 + Math.random() * 100;
      
      for (let i = 30; i >= 0; i--) {
        const date = new Date();
        date.setDate(date.getDate() - i);
        data.push({
          date: date.toISOString().split('T')[0],
          price: basePrice + (Math.random() - 0.5) * 20,
          volume: Math.floor(Math.random() * 1000000)
        });
      }
      resolve(data);
    }, 500);
  });
};

export const fetchMarketNews = async (): Promise<MarketNews[]> => {
  // Mock news data - replace with real API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          title: "Market Analysis: Tech Stocks Show Strong Performance",
          description: "Technology sector leads market gains with strong earnings reports from major companies.",
          url: "#",
          publishedAt: new Date().toISOString(),
          source: "Financial News"
        },
        {
          title: "Federal Reserve Announces Interest Rate Decision",
          description: "Central bank maintains current rates, citing economic stability concerns.",
          url: "#",
          publishedAt: new Date(Date.now() - 3600000).toISOString(),
          source: "Reuters"
        },
        {
          title: "Cryptocurrency Market Update",
          description: "Bitcoin and Ethereum show mixed signals as institutional adoption continues.",
          url: "#",
          publishedAt: new Date(Date.now() - 7200000).toISOString(),
          source: "Crypto Daily"
        }
      ]);
    }, 400);
  });
};

export const fetchMultipleStocks = async (symbols: string[]): Promise<StockData[]> => {
  const promises = symbols.map(symbol => fetchStockData(symbol));
  return Promise.all(promises);
};

// Real API integration example (commented out)
/*
const ALPHA_VANTAGE_API_KEY = process.env.NEXT_PUBLIC_ALPHA_VANTAGE_API_KEY;

export const fetchRealStockData = async (symbol: string): Promise<StockData> => {
  try {
    const response = await axios.get(
      `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${ALPHA_VANTAGE_API_KEY}`
    );
    
    const quote = response.data['Global Quote'];
    return {
      symbol: quote['01. symbol'],
      price: parseFloat(quote['05. price']),
      change: parseFloat(quote['09. change']),
      changePercent: parseFloat(quote['10. change percent'].replace('%', '')),
      volume: parseInt(quote['06. volume']),
      high: parseFloat(quote['03. high']),
      low: parseFloat(quote['04. low'])
    };
  } catch (error) {
    console.error('Error fetching stock data:', error);
    throw error;
  }
};
*/
