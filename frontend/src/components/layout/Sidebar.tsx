"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { name: "Summary", icon: "dashboard", href: "#", active: true },
  { name: "Markets", icon: "show_chart", href: "#" },
  { name: "Watchlist", icon: "star", href: "#" },
  { name: "Settings", icon: "settings", href: "#" },
];

export default function Sidebar() {
  return (
    <aside className="bg-[#f7f9fb] border-r border-[#f0f4f7] fixed left-0 h-screen w-64 z-40 hidden md:flex flex-col py-6 px-4 space-y-2">
      <div className="px-4 mb-8">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
            <span className="material-symbols-outlined text-white text-lg font-variation-FILL">account_balance</span>
          </div>
          <div>
            <h1 className="font-headline font-bold text-lg text-[#565e74]">Editorial</h1>
            <p className="text-[10px] uppercase tracking-widest text-slate-500">Wealth Management</p>
          </div>
        </div>
      </div>
      
      <nav className="flex-1 space-y-1">
        {navItems.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className={`flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all duration-200 ${
              item.active 
                ? "text-[#565e74] bg-[#f0f4f7] font-semibold translate-x-1" 
                : "text-slate-500 hover:text-[#565e74] hover:bg-[#f0f4f7]/50"
            }`}
          >
            <span className="material-symbols-outlined">{item.icon}</span>
            <span className="font-sans text-[13px] font-medium">{item.name}</span>
          </Link>
        ))}
      </nav>

      <div className="pt-4 border-t border-[#f0f4f7] space-y-1">
        <button className="w-full mb-4 py-2.5 bg-gradient-to-r from-primary to-primary-dim text-white rounded-lg font-headline font-semibold text-sm shadow-sm active:scale-[0.98] transition-all">
          New Trade
        </button>
        <Link href="#" className="flex items-center gap-3 px-4 py-2 text-slate-500 hover:text-[#565e74] transition-colors">
          <span className="material-symbols-outlined text-sm">help</span>
          <span className="font-sans text-[13px] font-medium">Help Center</span>
        </Link>
        <Link href="#" className="flex items-center gap-3 px-4 py-2 text-slate-500 hover:text-tertiary transition-colors">
          <span className="material-symbols-outlined text-sm">logout</span>
          <span className="font-sans text-[13px] font-medium">Logout</span>
        </Link>
      </div>
    </aside>
  );
}
