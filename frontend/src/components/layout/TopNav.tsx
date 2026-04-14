"use client";

export default function TopNav() {
  return (
    <header className="bg-[#f7f9fb] sticky top-0 z-30 flex justify-between items-center w-full px-8 py-3">
      <div className="flex items-center bg-[#f0f4f7] px-3 py-1.5 rounded-lg w-72">
        <span className="material-symbols-outlined text-slate-400 text-lg mr-2">search</span>
        <input 
          className="bg-transparent border-none focus:ring-0 text-sm w-full font-headline font-semibold tracking-tight text-[#565e74] placeholder-slate-400 outline-none" 
          placeholder="Search assets, sectors..." 
          type="text"
        />
      </div>
      
      <div className="flex items-center gap-6">
        <div className="flex gap-4 items-center">
          <button className="text-slate-500 hover:text-primary transition-colors flex items-center gap-1.5 font-headline font-semibold text-sm">
            <span className="material-symbols-outlined text-lg">support</span>
            Support
          </button>
          <div className="w-px h-4 bg-slate-200"></div>
          <button className="relative text-[#565e74]">
            <span className="material-symbols-outlined">notifications</span>
            <span className="absolute -top-1 -right-1 w-2 h-2 bg-tertiary rounded-full border-2 border-[#f7f9fb]"></span>
          </button>
        </div>
        
        <div className="flex items-center gap-3 pl-4 border-l border-slate-200">
          <div className="text-right">
            <p className="text-xs font-bold text-[#565e74]">Marcus Aurelius</p>
            <p className="text-[10px] text-slate-500 font-medium">Platinum Member</p>
          </div>
          <img 
            alt="User profile avatar" 
            className="w-9 h-9 rounded-full object-cover" 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuC3jMIKNQqYT66FdF75iWdN6mmI2nnuxQO3SXsGfapbEK_6sZnx7B_WaBmIYTCf91vlQT2tRSlWm7tHNjuFf_bdeOwxpymaEfYQ4GJg450HDCQkpSmIFf2ukPhH8wu2mWuzrBxpXVERUl5OjUMgI6FL1HE453lvjF2YnlnIjaHKK5QTvu74n99xH65aVjozjEYrs9RBqlUD1AfRWp-vSPYDuBgtqysWAQQZs-BW8yL5U2Y1PIHYJmX_BTuHamJi0aveM0NyDPGUaf07"
          />
        </div>
      </div>
    </header>
  );
}
