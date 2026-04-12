export type ProductSpec = {
  label: string;
  value: string;
};

export type Review = {
  author: string;
  role: string;
  rating: number;
  text: string;
};

export type Product = {
  id: string;
  slug: string;
  name: string;
  category: string;
  type: string;
  badge?: string;
  brand: string;
  price: number;
  oldPrice?: number;
  rating: number;
  reviewCount: number;
  colorTone: string;
  shortDescription: string;
  description: string;
  features: string[];
  specs: ProductSpec[];
  gallery: string[];
  relatedSlugs: string[];
  reviews: Review[];
};

export type CartItem = {
  productId: string;
  quantity: number;
};

export type FakeUser = {
  fullName: string;
  email: string;
  password: string;
  createdAt: string;
};

export type Order = {
  id: string;
  createdAt: string;
  total: number;
  itemCount: number;
  customerName: string;
  note: string;
  paymentSummary: string;
};
