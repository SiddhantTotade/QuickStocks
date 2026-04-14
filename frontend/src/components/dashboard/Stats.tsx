"use client";

interface PortfolioStats {
  totalInvestment: number;
  totalPresentValue: number;
  totalGainLoss: number;
  totalGainLossPercent: number;
}

interface StatsProps {
  stats: PortfolioStats;
}

export default function Stats({ stats }: StatsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-10">
      <div className="bg-surface-container-lowest p-5 rounded-xl shadow-sm border-l-4 border-primary">
        <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2">Total Investment</p>
        <p className="text-xl font-headline font-bold text-money">₹{stats.totalInvestment.toLocaleString("en-IN", { maximumFractionDigits: 0 })}</p>
      </div>

      <div className="bg-surface-container-lowest p-5 rounded-xl shadow-sm border-l-4 border-primary">
        <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2">Present Value</p>
        <p className="text-xl font-headline font-bold text-money">₹{stats.totalPresentValue.toLocaleString("en-IN", { maximumFractionDigits: 0 })}</p>
      </div>

      <div className="bg-surface-container-lowest p-5 rounded-xl shadow-sm border-l-4 border-primary">
        <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2">Unrealized P&L</p>
        <p className="text-xl font-headline font-bold text-money">
          {stats.totalGainLoss >= 0 ? "+" : "-"}₹{Math.abs(stats.totalGainLoss).toLocaleString("en-IN", { maximumFractionDigits: 0 })}
        </p>
      </div>

      <div className="bg-surface-container-lowest p-5 rounded-xl shadow-sm border-l-4 border-primary">
        <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2">Net Return</p>
        <p className="text-xl font-headline font-bold text-money">
          {stats.totalGainLossPercent >= 0 ? "+" : ""}{stats.totalGainLossPercent.toFixed(2)}%
        </p>
      </div>
    </div>
  );
}
