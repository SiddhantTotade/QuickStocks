# QuickStocks Dynamic Portfolio Dashboard

A premium, full-stack real-time portfolio dashboard built for the Octa Byte AI assessment.

## Tech Stack
- **Frontend**: Next.js 15+ (App Router), TypeScript, Tailwind CSS, Recharts.
- **Backend**: Node.js, Express, Axios, Cheerio (Scraping), xlsx (Excel parsing).
- **Data Sources**: Google Finance & Yahoo Finance (Real-time Scraping).

## Features
- **Real-time Updates**: Live price (CMP), Present Value, and Gain/Loss update every 15 seconds.
- **Sector Grouping**: Automatic grouping of stocks by sector with sub-totals for investment and value.
- **Visual Insights**: Color-coded gain/loss indicators and a sector allocation donut chart.
- **Premium UI**: Dark mode dashboard with glassmorphism and modern typography.

## Setup Instructions

### Backend
1. Navigate to the `backend` directory.
2. Install dependencies: `npm install`.
3. Start the server: `npm start`. (Server runs on port 5000).

### Frontend
1. Navigate to the `frontend` directory.
2. Install dependencies: `npm install`.
3. Start the development server: `npm run dev`.
4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Assessment Requirements Checklist
- [x] Build full-stack application with React/Node JS.
- [x] Consume data from Yahoo & Google Finance.
- [x] Handle asynchronous parallel API requests.
- [x] Table with columns: Particulars, Buy Price, Qty, Investment, CMP, etc.
- [x] Dynamic updates every 15 seconds.
- [x] Color-coded Gain/Loss.
- [x] Sector-wise grouping and summaries.
- [x] Responsive layout.
