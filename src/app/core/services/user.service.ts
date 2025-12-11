import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '@environments/environment.development';

@Injectable()
export class UserService {

 path: string = `${environment.auth_back_url}users/`
  private http = inject(HttpClient);

  public activateUser(token: string) {
    return this.http.get(`${this.path}activate-user/${token}`)
  }
}
