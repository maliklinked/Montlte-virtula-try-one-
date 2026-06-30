import { useState } from 'react';
import { ViewMode, Product, CartItem, Transaction } from './types';
import { INITIAL_PRODUCTS, INITIAL_TRANSACTIONS } from './data';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import ShopCatalog from './components/ShopCatalog';
import VirtualAtelier from './components/VirtualAtelier';
import AdminLogin from './components/AdminLogin';
import AdminHeader from './components/AdminHeader';
import AdminDashboard from './components/AdminDashboard';
import AdminInventory from './components/AdminInventory';
import AdminAddProduct from './components/AdminAddProduct';
import { ShoppingBag, X, Heart, ShieldAlert, CheckCircle, Trash2 } from 'lucide-react';

export default function App() {
  const [currentView, setCurrentView] = useState<ViewMode>('home');
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [transactions, setTransactions] = useState<Transaction[]>(INITIAL_TRANSACTIONS);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [favoritesOpen, setFavoritesOpen] = useState(false);
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);

  // Cart operations
  const handleAddToCart = (product: Product, color: string, size: string) => {
    setCart((prevCart) => {
      const existingIndex = prevCart.findIndex(
        (item) =>
          item.product.id === product.id &&
          item.selectedColor === color &&
          item.selectedSize === size
      );

      if (existingIndex > -1) {
        const nextCart = [...prevCart];
        nextCart[existingIndex].quantity += 1;
        return nextCart;
      }

      return [...prevCart, { product, quantity: 1, selectedColor: color, selectedSize: size }];
    });
    setCartOpen(true);
  };

  const handleRemoveFromCart = (index: number) => {
    setCart((prevCart) => prevCart.filter((_, i) => i !== index));
  };

  // Atelier purchase action directly to cart
  const handleAtelierPurchase = (name: string, price: number, image: string) => {
    const bespokeProduct: Product = {
      id: `bespoke-${Date.now()}`,
      name,
      sku: 'MNL-BSPK-01',
      category: 'Bespoke',
      price,
      stock: 1,
      status: 'In Stock',
      description: 'Bespoke garment customized in the Neural Atelier.',
      image,
    };
    handleAddToCart(bespokeProduct, 'Bespoke Fit', 'Tailored');
  };

  // Favorite operations
  const handleToggleFavorite = (id: string) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((favId) => favId !== id) : [...prev, id]
    );
  };

  // Admin inventory operations
  const handleDeleteProduct = (id: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  const handleAddProduct = (newProduct: Omit<Product, 'id'>) => {
    const productWithId: Product = {
      ...newProduct,
      id: `custom-${Date.now()}`,
    };
    setProducts((prev) => [productWithId, ...prev]);

    // Push simulated transaction log for audit trail
    const newTx: Transaction = {
      id: `tx-${Date.now()}`,
      productName: `New Item Registered: ${newProduct.name}`,
      clientName: 'Audit System Log',
      amount: 0,
      time: 'JUST NOW',
      type: 'registration',
      statusLabel: `SKU: ${newProduct.sku}`,
      iconName: 'inventory',
    };
    setTransactions((prev) => [newTx, ...prev]);
  };

  // Navigation controller with admin safeguards
  const handleNavigate = (view: ViewMode) => {
    if (view.startsWith('admin-') && !isAdminAuthenticated) {
      setCurrentView('admin-login');
    } else {
      setCurrentView(view);
    }
    // Auto-scroll to top of viewport
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAdminLoginSuccess = () => {
    setIsAdminAuthenticated(true);
    setCurrentView('admin-dashboard');
  };

  const handleAdminLogout = () => {
    setIsAdminAuthenticated(false);
    setCurrentView('home');
  };

  // Calculate cart subtotal
  const cartSubtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  // Check if current view is an Admin Portal view
  const isAdminView = currentView.startsWith('admin-') && currentView !== 'admin-login';

  return (
    <div className="min-h-screen bg-[#F5F2ED] text-[#1A1A1A] font-sans selection:bg-[#1A1A1A] selection:text-[#F5F2ED] transition-colors duration-300 pt-16">
      {/* Navigation Headers */}
      {isAdminView ? (
        <AdminHeader
          currentView={currentView}
          onNavigate={handleNavigate}
          onLogout={handleAdminLogout}
        />
      ) : currentView === 'admin-login' ? null : (
        <Header
          currentView={currentView}
          onNavigate={handleNavigate}
          cart={cart}
          favoritesCount={favorites.length}
          onOpenCart={() => setCartOpen(true)}
          onOpenFavorites={() => setFavoritesOpen(true)}
        />
      )}

      {/* Render Main Content Screen */}
      <main className="w-full">
        {currentView === 'home' && <HeroSection onNavigate={handleNavigate} />}
        
        {currentView === 'shop' && (
          <ShopCatalog
            products={products}
            onAddToCart={handleAddToCart}
            favorites={favorites}
            onToggleFavorite={handleToggleFavorite}
          />
        )}
        
        {currentView === 'atelier' && (
          <VirtualAtelier onAddToCart={handleAtelierPurchase} />
        )}
        
        {currentView === 'admin-login' && (
          <AdminLogin
            onNavigate={handleNavigate}
            onLoginSuccess={handleAdminLoginSuccess}
          />
        )}
        
        {currentView === 'admin-dashboard' && (
          <AdminDashboard
            products={products}
            transactions={transactions}
            onNavigate={handleNavigate}
          />
        )}
        
        {currentView === 'admin-inventory' && (
          <AdminInventory
            products={products}
            onNavigate={handleNavigate}
            onDeleteProduct={handleDeleteProduct}
          />
        )}
        
        {currentView === 'admin-add-product' && (
          <AdminAddProduct
            onAddProduct={handleAddProduct}
            onNavigate={handleNavigate}
          />
        )}
      </main>

      {/* Sliding Luxury Shopping Bag Drawer */}
      {cartOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          <div className="absolute inset-0 bg-[#1A1A1A]/40 backdrop-blur-sm" onClick={() => setCartOpen(false)} />
          <div className="absolute inset-y-0 right-0 max-w-md w-full bg-[#F5F2ED] shadow-2xl border-l border-[#1A1A1A]/10 flex flex-col justify-between animate-fade-in">
            {/* Header */}
            <div className="p-6 border-b border-[#1A1A1A]/10 flex justify-between items-center">
              <div className="flex items-center gap-2">
                <ShoppingBag size={18} className="text-[#1A1A1A]" />
                <h3 className="font-sans text-xs font-bold text-[#1A1A1A] uppercase tracking-[0.2em]">
                  YOUR BAG
                </h3>
              </div>
              <button onClick={() => setCartOpen(false)} className="p-1 hover:bg-[#1A1A1A]/5 rounded text-[#1A1A1A]/65 cursor-pointer">
                <X size={20} />
              </button>
            </div>

            {/* List */}
            <div className="flex-grow overflow-y-auto p-6 space-y-6">
              {cart.length === 0 ? (
                <div className="text-center py-20">
                  <ShoppingBag className="mx-auto text-[#1A1A1A]/10 mb-4" size={48} />
                  <p className="font-sans text-xs font-bold text-[#1A1A1A]/50 uppercase tracking-[0.1em]">Your Bag is Empty</p>
                  <button
                    onClick={() => {
                      setCartOpen(false);
                      handleNavigate('shop');
                    }}
                    className="mt-4 text-[10px] font-bold text-[#1A1A1A] uppercase tracking-[0.2em] hover:underline"
                  >
                    Browse Collections
                  </button>
                </div>
              ) : (
                cart.map((item, index) => (
                  <div key={`${item.product.id}-${index}`} className="flex items-start justify-between border-b border-[#1A1A1A]/5 pb-4 last:border-0 last:pb-0">
                    <div className="flex gap-4 text-left">
                      <div className="w-16 h-20 bg-[#E0DDD8] rounded overflow-hidden relative border border-[#1A1A1A]/10">
                        <img src={item.product.image} className="w-full h-full object-cover grayscale-[15%]" alt={item.product.name} referrerPolicy="no-referrer" />
                      </div>
                      <div>
                        <p className="font-sans text-xs font-bold text-[#1A1A1A] uppercase tracking-tight">
                          {item.product.name}
                        </p>
                        <p className="font-mono text-[9px] text-[#1A1A1A]/60 uppercase mt-0.5">
                          Variant: {item.selectedColor} • Size: {item.selectedSize}
                        </p>
                        <p className="font-sans text-xs text-[#1A1A1A]/60 mt-2">
                          Qty: {item.quantity} × ${item.product.price.toLocaleString()}
                        </p>
                      </div>
                    </div>
                    <div className="text-right flex flex-col items-end justify-between h-20">
                      <p className="font-mono text-xs font-bold text-[#1A1A1A]">
                        ${(item.product.price * item.quantity).toLocaleString()}
                      </p>
                      <button
                        onClick={() => handleRemoveFromCart(index)}
                        className="text-[#1A1A1A]/40 hover:text-red-500 p-1 rounded hover:bg-[#1A1A1A]/5 transition-all cursor-pointer"
                        title="Remove item"
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Checkout Area */}
            {cart.length > 0 && (
              <div className="p-6 bg-[#E0DDD8] border-t border-[#1A1A1A]/10 space-y-4">
                <div className="flex justify-between items-center text-sm">
                  <span className="font-sans text-[10px] uppercase tracking-[0.2em] text-[#1A1A1A]/60 font-bold">Subtotal:</span>
                  <span className="font-mono text-base font-bold text-[#1A1A1A]">${cartSubtotal.toLocaleString()} USD</span>
                </div>
                <div className="flex justify-between items-center text-[10px] text-[#1A1A1A]/60 uppercase tracking-[0.2em] font-bold border-b border-[#1A1A1A]/10 pb-2">
                  <span>Shipping:</span>
                  <span className="text-green-800 font-bold">Complimentary</span>
                </div>
                
                <button
                  onClick={() => {
                    alert('Checkout system initialized. A luxury representative has been notified of your premium request.');
                    setCart([]);
                    setCartOpen(false);
                  }}
                  className="w-full py-4 bg-[#1A1A1A] text-[#F5F2ED] hover:bg-[#1A1A1A]/90 font-sans text-xs font-bold uppercase tracking-[0.2em] shadow-md transition-colors cursor-pointer"
                >
                  REQUEST DISPATCH
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Sliding Favorites Drawer */}
      {favoritesOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          <div className="absolute inset-0 bg-[#1A1A1A]/40 backdrop-blur-sm" onClick={() => setFavoritesOpen(false)} />
          <div className="absolute inset-y-0 right-0 max-w-md w-full bg-[#F5F2ED] shadow-2xl border-l border-[#1A1A1A]/10 flex flex-col justify-between animate-fade-in">
            {/* Header */}
            <div className="p-6 border-b border-[#1A1A1A]/10 flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Heart size={18} className="text-[#1A1A1A] fill-[#1A1A1A]" />
                <h3 className="font-sans text-xs font-bold text-[#1A1A1A] uppercase tracking-[0.2em]">
                  FAVORITES
                </h3>
              </div>
              <button onClick={() => setFavoritesOpen(false)} className="p-1 hover:bg-[#1A1A1A]/5 rounded text-[#1A1A1A]/65 cursor-pointer">
                <X size={20} />
              </button>
            </div>

            {/* List */}
            <div className="flex-grow overflow-y-auto p-6 space-y-6">
              {favorites.length === 0 ? (
                <div className="text-center py-20">
                  <Heart className="mx-auto text-[#1A1A1A]/10 mb-4" size={48} />
                  <p className="font-sans text-xs font-semibold text-[#1A1A1A]/50 uppercase tracking-[0.1em]">No Saved Items</p>
                  <p className="text-xs text-[#1A1A1A]/60 mt-1 font-light">Click the heart button on items in the catalog to save them here.</p>
                </div>
              ) : (
                products
                  .filter((p) => favorites.includes(p.id))
                  .map((product) => (
                    <div key={product.id} className="flex items-center justify-between border-b border-[#1A1A1A]/5 pb-4 last:border-0 last:pb-0">
                      <div className="flex gap-4 text-left">
                        <div className="w-16 h-20 bg-[#E0DDD8] rounded overflow-hidden relative border border-[#1A1A1A]/10">
                          <img src={product.image} className="w-full h-full object-cover grayscale-[15%]" alt={product.name} referrerPolicy="no-referrer" />
                        </div>
                        <div>
                          <p className="font-sans text-xs font-bold text-[#1A1A1A] uppercase tracking-tight">
                            {product.name}
                          </p>
                          <p className="font-mono text-[9px] text-[#1A1A1A]/60 uppercase mt-0.5">
                            SKU: {product.sku}
                          </p>
                          <p className="font-mono text-xs text-[#1A1A1A] font-bold mt-2">
                            ${product.price.toLocaleString()}
                          </p>
                        </div>
                      </div>
                      <div className="flex flex-col gap-2">
                        <button
                          onClick={() => {
                            handleAddToCart(product, product.colors?.[0] || 'Default', product.sizes?.[0] || 'One Size');
                            setFavoritesOpen(false);
                          }}
                          className="bg-[#1A1A1A] text-[#F5F2ED] text-[9px] font-bold uppercase tracking-[0.2em] px-3 py-1.5 rounded cursor-pointer hover:opacity-90"
                        >
                          View Line
                        </button>
                        <button
                          onClick={() => handleToggleFavorite(product.id)}
                          className="text-red-600 hover:text-red-700 text-[9px] uppercase font-bold text-center"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  ))
              )}
            </div>

            {/* Footer */}
            <div className="p-6 bg-[#E0DDD8] border-t border-[#1A1A1A]/10">
              <button
                onClick={() => setFavoritesOpen(false)}
                className="w-full py-4 border border-[#1A1A1A] text-[#1A1A1A] font-sans text-xs font-bold uppercase tracking-[0.2em] hover:bg-[#1A1A1A]/5 transition-colors cursor-pointer"
              >
                Close Favorites
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Decorative Brand Margins Footer */}
      <footer className="w-full bg-[#E0DDD8] py-16 border-t border-[#1A1A1A]/15 z-10 relative text-[#1A1A1A]">
        <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-3 gap-12 items-center text-[#1A1A1A]/80 text-xs">
          <div className="text-left">
            <h4 className="font-serif italic text-2xl text-[#1A1A1A] tracking-tight mb-4">MONOLITH</h4>
            <p className="text-[#1A1A1A]/70 leading-relaxed max-w-xs font-light">
              Designing mathematically perfect garments with physical-virtual style replicator engines. Milan • Paris • New York.
            </p>
          </div>
          
          <div className="flex flex-col gap-3 font-semibold uppercase tracking-[0.15em] text-center text-[10px]">
            <button onClick={() => handleNavigate('home')} className="hover:text-[#1A1A1A]/60 transition-colors cursor-pointer">Collection Home</button>
            <button onClick={() => handleNavigate('shop')} className="hover:text-[#1A1A1A]/60 transition-colors cursor-pointer">Shop Catalog</button>
            <button onClick={() => handleNavigate('atelier')} className="hover:text-[#1A1A1A]/60 transition-colors cursor-pointer">Bespoke AI Atelier</button>
          </div>

          <div className="text-right text-[#1A1A1A]/60 font-mono text-[9px] tracking-widest uppercase">
            <p>© 2026 MONOLITH BOUTIQUE. ALL RIGHTS RESERVED.</p>
            <p className="mt-2 text-[#1A1A1A]/80 font-sans font-bold tracking-wider">AUTHENTIC REPLICATORS SECURITY ACTIVE</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
