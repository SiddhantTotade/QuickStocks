"use client";

import React, { useState } from "react";

interface Stock {
  name: string;
  sector: string;
  ticker: string;
  purchasePrice: number;
  quantity: number;
  investment: number;
  cmp: number;
  presentValue: number;
  gainLoss: number;
  gainLossPercent: number;
  portfolioWeight: string;
  peRatio: string;
  earnings: string;
}

interface PortfolioTableProps {
  stocks: Stock[];
}

const getSectorIcon = (sector: string) => {
  const s = sector.toLowerCase();
  if (s.includes("tech")) return "terminal";
  if (s.includes("financial")) return "account_balance";
  if (s.includes("consumer")) return "shopping_cart";
  if (s.includes("power") || s.includes("energy")) return "bolt";
  if (s.includes("pipe") || s.includes("industr")) return "rebase_edit";
  return "category";
};

export default function PortfolioTable({ stocks }: PortfolioTableProps) {
  const [expandedSectors, setExpandedSectors] = useState<Record<string, boolean>>(
    Object.fromEntries([...new Set(stocks.map((s) => s.sector))].map((s) => [s, true]))
  );

  const toggleSector = (sector: string) => {
    setExpandedSectors((prev) => ({ ...prev, [sector]: !prev[sector] }));
  };

  const sectors = [...new Set(stocks.map((s) => s.sector))];
  const totalPortfolioValue = stocks.reduce((sum, s) => sum + (s.presentValue || 0), 0);

  return (
    <section className="bg-surface-container-lowest rounded-2xl overflow-hidden shadow-sm">
      <div className="p-6 border-b border-surface-container flex justify-between items-center">
        <h3 className="font-headline font-bold text-lg">Asset Allocation</h3>
        <div className="flex gap-2">
          <button className="bg-surface-container-low px-4 py-1.5 rounded text-xs font-semibold text-primary hover:bg-primary-container transition-colors">Export CSV</button>
          <button className="bg-surface-container-low px-4 py-1.5 rounded text-xs font-semibold text-primary hover:bg-primary-container transition-colors">Filter</button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-surface-container-low/50">
              <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-slate-500 font-sans">Stock Name</th>
              <th className="px-4 py-4 text-[10px] font-bold uppercase tracking-widest text-slate-500 font-sans text-right">Buy Price</th>
              <th className="px-4 py-4 text-[10px] font-bold uppercase tracking-widest text-slate-500 font-sans text-right">Qty</th>
              <th className="px-4 py-4 text-[10px] font-bold uppercase tracking-widest text-slate-500 font-sans text-right">Investment</th>
              <th className="px-4 py-4 text-[10px] font-bold uppercase tracking-widest text-slate-500 font-sans text-right">CMP</th>
              <th className="px-4 py-4 text-[10px] font-bold uppercase tracking-widest text-slate-500 font-sans text-right">Present Value</th>
              <th className="px-4 py-4 text-[10px] font-bold uppercase tracking-widest text-slate-500 font-sans text-right">Gain/Loss</th>
              <th className="px-4 py-4 text-[10px] font-bold uppercase tracking-widest text-slate-500 font-sans text-center">Weight (%)</th>
              <th className="px-4 py-4 text-[10px] font-bold uppercase tracking-widest text-slate-500 font-sans text-right">P/E</th>
              <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-slate-500 font-sans text-right">Earnings</th>
            </tr>
          </thead>

          <tbody className="text-sm">
            {sectors.map((sector) => {
              const sectorStocks = stocks.filter((s) => s.sector === sector);
              const sectorInv = sectorStocks.reduce((sum, s) => sum + s.investment, 0);
              const sectorVal = sectorStocks.reduce((sum, s) => sum + (s.presentValue || 0), 0);
              const sectorGain = ((sectorVal - sectorInv) / sectorInv) * 100;
              const isExpanded = expandedSectors[sector];

              return (
                <React.Fragment key={sector}>
                  <tr
                    className="bg-surface-container-low/30 cursor-pointer hover:bg-surface-container-low/50 transition-colors"
                    onClick={() => toggleSector(sector)}
                  >
                    <td className="px-6 py-3" colSpan={10}>
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-3">
                          <span className="material-symbols-outlined text-primary text-sm">{getSectorIcon(sector)}</span>
                          <span className="font-headline font-bold text-sm tracking-tight">{sector}</span>
                          <span className="text-[10px] font-bold px-2 py-0.5 bg-primary/10 text-primary rounded">{sectorStocks.length} Assets</span>
                        </div>
                        <div className="flex items-center gap-6">
                          <span className="text-xs font-medium text-slate-500 whitespace-nowrap">
                            Inv: <span className="text-on-surface font-bold text-money">₹{sectorInv.toLocaleString("en-IN", { maximumFractionDigits: 0 })}</span>
                          </span>
                          <span className={`text-xs font-medium flex items-center gap-1 ${sectorGain >= 0 ? "text-secondary" : "text-tertiary"}`}>
                            <span className="material-symbols-outlined text-xs">
                              {sectorGain >= 0 ? "trending_up" : "trending_down"}
                            </span>
                            {sectorGain >= 0 ? "+" : ""}{sectorGain.toFixed(1)}%
                          </span>
                        </div>
                      </div>
                    </td>
                  </tr>

                  {isExpanded && sectorStocks.map((stock) => {
                    const weight = parseFloat(stock.portfolioWeight) || 0;
                    const isPositive = (stock.gainLoss || 0) >= 0;
                    const mnemonic = stock.ticker.slice(0, 4).toUpperCase();

                    return (
                      <tr key={stock.ticker} className="hover:bg-primary-container/10 transition-colors border-b border-surface-container/50 last:border-0 group">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded bg-surface-container-highest flex items-center justify-center font-headline font-bold text-[10px] text-primary">
                              {mnemonic}
                            </div>
                            <div>
                              <p className="text-xs font-bold text-on-surface">{stock.name}</p>
                              <p className="text-[10px] text-slate-500 font-medium">{stock.ticker}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-4 text-right text-xs font-medium text-money">₹{stock.purchasePrice.toLocaleString("en-IN")}</td>
                        <td className="px-4 py-4 text-right text-xs font-medium text-money">{stock.quantity}</td>
                        <td className="px-4 py-4 text-right text-xs font-medium text-money">₹{stock.investment.toLocaleString("en-IN")}</td>
                        <td className={`px-4 py-4 text-right text-xs font-bold text-money ${isPositive ? "text-secondary" : "text-tertiary"}`}>
                          <div className="inline-block relative">
                            ₹{stock.cmp.toLocaleString("en-IN") || "N/A"}
                            <span className={`absolute -top-1 -right-1 w-1 h-1 rounded-full animate-ping ${isPositive ? "bg-secondary" : "bg-tertiary"}`}></span>
                          </div>
                        </td>
                        <td className="px-4 py-4 text-right text-xs font-bold text-money">₹{stock.presentValue.toLocaleString("en-IN")}</td>
                        <td className={`px-4 py-4 text-right text-xs font-bold text-money ${isPositive ? "text-secondary" : "text-tertiary"}`}>
                          {isPositive ? "+" : ""}
                          ₹{stock.gainLoss.toLocaleString("en-IN", { maximumFractionDigits: 0 })}
                        </td>
                        <td className="px-4 py-4 text-center">
                          <div className="w-full bg-surface-container h-1.5 rounded-full overflow-hidden max-w-[60px] mx-auto">
                            <div className="bg-primary h-full transition-all duration-500" style={{ width: `${Math.min(weight * 2, 100)}%` }}></div>
                          </div>
                          <p className="text-[9px] mt-1 font-bold text-slate-500">{weight.toFixed(1)}%</p>
                        </td>
                        <td className="px-4 py-4 text-right text-xs font-medium text-on-surface-variant font-money">{stock.peRatio}</td>
                        <td className="px-6 py-4 text-right">
                          <span className={`text-[9px] font-bold px-2 py-0.5 rounded ${stock.earnings !== 'N/A' ? "text-secondary bg-secondary/10" : "text-slate-500 bg-slate-500/10"}`}>
                            {stock.earnings || "N/A"}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </React.Fragment>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
}
