import React, { useState, useMemo } from 'react';
import { Product, CartItem } from '../types';
import { Search, SlidersHorizontal, Check, ShoppingCart, Eye, Heart, X, Sparkles } from 'lucide-react';

interface ShopCatalogProps {
  products: Product[];
  onAddToCart: (product: Product, color: string, size: string) => void;
  favorites: string[];
  onToggleFavorite: (id: string) => void;
}

export default function ShopCatalog({
  products,
  onAddToCart,
  favorites,
  onToggleFavorite,
}: ShopCatalogProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All Collections');
  const [selectedStatus, setSelectedStatus] = useState<string>('All Statuses');
  const [maxPrice, setMaxPrice] = useState<number>(4000);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Modal active options
  const [activeColor, setActiveColor] = useState<string>('');
  const [activeSize, setActiveSize] = useState<string>('');

  // Filtering products
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch =
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.sku.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory =
        selectedCategory === 'All Collections' || product.category === selectedCategory;

      const matchesStatus =
        selectedStatus === 'All Statuses' || product.status === selectedStatus;

      const matchesPrice = product.price <= maxPrice;

      return matchesSearch && matchesCategory && matchesStatus && matchesPrice;
    });
  }, [products, searchQuery, selectedCategory, selectedStatus, maxPrice]);

  const handleOpenProduct = (product: Product) => {
    setSelectedProduct(product);
    setActiveColor(product.colors?.[0] || '');
    setActiveSize(product.sizes?.[0] || '');
  };

  const handleAddToCart = (product: Product) => {
    onAddToCart(product, activeColor || 'Default', activeSize || 'One Size');
    setSelectedProduct(null);
  };

  const handleQuickAdd = (e: React.MouseEvent, product: Product) => {
    e.stopPropagation();
    if (product.status === 'Out of Stock') return;
    onAddToCart(product, product.colors?.[0] || 'Default', product.sizes?.[0] || 'One Size');
  };

  return (
    <div className="bg-[#F5F2ED] min-h-screen pt-28 pb-20 text-[#1A1A1A]">
      <div className="max-w-7xl mx-auto px-4 md:px-12">
        {/* Editorial Heading */}
        <div className="mb-12 text-center max-w-2xl mx-auto">
          <p className="font-sans text-xs uppercase tracking-[0.3em] text-[#1A1A1A]/70 font-bold mb-3">Shop Catalog</p>
          <h1 className="font-serif italic text-4xl md:text-5xl text-[#1A1A1A] mb-4">
            Monolith Editions
          </h1>
          <p className="font-sans text-[#1A1A1A]/80 font-light text-sm leading-relaxed">
            Every piece is meticulously numbered and tailored. Designed with brutalist geometries, engineered to endure.
          </p>
        </div>

        {/* Filters and Controls */}
        <div className="bg-[#E0DDD8]/30 p-6 mb-8 flex flex-col lg:flex-row gap-6 items-center justify-between shadow-sm border border-[#1A1A1A]/10">
          {/* Search Bar */}
          <div className="relative w-full lg:w-96">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#1A1A1A]/50" size={17} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-[#F5F2ED] border border-[#1A1A1A]/10 text-[#1A1A1A] focus:outline-none focus:ring-1 focus:ring-[#1A1A1A] placeholder:text-[#1A1A1A]/40 font-sans text-xs rounded-none"
              placeholder="Search by product, SKU, fabric..."
            />
          </div>

          {/* Filter drop downs */}
          <div className="flex flex-wrap items-center gap-4 w-full lg:w-auto justify-end">
            <div className="flex items-center gap-2">
              <span className="font-sans text-[10px] uppercase tracking-[0.2em] text-[#1A1A1A]/60 font-bold">Category:</span>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="bg-[#F5F2ED] border border-[#1A1A1A]/10 text-[#1A1A1A] py-2 px-3 rounded-none font-sans text-xs font-semibold cursor-pointer focus:outline-none focus:ring-1 focus:ring-[#1A1A1A]"
              >
                <option>All Collections</option>
                <option>Bespoke</option>
                <option>Heritage</option>
                <option>New Arrivals</option>
                <option>Accessories</option>
              </select>
            </div>

            <div className="flex items-center gap-2">
              <span className="font-sans text-[10px] uppercase tracking-[0.2em] text-[#1A1A1A]/60 font-bold">Status:</span>
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="bg-[#F5F2ED] border border-[#1A1A1A]/10 text-[#1A1A1A] py-2 px-3 rounded-none font-sans text-xs font-semibold cursor-pointer focus:outline-none focus:ring-1 focus:ring-[#1A1A1A]"
              >
                <option>All Statuses</option>
                <option>In Stock</option>
                <option>Low Stock</option>
                <option>Out of Stock</option>
              </select>
            </div>

            {/* Price Slider */}
            <div className="flex items-center gap-3 bg-[#F5F2ED] px-4 py-1.5 border border-[#1A1A1A]/10">
              <span className="font-sans text-[10px] uppercase tracking-[0.2em] text-[#1A1A1A]/60 font-bold">Max Price:</span>
              <input
                type="range"
                min="200"
                max="4000"
                step="50"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-24 accent-[#1A1A1A]"
              />
              <span className="font-mono text-xs text-[#1A1A1A] font-semibold">${maxPrice}</span>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-20 bg-[#E0DDD8]/20 border border-[#1A1A1A]/10">
            <SlidersHorizontal className="mx-auto text-[#1A1A1A]/30 mb-4" size={48} />
            <h3 className="font-serif italic text-xl mb-1 text-[#1A1A1A]">No archives found</h3>
            <p className="text-[#1A1A1A]/60 text-xs max-w-sm mx-auto">
              Try relaxing your filters or typing a different search phrase to browse the database.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {filteredProducts.map((product) => {
              const isFavorite = favorites.includes(product.id);
              return (
                <div
                  key={product.id}
                  onClick={() => handleOpenProduct(product)}
                  className="group bg-[#E0DDD8]/20 overflow-hidden border border-[#1A1A1A]/10 hover:shadow-2xl transition-all duration-300 flex flex-col justify-between cursor-pointer"
                >
                  {/* Product Image area */}
                  <div className="aspect-[1/1.25] w-full overflow-hidden relative bg-[#E0DDD8]">
                    <img
                      src={product.image}
                      alt={product.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover transform group-hover:scale-102 transition-transform duration-700 grayscale-[10%]"
                    />

                    {/* Category Label */}
                    <span className="absolute top-3 left-3 bg-[#1A1A1A]/90 text-[#F5F2ED] text-[8px] uppercase tracking-[0.2em] font-bold px-2 py-1 rounded-none">
                      {product.category}
                    </span>

                    {/* Stock Warning Badge */}
                    {product.status === 'Low Stock' && (
                      <span className="absolute top-3 right-3 bg-[#1A1A1A] text-[#F5F2ED] text-[8px] uppercase tracking-[0.2em] font-bold px-2 py-1 rounded-none">
                        Low Stock
                      </span>
                    )}
                    {product.status === 'Out of Stock' && (
                      <span className="absolute top-3 right-3 bg-[#E0DDD8] text-[#1A1A1A]/50 text-[8px] uppercase tracking-[0.2em] font-bold px-2 py-1 rounded-none border border-[#1A1A1A]/10">
                        Sold Out
                      </span>
                    )}

                    {/* Favorite Heart Button */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggleFavorite(product.id);
                      }}
                      className="absolute bottom-3 right-3 p-2 bg-[#F5F2ED]/90 shadow-md hover:scale-110 active:scale-95 transition-all text-[#1A1A1A]"
                    >
                      <Heart size={14} className={isFavorite ? 'fill-[#1A1A1A] text-[#1A1A1A]' : ''} />
                    </button>

                    {/* Quick Add overlay on Hover */}
                    {product.status !== 'Out of Stock' && (
                      <div className="absolute inset-x-0 bottom-0 p-4 translate-y-12 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 bg-gradient-to-t from-[#1A1A1A]/30 via-transparent to-transparent flex gap-2">
                        <button
                          onClick={(e) => handleQuickAdd(e, product)}
                          className="w-full bg-[#1A1A1A]/90 hover:bg-[#1A1A1A] text-[#F5F2ED] font-bold text-[9px] uppercase py-3 px-4 tracking-[0.2em] flex items-center justify-center gap-2"
                        >
                          <ShoppingCart size={12} />
                          Quick Add
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Metadata and Pricing */}
                  <div className="p-5 flex-grow flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-sans text-xs font-bold text-[#1A1A1A]/90 group-hover:text-[#1A1A1A] uppercase tracking-[0.05em] leading-snug">
                          {product.name}
                        </h3>
                        <span className="font-mono text-xs font-bold text-[#1A1A1A] ml-2">
                          ${product.price.toLocaleString()}
                        </span>
                      </div>
                      <p className="text-[#1A1A1A]/50 text-[9px] uppercase tracking-wider font-mono mb-2">
                        SKU: {product.sku}
                      </p>
                      <p className="text-[#1A1A1A]/70 text-xs line-clamp-2 leading-relaxed">
                        {product.description}
                      </p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-[#1A1A1A]/10 flex justify-between items-center text-[10px] text-[#1A1A1A]/50 uppercase tracking-[0.1em] font-bold">
                      <span>Status: <strong className={product.status === 'In Stock' ? 'text-green-800' : product.status === 'Low Stock' ? 'text-amber-800' : 'text-[#1A1A1A]/40'}>{product.status}</strong></span>
                      <span className="flex items-center gap-1 hover:text-[#1A1A1A] transition-colors">
                        Details
                        <Eye size={12} />
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Product Detail Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 z-50 overflow-hidden flex items-center justify-center">
          {/* Backdrop overlay */}
          <div
            className="absolute inset-0 bg-[#1A1A1A]/40 backdrop-blur-sm"
            onClick={() => setSelectedProduct(null)}
          />

          <div className="relative bg-[#F5F2ED] max-w-4xl w-full mx-4 overflow-hidden shadow-2xl border border-[#1A1A1A]/15 animate-fade-in z-10 rounded-none">
            {/* Close button */}
            <button
              onClick={() => setSelectedProduct(null)}
              className="absolute top-4 right-4 p-2 bg-[#E0DDD8]/80 hover:bg-[#E0DDD8] text-[#1A1A1A] z-10 transition-colors cursor-pointer"
            >
              <X size={18} />
            </button>

            <div className="grid grid-cols-1 md:grid-cols-2">
              {/* Product Visual Area */}
              <div className="aspect-square bg-[#E0DDD8] relative">
                <img
                  src={selectedProduct.image}
                  alt={selectedProduct.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover grayscale-[10%]"
                />
                <div className="absolute top-4 left-4 bg-[#1A1A1A] text-[#F5F2ED] text-[8px] font-bold uppercase tracking-[0.2em] px-3 py-1 flex items-center gap-1 shadow-md">
                  <Sparkles size={11} />
                  ARTISANAL STUDY
                </div>
              </div>

              {/* Product Info & Configurations */}
              <div className="p-8 md:p-10 flex flex-col justify-between">
                <div>
                  <span className="text-[10px] uppercase tracking-[0.2em] text-[#1A1A1A]/60 font-bold font-mono">
                    {selectedProduct.category} Catalog Line
                  </span>
                  
                  <h2 className="font-serif italic text-2xl md:text-3xl text-[#1A1A1A] mt-1">
                    {selectedProduct.name}
                  </h2>
                  
                  <p className="font-mono text-lg text-[#1A1A1A] font-bold mt-2">
                    ${selectedProduct.price.toLocaleString()} USD
                  </p>
                  
                  <p className="text-[9px] text-[#1A1A1A]/50 uppercase tracking-[0.15em] font-bold mt-1">
                    SKU Number: {selectedProduct.sku}
                  </p>

                  <div className="my-6 h-[1px] bg-[#1A1A1A]/10" />

                  <p className="text-[#1A1A1A]/80 text-xs leading-relaxed font-light">
                    {selectedProduct.description}
                  </p>

                  {/* Colors Selectors */}
                  {selectedProduct.colors && selectedProduct.colors.length > 0 && (
                    <div className="mt-6">
                      <label className="block text-[9px] font-bold uppercase tracking-[0.2em] text-[#1A1A1A]/60 mb-2">
                        Select Finish / Color:
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {selectedProduct.colors.map((color) => (
                          <button
                            key={color}
                            onClick={() => setActiveColor(color)}
                            className={`px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider transition-all cursor-pointer rounded-none border ${
                              activeColor === color
                                ? 'bg-[#1A1A1A] text-[#F5F2ED] border-[#1A1A1A] shadow-sm'
                                : 'border-[#1A1A1A]/20 text-[#1A1A1A]/60 hover:border-[#1A1A1A]'
                            }`}
                          >
                            {color}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Sizes Selectors */}
                  {selectedProduct.sizes && selectedProduct.sizes.length > 0 && (
                    <div className="mt-4">
                      <label className="block text-[9px] font-bold uppercase tracking-[0.2em] text-[#1A1A1A]/60 mb-2">
                        Select Dimension / Size:
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {selectedProduct.sizes.map((size) => (
                          <button
                            key={size}
                            onClick={() => setActiveSize(size)}
                            className={`px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider transition-all cursor-pointer rounded-none border ${
                              activeSize === size
                                ? 'bg-[#1A1A1A] text-[#F5F2ED] border-[#1A1A1A] shadow-sm'
                                : 'border-[#1A1A1A]/20 text-[#1A1A1A]/60 hover:border-[#1A1A1A]'
                            }`}
                          >
                            {size}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Adding to Cart Actions */}
                <div className="mt-8 pt-6 border-t border-[#1A1A1A]/10 flex gap-4">
                  {selectedProduct.status === 'Out of Stock' ? (
                    <button
                      disabled
                      className="w-full py-4 bg-[#E0DDD8] text-[#1A1A1A]/40 font-bold text-xs uppercase tracking-[0.2em] rounded-none cursor-not-allowed border border-[#1A1A1A]/10"
                    >
                      Product Currently Sold Out
                    </button>
                  ) : (
                    <button
                      onClick={() => handleAddToCart(selectedProduct)}
                      className="w-full py-4 bg-[#1A1A1A] text-[#F5F2ED] hover:bg-[#1A1A1A]/95 transition-colors duration-300 font-bold text-xs uppercase tracking-[0.2em] flex items-center justify-center gap-2 cursor-pointer shadow-md rounded-none border border-[#1A1A1A]"
                    >
                      <ShoppingCart size={14} />
                      Purchase & Add To Bag
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
