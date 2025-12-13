import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '@environments/environment.development';
import { User } from '../models/user';
import { Observable } from 'rxjs';

@Injectable(
  {
    providedIn:'root'
  }
)
export class UserService {

  private readonly path: string = `${environment.auth_back_url}users/`
  private http = inject(HttpClient);

  public activateUser(token: string) {
    return this.http.get(`${this.path}activate-user/${token}`)
  }

  public getUserData(): Observable<User> {
    return this.http.get<User>(`${this.path}get-one`)
  }

  public refreshToken(): Observable<any> {
    const storage = sessionStorage.getItem('auth') ?? '{}';
    const refresh_token = JSON.parse(storage)?.refresh_token
    return this.http.post<User>(`${this.path}refresh`, { refresh_token });
  }

    public update(user: User): Observable<User> {
    return this.http.put<User>(`${this.path}update/${user.id}`, user);
  }
}
