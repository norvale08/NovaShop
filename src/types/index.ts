export interface Product {
  id: number;
  name: string;
  author: string;
  price: number;
  oldPrice: number | null;
  description: string;
  images: string[];
  inCart: boolean;
  buttonState: 'buy' | 'processing' | 'in-cart' | 'sold';
}

export interface CartState {
  [productId: number]: boolean;
}
