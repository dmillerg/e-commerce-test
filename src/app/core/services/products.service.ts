import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '@environments/environment.development';
import { Product } from '../models/product';
import { Observable } from 'rxjs';

@Injectable()
export class ProductsService {

  private readonly http = inject(HttpClient);
  private path = environment.fake_url+'products/';

  public getProducts(): Observable<Product[]>{
    return this.http.get<Product[]>(`${this.path}`);
  }

   public getSingleProduct(id: number): Observable<Product>{
    return this.http.get<Product>(`${this.path}${id}`);
  }
}
