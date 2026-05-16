import { Bell, Search, UserCircle, ChevronDown } from 'lucide-react';

export function TopNav() {
  return (
    <header className="flex h-16 items-center justify-between border-b border-slate-800/60 bg-[#020617]/80 backdrop-blur-md px-6 sticky top-0 z-50">
      <div className="flex flex-1 items-center">
        <div className="relative w-full max-w-md group">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <Search className="h-4 w-4 text-slate-500 group-focus-within:text-teal-400 transition-colors" />
          </div>
          <input
            type="text"
            className="block w-full rounded-xl border border-slate-800 bg-slate-900/50 py-2 pl-10 pr-3 text-slate-200 placeholder:text-slate-500 focus:border-teal-500/50 focus:bg-slate-900 focus:outline-none focus:ring-1 focus:ring-teal-500/50 text-sm transition-all"
            placeholder="Pesquisar clientes, posts..."
          />
        </div>
      </div>
      <div className="flex items-center gap-5">
        <button className="relative text-slate-400 hover:text-teal-400 transition-colors">
          <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-teal-500 text-[10px] font-bold text-slate-950">
            3
          </span>
          <Bell className="h-5 w-5" />
        </button>
        <div className="flex items-center gap-3 pl-5 border-l border-slate-800">
          <div className="bg-slate-800/50 px-4 py-1.5 rounded-lg border border-slate-700 flex items-center gap-2 hidden md:flex cursor-pointer hover:bg-slate-800 transition-colors">
            <span className="text-sm text-slate-400">Cliente:</span>
            <span className="text-sm font-semibold text-white">Aura Cosméticos</span>
            <ChevronDown className="w-3 h-3 text-slate-400" />
          </div>
          <div className="h-9 w-9 rounded-full border border-teal-500/50 p-0.5 ml-2 cursor-pointer">
            <div className="h-full w-full rounded-full bg-slate-800 flex items-center justify-center overflow-hidden">
                <UserCircle className="h-full w-full text-slate-400" />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
