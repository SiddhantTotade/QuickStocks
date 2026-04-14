"use client";

import { useEffect, useState } from "react";
import Stats from "./Stats";
import PortfolioTable from "./PortfolioTable";
import SectorChart from "./SectorChart";
import { RefreshCcw, LayoutDashboard, Database } from "lucide-react";

export default function Dashboard() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastSync, setLastSync] = useState<Date | null>(null);

  const fetchData = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/portfolio");
      if (!res.ok) throw new Error("Failed to fetch portfolio data");
      const json = await res.json();
      setData(json);
      setLastSync(new Date());
      setError(null);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 15000);
    return () => clearInterval(interval);
  }, []);

  if (loading && !data) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <RefreshCcw className="animate-spin text-primary mb-4" size={48} />
        <p className="text-muted-foreground animate-pulse">Initializing Dashboard...</p>
      </div>
    );
  }

  if (error && !data) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
        <div className="bg-rose-500/10 p-4 rounded-full mb-4">
          <Database className="text-rose-500" size={48} />
        </div>
        <h3 className="text-xl font-bold mb-2">Connection Error</h3>
        <p className="text-muted-foreground mb-6 max-w-md">
          Unable to connect to the backend server. Please ensure the Node.js server is running on port 5000.
        </p>
        <button
          onClick={fetchData}
          className="bg-primary hover:bg-primary/90 text-white px-6 py-2 rounded-xl transition-all"
        >
          Retry Connection
        </button>
      </div>
    );
  }

  const sectors = data ? [...new Set(data.stocks.map((s: any) => s.sector))] : [];
  const totalInvestment = data.stats.totalInvestment || 0;
  const totalPresentValue = data.stats.totalPresentValue || 0;
  const totalGainLoss = data.stats.totalGainLoss || 0;
  const totalGainLossPercent = data.stats.totalGainLossPercent || 0;

  const sectorData = sectors.map((sector: any) => ({
    name: sector,
    value: data.stocks
      .filter((s: any) => s.sector === sector)
      .reduce((sum: number, s: any) => sum + s.investment, 0),
  }));

  const totalAssets = data.stocks.length;
  const topSector = [...sectorData].sort((a: any, b: any) => b.value - a.value)[0]?.name || "N/A";
  const numSectors = sectors.length;

  return (
    <div className="px-8 py-6 max-w-7xl w-full mx-auto pb-20">
      <section className="mb-10">
        <div className="flex justify-between items-end mb-6">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="w-2 h-2 rounded-full bg-secondary animate-pulse"></span>
              <span className="text-[11px] font-bold uppercase tracking-widest text-slate-500">Live Portfolio Overview</span>
            </div>
            <h2 className="text-4xl font-headline font-bold text-on-surface tracking-tight text-money">
              ₹{totalPresentValue.toLocaleString("en-IN")}
            </h2>
          </div>

          <div className="text-right flex items-center gap-8">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1">Total Performance</p>
              <div className="flex items-center gap-2">
                <span className={`font-headline font-bold text-lg ${totalGainLoss >= 0 ? "text-secondary" : "text-tertiary"}`}>
                  {totalGainLoss >= 0 ? "+" : ""}{totalGainLossPercent.toFixed(1)}%
                </span>
                <span className={`font-headline font-medium text-sm ${totalGainLoss >= 0 ? "text-secondary" : "text-tertiary"}`}>
                  ₹{Math.abs(totalGainLoss).toLocaleString("en-IN", { maximumFractionDigits: 0 })}
                </span>
              </div>
            </div>

            <div className="flex flex-col items-end">
              <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1">Last Sync</p>
              <div className="flex items-center gap-2 text-on-surface-variant">
                <span className="material-symbols-outlined text-sm animate-spin">refresh</span>
                <span className="text-xs font-medium">{lastSync ? lastSync.toLocaleTimeString() : "Syncing..."} EST</span>
              </div>
            </div>
          </div>
        </div>

        <Stats stats={data.stats} />
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-3">
          <PortfolioTable stocks={data.stocks} />
        </div>
        <div className="lg:col-span-1">
          <section className="bg-surface-container-lowest p-6 rounded-2xl shadow-sm position-absolute">
            <h4 className="font-headline font-bold text-sm mb-4">Portfolio Composition</h4>
            <SectorChart data={sectorData} />

            <div className="space-y-3 mt-6">
              <div className="flex justify-between items-center">
                <span className="text-[11px] font-medium text-slate-500">Total Assets</span>
                <span className="text-[11px] font-bold text-on-surface">{totalAssets} Stocks</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[11px] font-medium text-slate-500">Top Sector</span>
                <span className="text-[11px] font-bold text-secondary">{topSector}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[11px] font-medium text-slate-500">Diversification</span>
                <span className="text-[11px] font-bold text-on-surface">{numSectors} Sectors</span>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
