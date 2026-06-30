import { ViewMode } from '../types';
import { Bell, ShieldCheck, LogOut } from 'lucide-react';

interface AdminHeaderProps {
  currentView: ViewMode;
  onNavigate: (view: ViewMode) => void;
  onLogout: () => void;
}

export default function AdminHeader({ currentView, onNavigate, onLogout }: AdminHeaderProps) {
  return (
    <header className="w-full bg-white border-b border-neutral-200 py-4 px-6 md:px-12 sticky top-0 z-40 flex justify-between items-center shadow-sm">
      {/* Brand logo & active route info */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => onNavigate('admin-dashboard')}
          className="font-display text-xl font-bold tracking-tighter text-black uppercase cursor-pointer"
        >
          MONOLITH
        </button>
        <span className="h-4 w-[1px] bg-neutral-300 hidden sm:block" />
        <span className="font-sans text-[10px] tracking-widest font-bold uppercase text-neutral-400 hidden sm:block">
          Administrative Control Portal
        </span>
      </div>

      {/* Trailing Controls */}
      <div className="flex items-center gap-6">
        {/* Toggle between admin sections */}
        <nav className="hidden md:flex gap-4">
          <button
            onClick={() => onNavigate('admin-dashboard')}
            className={`font-sans text-[10px] tracking-widest font-bold uppercase transition-colors px-2 py-1 rounded cursor-pointer ${
              currentView === 'admin-dashboard' ? 'text-amber-600 bg-amber-50' : 'text-neutral-500 hover:text-black'
            }`}
          >
            Dashboard
          </button>
          
          <button
            onClick={() => onNavigate('admin-inventory')}
            className={`font-sans text-[10px] tracking-widest font-bold uppercase transition-colors px-2 py-1 rounded cursor-pointer ${
              currentView === 'admin-inventory' || currentView === 'admin-add-product'
                ? 'text-amber-600 bg-amber-50'
                : 'text-neutral-500 hover:text-black'
            }`}
          >
            Inventory
          </button>
          
          <button
            onClick={() => onNavigate('home')}
            className="font-sans text-[10px] tracking-widest font-bold uppercase text-neutral-500 hover:text-black px-2 py-1 rounded cursor-pointer"
          >
            Live Store
          </button>
        </nav>

        {/* Notifications and profile */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => alert('All administrative systems are operating within perfect security parameters.')}
            className="text-neutral-500 hover:text-black p-1.5 rounded-full hover:bg-neutral-100 transition-colors cursor-pointer relative"
          >
            <Bell size={18} />
            <span className="absolute top-1 right-1 w-1.5 h-1.5 bg-amber-500 rounded-full"></span>
          </button>

          {/* User Profile */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-neutral-100 overflow-hidden border border-neutral-200">
              <img
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDDUMWYNakt_j_9aloooDNNnAi7XAY0E1xW9-0GEngBir1bAbfLjv1LalPwhm35fiL92JWM9BpRuwIMz5s0KESFFSpm7vDTvvzcAo5_n_HxWMMnL6bbDldD6HQWerANAG8Pwni6MnM8wT2Kvrg1CG0jcs6_uV-MF1W7H_mRCAdGjfFeCO7NbuQPq2NMrqC3SzRzM_Eha_PSMZE3ZR_2gB1zoPKdafJ92y4N1q2HGEQgg_l5k6cYAdQppDHGP-BYOrSt84_CeDJqRAs"
                alt="A. Director Profile"
              />
            </div>
            <div className="hidden sm:flex flex-col text-left">
              <span className="font-display text-[11px] font-bold uppercase text-black">A. Director</span>
              <span className="font-mono text-[8px] text-neutral-400 font-semibold tracking-wider">ADMINISTRATOR</span>
            </div>
          </div>

          {/* Logout Action */}
          <button
            onClick={onLogout}
            title="Secure Logout"
            className="p-1.5 rounded text-neutral-400 hover:text-red-500 hover:bg-neutral-100 transition-colors cursor-pointer"
          >
            <LogOut size={16} />
          </button>
        </div>
      </div>
    </header>
  );
}
