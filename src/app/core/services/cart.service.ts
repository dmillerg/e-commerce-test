import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Cart } from '../models/cart';
import { Observable } from 'rxjs';
import { environment } from '@environments/environment.development';

@Injectable()
export class CartService {

  private readonly http = inject(HttpClient);
  private readonly path: string = environment.fake_url + 'carts/'

  public getCart(id: number): Observable<Cart>{
    return this.http.get<Cart>(`${this.path}${id}`)
  }

}
