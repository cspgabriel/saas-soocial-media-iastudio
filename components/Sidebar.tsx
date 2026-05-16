import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Users, CalendarDays, Sparkles, PieChart, Settings, Calculator } from 'lucide-react';

const navigation = [
  { name: 'Dashboard', href: '/', icon: LayoutDashboard },
  { name: 'Clientes', href: '/clients', icon: Users },
  { name: 'Calendário', href: '/planner', icon: CalendarDays },
  { name: 'AI Generator', href: '/ai', icon: Sparkles },
  { name: 'Relatórios', href: '/reports', icon: PieChart },
  { name: 'Calculadoras', href: '/calculators', icon: Calculator },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 flex flex-col gap-6 bg-white border-r border-slate-200/60 p-4 shrink-0 transition-all z-20">
      <div className="flex items-center gap-3 px-2 mt-2">
        <div className="w-10 h-10 accent-gradient rounded-xl flex items-center justify-center font-bold text-white text-xl shadow-lg shadow-teal-500/20">S</div>
        <h1 className="text-xl font-bold tracking-tight text-slate-800">SocialOS</h1>
      </div>
      <nav className="flex flex-col gap-2 mt-4 flex-1">
        {navigation.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                isActive
                  ? 'bg-teal-50 text-teal-700 border border-teal-100 shadow-sm'
                  : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900 border border-transparent'
              }`}
            >
              <item.icon className={`h-5 w-5 ${isActive ? 'opacity-80' : 'opacity-60'}`} />
              <span className="font-medium text-sm tracking-wide">{item.name}</span>
            </Link>
          );
        })}
      </nav>
      
      <div className="mt-auto flex flex-col gap-2">
        <div className="p-4 bento-card border-dashed border-slate-300">
          <p className="text-xs text-slate-500 mb-2 font-semibold tracking-wider">PLANO PRO</p>
          <p className="text-sm font-medium text-slate-700">8/10 Clientes ativos</p>
          <div className="w-full bg-slate-100 h-1.5 rounded-full mt-3 overflow-hidden">
            <div className="accent-gradient h-full w-[80%] rounded-full shadow-[0_0_10px_rgba(45,212,191,0.5)]"></div>
          </div>
        </div>
        
        <Link
          href="/settings"
          className="flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-slate-500 hover:bg-slate-50 hover:text-slate-900 mt-2"
        >
          <Settings className="h-5 w-5 opacity-60" />
          <span className="font-medium text-sm tracking-wide">Configurações</span>
        </Link>
      </div>
    </aside>
  );
}
