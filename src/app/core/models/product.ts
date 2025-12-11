export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
}

export interface ProductCart extends Product {
  productId: number;
  quantity: number;
}