"use client";

export default function MobileNav() {
  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-[#f7f9fb] flex justify-around items-center h-16 shadow-[0_-4px_20px_rgba(0,0,0,0.05)] z-50">
      <button className="flex flex-col items-center gap-1 text-[#565e74]">
        <span className="material-symbols-outlined text-2xl">dashboard</span>
        <span className="text-[10px] font-semibold">Summary</span>
      </button>
      <button className="flex flex-col items-center gap-1 text-slate-500">
        <span className="material-symbols-outlined text-2xl">show_chart</span>
        <span className="text-[10px] font-medium">Markets</span>
      </button>
      <button className="flex flex-col items-center gap-1 text-slate-500">
        <span className="material-symbols-outlined text-2xl">star</span>
        <span className="text-[10px] font-medium">Watchlist</span>
      </button>
      <button className="flex flex-col items-center gap-1 text-slate-500">
        <span className="material-symbols-outlined text-2xl">settings</span>
        <span className="text-[10px] font-medium">Settings</span>
      </button>
    </nav>
  );
}
