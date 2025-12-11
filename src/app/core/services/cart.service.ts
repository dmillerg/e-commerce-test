import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Cart } from '../models/cart';
import { Observable } from 'rxjs';

@Injectable()
export class CartService {

  private readonly http = inject(HttpClient);
  private readonly path: string = 'https://fakestoreapi.com/carts/'

  public getCart(id: number): Observable<Cart>{
    return this.http.get<Cart>(`${this.path}${id}`)
  }

}
