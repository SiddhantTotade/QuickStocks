const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
const csv = require("csv-parser");
const xlsx = require("xlsx");

const { scrapeStockData } = require("./services/scraper");

const app = express();
app.use(cors({
  origin: [
    "http://localhost:3000",
    /\.vercel\.app$/
  ],
  methods: ["GET"],
  credentials: false
}));

const PORT = 5000;

let portfolioData = [];

const calculateGlobalMetrics = () => {
  const totalInvestment = portfolioData.reduce(
    (sum, s) => sum + s.investment,
    0,
  );
  const totalPresentValue = portfolioData.reduce(
    (sum, s) => sum + (s.presentValue || 0),
    0,
  );
  const totalGainLoss = totalPresentValue - totalInvestment;
  const totalGainLossPercent =
    totalInvestment !== 0 ? (totalGainLoss / totalInvestment) * 100 : 0;

  portfolioData.forEach((stock) => {
    stock.portfolioWeight = (
      (stock.investment / totalInvestment) *
      100
    ).toFixed(2);
  });

  return {
    totalInvestment,
    totalPresentValue,
    totalGainLoss,
    totalGainLossPercent,
  };
};

async function updateAllPrices() {
  console.log("Updating Portfolio...");

  const promises = portfolioData.map(async (stock) => {
    const liveData = await scrapeStockData(stock.ticker);

    stock.cmp = liveData.cmp;
    stock.peRatio = liveData.peRatio;
    stock.earnings = liveData.earnings;

    stock.presentValue = (stock.cmp || 0) * stock.quantity;
    stock.gainLoss = stock.presentValue - stock.investment;
    stock.gainLossPercent =
      stock.investment !== 0 ? (stock.gainLoss / stock.investment) * 100 : 0;
  });

  await Promise.all(promises);
  calculateGlobalMetrics();

  console.log("Update Done");
}

let currentSector = "General";

const loadExcelData = () => {
  try {
    const filePath = path.join(__dirname, "data", "E555815F_58D029050B.xlsx");
    const workbook = xlsx.readFile(filePath);
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const data = xlsx.utils.sheet_to_json(sheet, { range: 1 });

    portfolioData = [];

    data.forEach((row) => {
      if (row["Particulars"] && !row["NSE/BSE"]) {
        currentSector = row["Particulars"];
      }
      else if (row["NSE/BSE"]) {
        portfolioData.push({
          name: row["Particulars"],
          sector: currentSector,
          ticker: String(row["NSE/BSE"]).trim(),
          purchasePrice: parseFloat(row["Purchase Price"]) || 0,
          quantity: parseInt(row["Qty"]) || 0,
          investment: parseFloat(row["Investment"]) || 0,
          cmp: 0,
          peRatio: "N/A",
          earnings: "N/A",
        });
      }
    });

    console.log(`Excel Loaded: ${portfolioData.length} stocks found.`);
  } catch (error) {
    console.error("Excel Load Error:", error.message);
  }
};

app.get("/", (req, res) => {
  res.json({ status: "QuickStocks Backend is running", endpoints: ["/api/portfolio"] });
});

app.get("/api/portfolio", async (req, res) => {
  // Use Vercel Edge Caching to dynamically fulfill the 15-second polling requirement mechanically
  res.setHeader('Cache-Control', 's-maxage=15, stale-while-revalidate=59');

  if (portfolioData.length === 0) {
    loadExcelData();
  }
  
  await updateAllPrices();

  res.json({
    stocks: portfolioData,
    stats: calculateGlobalMetrics(),
    lastUpdated: new Date().toISOString(),
  });
});

// Fallback for local testing, ignored by Vercel
if (require.main === module) {
  app.listen(PORT, () => console.log(`Backend Running locally on PORT : ${PORT}`));
}

module.exports = app;
