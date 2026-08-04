export interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  images: string[];
  inCart: boolean;
  buttonState: 'buy' | 'processing' | 'in-cart';
}

export interface CartState {
  [productId: number]: boolean;
}
