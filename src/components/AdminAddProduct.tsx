import React, { useState } from 'react';
import { Product, ViewMode } from '../types';
import { ArrowLeft, Plus, Image, Sparkles, Smartphone, Check } from 'lucide-react';

interface AdminAddProductProps {
  onAddProduct: (product: Omit<Product, 'id'>) => void;
  onNavigate: (view: ViewMode) => void;
}

const TEMPLATE_IMAGES = [
  {
    name: 'Obsidian Structured Tote',
    url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBj3iR3FYFuhLvf3ABgZT1fqmFeJW9CZjtkOZND8ek4VfFQTFrCfJAu6p7yuWCeJukHzSmYXuepsX2Ym9AH-SnUZdCZT8Am9aMb3JEw7IBhWkVDGFQ_b-Wip0ju_SrAzkU_rv8StBJbZSL42Mi-Bmu2XwcxicidkECNeFXIBxVceYT6D5Br9RWFrsIobS4dErBc2RQo_aAakC5FeBUC8Y4YVrRMNKmhg4UW2CORdziwK93lPX03SuemRCEAjGSgheKBngPyjkbOHVQ'
  },
  {
    name: 'Handle Closeup',
    url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDaEk7JZsv2HTPS-Lbsa3hRmFFBmVDPse74hSmL0Muwrc1h7f1_joygI6lK7ZztMR89sfJTp4J11G3zsoSiUsKe-c600hTFa8YD_ty_13AY5N4R9p4dGF-J8xiKmlDAkLBAwKXV_q7kGn_gq1ndGTTN4v8kWZn7-RG_TkZGb-FoSh76MeYxTkD7nT317ySyhg2yLrYLjo5MCJLZJjra2ca3pHeCjBCKKfN5i5Ku4HSz9ObAGi5NM-o5TaaM33BCucLvBse_JD2uqi4'
  }
];

export default function AdminAddProduct({ onAddProduct, onNavigate }: AdminAddProductProps) {
  const [name, setName] = useState('Obsidian Structured Tote');
  const [sku, setSku] = useState('MNL-TTE-07');
  const [category, setCategory] = useState<'Bespoke' | 'Heritage' | 'New Arrivals' | 'Accessories'>('Bespoke');
  const [price, setPrice] = useState<number>(1450);
  const [stock, setStock] = useState<number>(24);
  const [description, setDescription] = useState(
    'Stunning, high-end black structured tote bag resting on a white architectural plinth. Exquisite stitching, premium luxurious materials, and precise geometry make this a standout masterpiece.'
  );
  const [imageUrl, setImageUrl] = useState(TEMPLATE_IMAGES[0].url);
  const [customImageUrl, setCustomImageUrl] = useState('');
  const [colors, setColors] = useState<string>('Obsidian Black, Pure Alabaster');
  const [sizes, setSizes] = useState<string>('Medium, Large');

  const activeImage = customImageUrl || imageUrl;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !sku || !price || !activeImage) {
      alert('Please fill out all required fields.');
      return;
    }

    const colorList = colors.split(',').map((c) => c.trim()).filter(Boolean);
    const sizeList = sizes.split(',').map((s) => s.trim()).filter(Boolean);

    onAddProduct({
      name,
      sku,
      category,
      price,
      stock,
      status: stock === 0 ? 'Out of Stock' : stock < 5 ? 'Low Stock' : 'In Stock',
      description,
      image: activeImage,
      colors: colorList,
      sizes: sizeList,
    });

    onNavigate('admin-inventory');
    alert(`Success: "${name}" has been permanently uploaded to the collections catalogue.`);
  };

  return (
    <div className="w-full flex-grow py-8 max-w-7xl mx-auto px-6 md:px-12 animate-fade-in">
      {/* Return button */}
      <button
        onClick={() => onNavigate('admin-inventory')}
        className="mb-6 flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-neutral-400 hover:text-black transition-colors cursor-pointer"
      >
        <ArrowLeft size={16} />
        Back to Inventory
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left Column: Input Form (7 cols) */}
        <form className="lg:col-span-7 bg-white p-6 md:p-8 rounded-xl border border-neutral-200/50 shadow-sm flex flex-col gap-6" onSubmit={handleSubmit}>
          <div>
            <h2 className="font-display text-2xl font-semibold text-black uppercase tracking-tight mb-1">
              Add New Collection Line
            </h2>
            <p className="text-neutral-500 text-xs font-light">
              Add physical pieces, bespoke goods, or accessory lines into the database repository.
            </p>
          </div>

          <div className="h-[1px] bg-neutral-100" />

          {/* Double column input fields */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-bold uppercase tracking-wider text-neutral-400" htmlFor="prod-name">
                Product Name
              </label>
              <input
                id="prod-name"
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="border border-neutral-200 rounded px-3 py-2 text-xs text-neutral-800 focus:outline-none focus:ring-1 focus:ring-amber-500 bg-white"
                placeholder="e.g. Obsidian Structured Tote"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-bold uppercase tracking-wider text-neutral-400" htmlFor="prod-sku">
                SKU Number
              </label>
              <input
                id="prod-sku"
                type="text"
                required
                value={sku}
                onChange={(e) => setSku(e.target.value)}
                className="border border-neutral-200 rounded px-3 py-2 text-xs text-neutral-800 focus:outline-none focus:ring-1 focus:ring-amber-500 bg-white"
                placeholder="e.g. MNL-TTE-07"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-bold uppercase tracking-wider text-neutral-400" htmlFor="prod-category">
                Category
              </label>
              <select
                id="prod-category"
                value={category}
                onChange={(e) => setCategory(e.target.value as any)}
                className="border border-neutral-200 rounded px-3 py-2.5 text-xs text-neutral-800 focus:outline-none focus:ring-1 focus:ring-amber-500 bg-white cursor-pointer"
              >
                <option value="Bespoke">Bespoke</option>
                <option value="Heritage">Heritage</option>
                <option value="New Arrivals">New Arrivals</option>
                <option value="Accessories">Accessories</option>
              </select>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-bold uppercase tracking-wider text-neutral-400" htmlFor="prod-price">
                Boutique Price (USD)
              </label>
              <input
                id="prod-price"
                type="number"
                required
                min="1"
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
                className="border border-neutral-200 rounded px-3 py-2 text-xs text-neutral-800 focus:outline-none focus:ring-1 focus:ring-amber-500 bg-white"
                placeholder="e.g. 1450"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-bold uppercase tracking-wider text-neutral-400" htmlFor="prod-stock">
                Initial Stock count
              </label>
              <input
                id="prod-stock"
                type="number"
                required
                min="0"
                value={stock}
                onChange={(e) => setStock(Number(e.target.value))}
                className="border border-neutral-200 rounded px-3 py-2 text-xs text-neutral-800 focus:outline-none focus:ring-1 focus:ring-amber-500 bg-white"
                placeholder="e.g. 24"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-bold uppercase tracking-wider text-neutral-400" htmlFor="prod-colors">
                Available Colors (Comma Separated)
              </label>
              <input
                id="prod-colors"
                type="text"
                value={colors}
                onChange={(e) => setColors(e.target.value)}
                className="border border-neutral-200 rounded px-3 py-2 text-xs text-neutral-800 focus:outline-none focus:ring-1 focus:ring-amber-500 bg-white"
                placeholder="Obsidian Black, Pure Alabaster"
              />
            </div>

            <div className="flex flex-col gap-1.5 sm:col-span-2">
              <label className="text-[10px] font-bold uppercase tracking-wider text-neutral-400" htmlFor="prod-sizes">
                Available Sizes (Comma Separated)
              </label>
              <input
                id="prod-sizes"
                type="text"
                value={sizes}
                onChange={(e) => setSizes(e.target.value)}
                className="border border-neutral-200 rounded px-3 py-2 text-xs text-neutral-800 focus:outline-none focus:ring-1 focus:ring-amber-500 bg-white"
                placeholder="Medium, Large"
              />
            </div>
          </div>

          {/* Description Textarea */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] font-bold uppercase tracking-wider text-neutral-400" htmlFor="prod-description">
              Artisanal Description
            </label>
            <textarea
              id="prod-description"
              required
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="border border-neutral-200 rounded px-3 py-2 text-xs text-neutral-800 focus:outline-none focus:ring-1 focus:ring-amber-500 bg-white resize-none"
              placeholder="Provide premium copy describing materials, silhouette, and design intention..."
            />
          </div>

          {/* Image Selectors */}
          <div className="flex flex-col gap-3">
            <label className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">
              Select High-End Image Template
            </label>
            
            <div className="grid grid-cols-2 gap-3">
              {TEMPLATE_IMAGES.map((img) => {
                const isSelected = activeImage === img.url;
                return (
                  <button
                    key={img.name}
                    type="button"
                    onClick={() => {
                      setImageUrl(img.url);
                      setCustomImageUrl('');
                    }}
                    className={`p-1 text-left rounded border transition-all flex flex-col cursor-pointer ${
                      isSelected ? 'border-amber-500 bg-amber-50/20' : 'border-neutral-200 hover:border-neutral-400'
                    }`}
                  >
                    <div className="w-full aspect-[2/1] rounded overflow-hidden relative">
                      <img src={img.url} className="w-full h-full object-cover" alt={img.name} referrerPolicy="no-referrer" />
                      {isSelected && (
                        <span className="absolute top-1 right-1 bg-amber-500 text-black p-0.5 rounded-full">
                          <Check size={10} />
                        </span>
                      )}
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-tight mt-1 text-neutral-600 block px-1 truncate">
                      {img.name}
                    </span>
                  </button>
                );
              })}
            </div>

            <div className="flex flex-col gap-1.5 mt-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">
                Or Provide Custom Image URL:
              </span>
              <input
                type="text"
                value={customImageUrl}
                onChange={(e) => setCustomImageUrl(e.target.value)}
                className="border border-neutral-200 rounded px-3 py-2 text-xs text-neutral-800 focus:outline-none focus:ring-1 focus:ring-amber-500 bg-white"
                placeholder="https://example.com/my-luxury-product.jpg"
              />
            </div>
          </div>

          <div className="h-[1px] bg-neutral-100 my-2" />

          {/* Create Button */}
          <button
            type="submit"
            className="w-full py-4 rounded bg-black hover:bg-neutral-800 text-white font-display text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2 shadow-md transition-colors cursor-pointer"
          >
            <Plus size={14} />
            Publish Collection Line
          </button>
        </form>

        {/* Right Column: Live Storefront Mockup Preview (5 cols) */}
        <div className="lg:col-span-5 flex flex-col items-center">
          <div className="mb-4 inline-flex items-center gap-2 text-neutral-400">
            <Smartphone size={16} />
            <span className="font-sans text-[10px] font-bold uppercase tracking-widest">
              Live Phone Mockup Preview
            </span>
          </div>

          {/* Smartphone device body container */}
          <div className="w-[320px] h-[640px] border-[8px] border-neutral-900 rounded-[36px] overflow-hidden relative shadow-2xl bg-neutral-50 dark:bg-neutral-950 flex flex-col justify-between">
            {/* Camera notch */}
            <div className="absolute top-2 left-1/2 -translate-x-1/2 w-24 h-4 bg-neutral-900 rounded-full z-30" />

            {/* Inner Phone screen content */}
            <div className="flex-grow overflow-y-auto pt-6 pb-4 flex flex-col">
              {/* Fake status bar */}
              <div className="h-6 flex justify-between items-center px-6 text-[9px] font-mono text-neutral-400 uppercase tracking-wider">
                <span>12:00 UTC</span>
                <span>MONOLITH PREVIEW</span>
              </div>

              {/* Mock product card */}
              <div className="px-4 flex-grow flex flex-col justify-center">
                <div className="bg-white dark:bg-neutral-900 rounded-xl overflow-hidden border border-neutral-200/50 dark:border-neutral-800/50 shadow-sm flex flex-col">
                  {/* Image area */}
                  <div className="aspect-[1/1.1] w-full relative bg-neutral-100 dark:bg-neutral-800">
                    {activeImage ? (
                      <img
                        src={activeImage}
                        alt="Storefront Preview"
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex flex-col items-center justify-center text-neutral-300">
                        <Image size={32} />
                        <span className="text-[10px] uppercase font-bold mt-1">No Image Selected</span>
                      </div>
                    )}
                    <span className="absolute top-3 left-3 bg-neutral-950/80 backdrop-blur-md text-white text-[8px] uppercase tracking-widest font-semibold px-2 py-0.5 rounded-sm">
                      {category}
                    </span>
                  </div>

                  {/* Details */}
                  <div className="p-4 text-left">
                    <div className="flex justify-between items-start">
                      <h3 className="font-display text-xs font-semibold text-black dark:text-white uppercase tracking-tight truncate max-w-[160px]">
                        {name || 'Product Title'}
                      </h3>
                      <span className="font-mono text-xs font-bold text-neutral-800 dark:text-neutral-200">
                        ${price.toLocaleString()}
                      </span>
                    </div>

                    <p className="text-[9px] font-mono text-neutral-400 uppercase tracking-widest mt-0.5 mb-2">
                      SKU: {sku || 'MNL-TTE-00'}
                    </p>

                    <p className="text-[10px] text-neutral-500 dark:text-neutral-400 font-light line-clamp-3 leading-relaxed">
                      {description || 'Provide an exquisite design description...'}
                    </p>

                    <div className="mt-4 pt-3 border-t border-neutral-100 dark:border-neutral-800 flex justify-between items-center text-[9px] text-neutral-400 font-bold uppercase tracking-wider">
                      <span>Status: <strong className="text-green-600">{stock > 0 ? 'In Stock' : 'Out of Stock'}</strong></span>
                      <span className="flex items-center gap-0.5">
                        Details <Sparkles size={9} />
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Simulated home indicator */}
            <div className="h-4 flex items-center justify-center bg-transparent pb-1">
              <div className="w-20 h-1 bg-neutral-300 rounded-full" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
