import {  ProductCart } from "./product";

export interface Cart {
    id?: number;
    userId: number;
    products: ProductCart[];
}