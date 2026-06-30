export interface Product {
  id: string;
  name: string;
  sku: string;
  category: 'Bespoke' | 'Heritage' | 'New Arrivals' | 'Accessories';
  price: number;
  stock: number;
  status: 'In Stock' | 'Low Stock' | 'Out of Stock';
  description: string;
  image: string;
  hoverImage?: string;
  colors?: string[];
  sizes?: string[];
}

export interface Transaction {
  id: string;
  productName: string;
  clientName: string;
  amount: number;
  time: string;
  type: 'sale' | 'shipping' | 'registration';
  statusLabel?: string;
  iconName: string;
}

export interface Garment {
  id: string;
  name: string;
  tag: string;
  description: string;
  image: string;
  resultImage: string;
  promptAlt: string;
}

export type ViewMode =
  | 'home'
  | 'shop'
  | 'atelier'
  | 'admin-login'
  | 'admin-dashboard'
  | 'admin-inventory'
  | 'admin-add-product';

export interface CartItem {
  product: Product;
  quantity: number;
  selectedColor?: string;
  selectedSize?: string;
}
