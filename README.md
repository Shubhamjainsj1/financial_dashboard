# Interactive Financial Dashboard

A modern, responsive financial dashboard built with Next.js, Tailwind CSS, Chart.js, and REST APIs. Features real-time stock data visualization, portfolio management, market news, and interactive charts.

## Features

- 📊 **Real-time Stock Data**: Live stock prices and market data
- 📈 **Interactive Charts**: Beautiful visualizations using Chart.js
- 💼 **Portfolio Management**: Track your investments and allocation
- 📱 **Responsive Design**: Works seamlessly on all devices
- 🔄 **Server-Side Rendering**: Optimized performance with Next.js SSR
- 📰 **Market News**: Stay updated with latest financial news
- 🎨 **Modern UI**: Clean interface built with Tailwind CSS

## Tech Stack

- **Frontend**: Next.js 14, React, TypeScript
- **Styling**: Tailwind CSS
- **Charts**: Chart.js, React-ChartJS-2
- **Icons**: Lucide React
- **HTTP Client**: Axios
- **Date Handling**: Date-fns

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd financial-dashboard
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
src/
├── app/
│   ├── globals.css          # Global styles
│   ├── layout.tsx           # Root layout
│   └── page.tsx             # Main dashboard page
├── components/
│   ├── charts/
│   │   ├── StockChart.tsx   # Line chart for stock prices
│   │   └── PortfolioChart.tsx # Doughnut chart for portfolio
│   ├── Header.tsx           # Navigation header
│   ├── StockCard.tsx        # Stock information cards
│   ├── MarketOverview.tsx   # Market indices overview
│   └── NewsFeed.tsx         # Market news component
└── lib/
    └── api.ts               # API utility functions
```

## API Integration

Currently uses mock data for demonstration. To integrate with real financial APIs:

1. **Alpha Vantage**: Free tier available
   - Get API key from [Alpha Vantage](https://www.alphavantage.co/support/#api-key)
   - Add to `.env.local`: `NEXT_PUBLIC_ALPHA_VANTAGE_API_KEY=your_key`

2. **Finnhub**: Real-time market data
   - Sign up at [Finnhub](https://finnhub.io/)
   - Add API key to environment variables

3. **Yahoo Finance**: Alternative free option
   - Use unofficial APIs or scraping libraries

## Customization

### Adding New Stocks
Modify the `stockSymbols` array in `src/app/page.tsx`:

```typescript
const stockSymbols = ['AAPL', 'GOOGL', 'MSFT', 'TSLA', 'NVDA', 'AMZN'];
```

### Changing Colors
Update colors in `src/components/charts/` components or modify the Tailwind config.

### Adding New Features
- Create new components in `src/components/`
- Add API functions in `src/lib/api.ts`
- Update the main dashboard in `src/app/page.tsx`

## Deployment

### Vercel (Recommended)
1. Push to GitHub
2. Connect repository to Vercel
3. Add environment variables
4. Deploy

### Other Platforms
- **Netlify**: `npm run build && npm run export`
- **AWS**: Use AWS Amplify or S3 + CloudFront
- **Docker**: Create Dockerfile for containerization

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

MIT License - see LICENSE file for details

## Acknowledgments

- Chart.js for beautiful charts
- Tailwind CSS for styling
- Lucide React for icons
- Next.js team for the amazing framework
