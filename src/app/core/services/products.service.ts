import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '@environments/environment.development';
import { Product } from '../models/product';
import { Observable } from 'rxjs';

@Injectable()
export class ProductsService {

  private readonly http = inject(HttpClient);
  private path = environment.products_url;

  public getProducts(): Observable<Product[]>{
    return this.http.get<Product[]>(`${this.path}`);
  }
}
