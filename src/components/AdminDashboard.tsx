import { Transaction, Product, ViewMode } from '../types';
import { Sparkles, DollarSign, Eye, ShieldCheck, Mail, QrCode, Plus, ArrowRight, AlertTriangle, Play } from 'lucide-react';

interface AdminDashboardProps {
  products: Product[];
  transactions: Transaction[];
  onNavigate: (view: ViewMode) => void;
}

export default function AdminDashboard({ products, transactions, onNavigate }: AdminDashboardProps) {
  // Compute some real values from local product list for high-fidelity sync
  const lowStockProductsCount = products.filter((p) => p.status === 'Low Stock' || p.stock < 10).length;
  const totalProducts = products.length;

  const handleQuickAction = (action: string) => {
    if (action === 'new-item') {
      onNavigate('admin-add-product');
    } else {
      alert(`Simulation initialized: ${action} protocol active.`);
    }
  };

  return (
    <div className="w-full flex-grow py-8 max-w-7xl mx-auto px-6 md:px-12 animate-fade-in">
      {/* Header & Primary Action */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-neutral-200 pb-6 mb-8">
        <div className="flex flex-col gap-2">
          <h1 className="font-display text-3xl font-semibold text-black tracking-tight">
            Inventory & Performance Overview
          </h1>
          <p className="text-neutral-500 text-sm font-light">
            Monitor real-time virtual try-on telemetry, modify physical boutique inventory, and process bespoke orders.
          </p>
        </div>
        
        <button
          onClick={() => onNavigate('admin-add-product')}
          className="bg-amber-500 hover:bg-amber-400 text-black px-6 py-3 rounded font-display text-xs font-bold uppercase tracking-widest flex items-center gap-2 shadow-md hover:shadow-lg transition-all cursor-pointer"
        >
          <Plus size={16} />
          ADD NEW PRODUCT
        </button>
      </div>

      {/* KPI Cards */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {/* KPI 1: Revenue */}
        <div className="bg-white p-8 rounded-lg shadow-sm border border-neutral-200/50 relative overflow-hidden group">
          <div className="absolute top-4 right-4 p-4 bg-neutral-50 rounded-full text-neutral-400 group-hover:bg-amber-500/10 group-hover:text-amber-500 transition-colors">
            <DollarSign size={28} />
          </div>
          <p className="font-sans text-[10px] tracking-widest font-bold uppercase text-neutral-400 mb-2">
            TOTAL REVENUE (MTD)
          </p>
          <p className="font-display text-3xl font-bold text-black tracking-tight">
            $1,245,800
          </p>
          <div className="mt-6 flex items-center gap-2 text-xs">
            <span className="font-sans text-[10px] tracking-wider font-bold bg-green-50 text-green-700 px-2 py-1 rounded">
              +14.2%
            </span>
            <span className="font-sans text-[9px] tracking-widest font-bold text-neutral-400 uppercase">
              VS LAST MONTH
            </span>
          </div>
        </div>

        {/* KPI 2: Active Try-Ons */}
        <div className="bg-white p-8 rounded-lg shadow-sm border border-neutral-200/50 relative overflow-hidden group">
          <div className="absolute top-4 right-4 p-4 bg-neutral-50 rounded-full text-neutral-400 group-hover:bg-amber-500/10 group-hover:text-amber-500 transition-colors">
            <Sparkles size={28} />
          </div>
          <p className="font-sans text-[10px] tracking-widest font-bold uppercase text-neutral-400 mb-2">
            ACTIVE AI TRY-ONS
          </p>
          <p className="font-display text-3xl font-bold text-black tracking-tight">
            42,912
          </p>
          <div className="mt-6 flex items-center gap-2 text-xs">
            <span className="font-sans text-[10px] tracking-wider font-bold bg-neutral-100 text-neutral-800 px-2 py-1 rounded">
              8 PENDING
            </span>
            <span className="font-sans text-[9px] tracking-widest font-bold text-neutral-400 uppercase">
              ACROSS 3 DIGITAL BOUTIQUES
            </span>
          </div>
        </div>

        {/* KPI 3: Inventory Warning Alerts */}
        <div className="bg-black p-8 rounded-lg shadow-lg border border-neutral-900 relative overflow-hidden group text-white">
          <div className="absolute top-4 right-4 p-4 bg-neutral-900 rounded-full text-amber-500">
            <AlertTriangle size={28} className="animate-pulse" />
          </div>
          <p className="font-sans text-[10px] tracking-widest font-bold uppercase text-amber-400/80 mb-2">
            INVENTORY WARNING ALERTS
          </p>
          <p className="font-display text-3xl font-bold text-white tracking-tight">
            {lowStockProductsCount} Products
          </p>
          <div className="mt-6 flex items-center gap-2 text-xs">
            <span className="font-sans text-[10px] tracking-wider font-bold bg-amber-500/20 text-amber-400 px-2 py-1 rounded uppercase">
              Bespoke Alert
            </span>
            <span className="font-sans text-[9px] tracking-widest font-bold text-neutral-400 uppercase">
              Requires immediate production reorder
            </span>
          </div>
        </div>
      </section>

      {/* Bento Grid Content */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent transactions (2 cols) */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-neutral-200/50 p-6 md:p-8">
          <div className="flex justify-between items-center mb-8 pb-4 border-b border-neutral-100">
            <h3 className="font-display text-lg font-bold text-black uppercase tracking-tight">
              Recent Global Transactions
            </h3>
            <button
              onClick={() => onNavigate('admin-inventory')}
              className="font-sans text-[10px] font-bold uppercase tracking-wider text-neutral-400 hover:text-black transition-colors flex items-center gap-1 cursor-pointer"
            >
              Manage Catalog <ArrowRight size={14} />
            </button>
          </div>

          <div className="space-y-6">
            {transactions.map((tx) => (
              <div key={tx.id} className="flex items-center justify-between group pb-4 border-b border-neutral-50 last:border-0 last:pb-0">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-neutral-50 border border-neutral-100 flex items-center justify-center rounded text-neutral-800 group-hover:bg-black group-hover:text-white transition-all">
                    {tx.type === 'sale' ? (
                      <DollarSign size={18} />
                    ) : tx.type === 'shipping' ? (
                      <Plus size={18} />
                    ) : (
                      <Sparkles size={18} />
                    )}
                  </div>
                  <div className="text-left">
                    <p className="font-display text-xs font-bold text-neutral-950 uppercase tracking-tight">
                      {tx.productName}
                    </p>
                    <p className="text-xs text-neutral-500 font-light mt-0.5">
                      {tx.clientName || tx.statusLabel}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-display text-xs font-bold text-neutral-950">
                    {tx.amount > 0 ? `$${tx.amount.toLocaleString()}` : '--'}
                  </p>
                  <p className="font-sans text-[9px] text-neutral-400 uppercase font-semibold tracking-wider mt-1">
                    {tx.time}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions & Insights (1 col) */}
        <div className="space-y-6">
          {/* Quick Actions widget */}
          <div className="bg-white rounded-xl shadow-sm border border-neutral-200/50 p-6 md:p-8">
            <h3 className="font-display text-lg font-bold text-black uppercase tracking-tight mb-6">
              Tactical Actions
            </h3>
            
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => handleQuickAction('new-item')}
                className="bg-black text-white p-4 rounded flex flex-col items-center justify-center gap-2 hover:bg-neutral-800 transition-colors shadow-sm cursor-pointer group"
              >
                <Plus size={18} className="group-hover:scale-110 transition-transform" />
                <span className="font-sans text-[10px] font-bold uppercase tracking-wider">New Item</span>
              </button>
              
              <button
                onClick={() => handleQuickAction('scan-tag')}
                className="bg-neutral-50 border border-neutral-200 text-black p-4 rounded flex flex-col items-center justify-center gap-2 hover:bg-neutral-100 transition-all shadow-sm cursor-pointer group"
              >
                <QrCode size={18} className="text-amber-600 group-hover:scale-110 transition-transform" />
                <span className="font-sans text-[10px] font-bold uppercase tracking-wider">Scan Tag</span>
              </button>
              
              <button
                onClick={() => handleQuickAction('client-memo')}
                className="border border-neutral-200 bg-transparent text-neutral-800 hover:bg-neutral-50 p-4 rounded flex flex-col items-center justify-center gap-2 transition-colors col-span-2 cursor-pointer"
              >
                <Mail size={18} className="text-neutral-500" />
                <span className="font-sans text-[10px] font-bold uppercase tracking-widest">Draft Client Memo</span>
              </button>
            </div>
          </div>

          {/* Mini Insight widget */}
          <div className="relative bg-neutral-900 rounded-xl shadow-sm border border-neutral-950 p-6 md:p-8 overflow-hidden h-48 group">
            {/* Ambient hotlinked luxury cashmere texture */}
            <div className="absolute inset-0 bg-cover bg-center opacity-30 mix-blend-multiply group-hover:scale-105 transition-transform duration-1000"
              style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAVlwtgdwjXcmlOmw1Pv2bDwACsdgIQx3WYG1AwWMI8Kb0dcLjFlPwd0924myteePJYyssWGh0h1uNFPDr0Oflcui7eo5d9fiKh4PS-99pL5EJDo8mkimkqVabHOCw26FuCsDoqcdftcD0WEpQ6f5Hpa2Rw7CKhmiKIO2XgO01wtcFHsKt--eDl8bUUrPSIxmIIb5SGzVWUTctVCn9Eq2Dlz6rG5g3S23MhOlHhhvyRCwRAnH0BbX7wfBY3lEif5GTHiwKvgzMjUFk')" }}
            />
            <div className="relative z-10 flex flex-col justify-between h-full text-white">
              <h3 className="font-sans text-[10px] font-bold uppercase tracking-[0.2em] text-amber-400">
                Performance Insight
              </h3>
              
              <div>
                <p className="font-display text-2xl font-semibold tracking-tight uppercase leading-tight">
                  Bespoke '24
                </p>
                <p className="font-sans text-[9px] text-neutral-400 tracking-widest font-bold uppercase mt-2">
                  CONSTITUTES 68% OF GLOBAL SALES
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
