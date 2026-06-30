import { useState, useMemo } from 'react';
import { Product, ViewMode } from '../types';
import { Edit3, Trash2, Plus, Search, Layers, ShoppingBag, ShieldAlert } from 'lucide-react';

interface AdminInventoryProps {
  products: Product[];
  onNavigate: (view: ViewMode) => void;
  onDeleteProduct: (id: string) => void;
}

export default function AdminInventory({ products, onNavigate, onDeleteProduct }: AdminInventoryProps) {
  const [searchQuery, setSearchQuery] = useState('');

  // Filtering products list
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      return (
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.sku.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
    });
  }, [products, searchQuery]);

  const handleDelete = (id: string, name: string) => {
    if (confirm(`Are you sure you want to permanently delete the "${name}" product line?`)) {
      onDeleteProduct(id);
    }
  };

  return (
    <div className="w-full flex-grow py-8 max-w-7xl mx-auto px-6 md:px-12 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-neutral-200 pb-6 mb-8">
        <div className="flex flex-col gap-2">
          <h1 className="font-display text-3xl font-semibold text-black tracking-tight uppercase">
            Product Lines Inventory
          </h1>
          <p className="text-neutral-500 text-sm font-light">
            Manage the boutique catalog. Create luxury variants, alter prices, and audit active stock levels.
          </p>
        </div>

        <button
          onClick={() => onNavigate('admin-add-product')}
          className="bg-black text-white hover:bg-neutral-800 px-6 py-3 rounded font-display text-xs font-bold uppercase tracking-widest flex items-center gap-2 shadow-md hover:shadow-lg transition-colors cursor-pointer"
        >
          <Plus size={16} />
          Create New Line
        </button>
      </div>

      {/* Stats and Search bar */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
        <div className="flex items-center gap-4 text-xs font-semibold text-neutral-400 uppercase tracking-widest bg-neutral-100 px-4 py-2 rounded-full w-full md:w-auto">
          <span>Active Collection Total: <strong className="text-black">{products.length} Items</strong></span>
        </div>

        <div className="relative w-full md:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" size={16} />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-neutral-200 bg-white rounded text-neutral-800 focus:outline-none focus:ring-1 focus:ring-amber-500 placeholder:text-neutral-400 text-xs"
            placeholder="Search catalog by product name, SKU..."
          />
        </div>
      </div>

      {/* Grid List view of Inventory */}
      <div className="bg-white rounded-xl border border-neutral-200 shadow-sm overflow-hidden">
        {filteredProducts.length === 0 ? (
          <div className="text-center py-20">
            <Layers className="mx-auto text-neutral-200 mb-4" size={48} />
            <h3 className="font-display text-lg font-bold text-black uppercase mb-1">No item lines found</h3>
            <p className="text-neutral-500 text-xs max-w-xs mx-auto">
              Please adjust your search filter or add a brand new item variant to populate the list.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-neutral-100 bg-neutral-50 font-sans text-[10px] tracking-widest text-neutral-400 font-bold uppercase">
                  <th className="py-4 px-6">Product Details</th>
                  <th className="py-4 px-4">Line Category</th>
                  <th className="py-4 px-4 text-right">Price (USD)</th>
                  <th className="py-4 px-4 text-center">Remaining Stock</th>
                  <th className="py-4 px-4 text-center">Status</th>
                  <th className="py-4 px-6 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100 text-xs font-sans text-neutral-800">
                {filteredProducts.map((product) => {
                  return (
                    <tr key={product.id} className="hover:bg-neutral-50/50 transition-colors">
                      {/* Product details cell */}
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-neutral-50 border border-neutral-100 rounded overflow-hidden relative">
                            <img
                              src={product.image}
                              alt={product.name}
                              referrerPolicy="no-referrer"
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="text-left">
                            <p className="font-display text-xs font-bold text-black uppercase">
                              {product.name}
                            </p>
                            <p className="text-[10px] font-mono text-neutral-400 mt-0.5">
                              SKU: {product.sku}
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* Category cell */}
                      <td className="py-4 px-4 font-semibold text-neutral-500 uppercase">
                        {product.category}
                      </td>

                      {/* Price cell */}
                      <td className="py-4 px-4 text-right font-mono font-bold text-black">
                        ${product.price.toLocaleString()}
                      </td>

                      {/* Stock cell */}
                      <td className="py-4 px-4 text-center font-mono font-semibold">
                        {product.stock} Units
                      </td>

                      {/* Status label cell */}
                      <td className="py-4 px-4 text-center">
                        <span
                          className={`text-[9px] uppercase font-bold px-2 py-1 rounded ${
                            product.status === 'In Stock'
                              ? 'bg-green-50 text-green-700 border border-green-200'
                              : product.status === 'Low Stock'
                              ? 'bg-amber-50 text-amber-700 border border-amber-200'
                              : 'bg-neutral-100 text-neutral-500 border border-neutral-200'
                          }`}
                        >
                          {product.status}
                        </span>
                      </td>

                      {/* Actions cell */}
                      <td className="py-4 px-6 text-center">
                        <div className="flex items-center justify-center gap-3">
                          <button
                            onClick={() => {
                              alert(`Edit mode for "${product.name}" is simulated. Under construction.`);
                            }}
                            title="Edit Line"
                            className="p-1.5 rounded hover:bg-neutral-100 text-neutral-500 hover:text-black transition-colors cursor-pointer"
                          >
                            <Edit3 size={15} />
                          </button>
                          
                          <button
                            onClick={() => handleDelete(product.id, product.name)}
                            title="Delete Line"
                            className="p-1.5 rounded hover:bg-red-50 text-neutral-400 hover:text-red-600 transition-colors cursor-pointer"
                          >
                            <Trash2 size={15} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
