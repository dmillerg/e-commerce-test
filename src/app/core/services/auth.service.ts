import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '@environments/environment.development';
import { User } from '../models/user';
import { map, Observable } from 'rxjs';

@Injectable()
export class AuthService {

 private readonly path: string = `${environment.auth_back_url}auth/`
  private http = inject(HttpClient);

  public login(credential: { email: string, password: string }): Observable<User> {
    return this.http.post<User>(`${this.path}login`, credential);
  }

  public refreshToken(): Observable<any> {
    const storage = localStorage.getItem('user') ?? sessionStorage.getItem('user') ?? '{}';
    const refresh_token = JSON.parse(storage)?.refreshToken
    return this.http.post<User>(`${this.path}refresh`, { refresh_token });
  }

  public register(formData: FormData): Observable<User> {
    return this.http.post<User>(`${this.path}register`, formData);
  }

  public changePasword(data: { password: string, confirm: string, token: string }) {
    return this.http.post(`${this.path}change-password`, data);
  }

  public getTokenChangePassword(email: string) {
    return this.http.post(`${this.path}get-token-change-password/`, { email, callbackUrl: 'http://localhost:4200/auth/change-password' });
  }
}
