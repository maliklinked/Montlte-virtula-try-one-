import { useState } from 'react';
import { ViewMode, CartItem } from '../types';
import { ShoppingBag, Heart, User, Menu, X, ShieldAlert } from 'lucide-react';

interface HeaderProps {
  currentView: ViewMode;
  onNavigate: (view: ViewMode) => void;
  cart: CartItem[];
  favoritesCount: number;
  onOpenCart: () => void;
  onOpenFavorites: () => void;
}

export default function Header({
  currentView,
  onNavigate,
  cart,
  favoritesCount,
  onOpenCart,
  onOpenFavorites,
}: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const cartItemsCount = cart.reduce((total, item) => total + item.quantity, 0);

  const handleNavClick = (view: ViewMode) => {
    onNavigate(view);
    setMobileMenuOpen(false);
  };

  const navLinks = [
    { view: 'home' as ViewMode, label: 'Collection Home' },
    { view: 'shop' as ViewMode, label: 'Shop Catalog' },
    { view: 'atelier' as ViewMode, label: 'Bespoke AI Atelier' },
  ];

  return (
    <>
      <nav
        id="main-nav"
        className="fixed top-0 w-full z-50 bg-[#F5F2ED]/90 backdrop-blur-xl border-b border-[#1A1A1A]/10 transition-all duration-300"
      >
        <div className="flex justify-between items-center w-full px-4 md:px-12 py-4 max-w-7xl mx-auto">
          {/* Brand */}
          <button
            onClick={() => handleNavClick('home')}
            className="font-serif italic text-2xl md:text-3xl tracking-tight text-[#1A1A1A] cursor-pointer"
          >
            MONOLITH
          </button>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center space-x-10">
            {navLinks.map((link) => {
              const isActive = currentView === link.view;
              return (
                <button
                  key={link.view}
                  onClick={() => handleNavClick(link.view)}
                  className={`font-sans text-[11px] uppercase tracking-[0.2em] font-medium transition-all duration-300 cursor-pointer ${
                    isActive
                      ? 'text-[#1A1A1A] border-b border-[#1A1A1A] pb-1 font-bold'
                      : 'text-[#1A1A1A]/50 hover:text-[#1A1A1A] pb-1'
                  }`}
                >
                  {link.label}
                </button>
              );
            })}
          </div>

          {/* Trailing Actions */}
          <div className="flex items-center space-x-6 text-[#1A1A1A]">
            {/* Quick access to admin panel */}
            <button
              onClick={() => handleNavClick(currentView.startsWith('admin-') ? 'home' : 'admin-login')}
              title="Admin Panel"
              className={`p-1.5 rounded-full transition-colors ${
                currentView.startsWith('admin-')
                  ? 'bg-[#1A1A1A] text-[#F5F2ED] font-semibold'
                  : 'hover:bg-[#1A1A1A]/5'
              }`}
            >
              <ShieldAlert size={19} />
            </button>

            <button
              onClick={onOpenFavorites}
              aria-label="Favorites"
              className="relative p-1 hover:scale-95 transition-transform duration-200 cursor-pointer"
            >
              <Heart size={20} className={favoritesCount > 0 ? 'fill-[#1A1A1A] text-[#1A1A1A]' : ''} />
              {favoritesCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#1A1A1A] text-[#F5F2ED] text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                  {favoritesCount}
                </span>
              )}
            </button>

            <button
              onClick={onOpenCart}
              aria-label="Shopping Bag"
              className="relative p-1 hover:scale-95 transition-transform duration-200 cursor-pointer"
            >
              <ShoppingBag size={20} />
              {cartItemsCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#1A1A1A] text-[#F5F2ED] text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                  {cartItemsCount}
                </span>
              )}
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-1 hover:scale-95 transition-transform duration-200 cursor-pointer"
              aria-label="Menu"
            >
              <Menu size={22} />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-40 bg-[#F5F2ED]/95 backdrop-blur-3xl flex flex-col items-center justify-center transition-transform duration-500 md:hidden ${
          mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <button
          onClick={() => setMobileMenuOpen(false)}
          className="absolute top-6 right-6 p-2 text-[#1A1A1A]"
        >
          <X size={28} />
        </button>
        <div className="flex flex-col gap-8 text-center w-full px-6">
          <div className="font-serif italic text-4xl tracking-tight text-[#1A1A1A] mb-6">
            MONOLITH
          </div>
          {navLinks.map((link) => {
            const isActive = currentView === link.view;
            return (
              <button
                key={link.view}
                onClick={() => handleNavClick(link.view)}
                className={`font-sans text-xl font-medium tracking-[0.1em] uppercase transition-colors cursor-pointer ${
                  isActive ? 'text-[#1A1A1A] underline' : 'text-[#1A1A1A]/60 hover:text-[#1A1A1A]'
                }`}
              >
                {link.label}
              </button>
            );
          })}
          <div className="h-[1px] bg-[#1A1A1A]/10 my-4" />
          <button
            onClick={() => handleNavClick('admin-login')}
            className="font-sans text-xs uppercase tracking-[0.2em] text-[#1A1A1A]/50 hover:text-[#1A1A1A] transition-colors"
          >
            Access Monolith Admin Console
          </button>
        </div>
      </div>
    </>
  );
}
