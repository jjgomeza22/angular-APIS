import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Auth } from '../models/auth.model';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  API_URL: string = `${environment.API_URL}/api/auth`;

  constructor(
    private http: HttpClient,
  ) { }

  login(email: string, password: string) {
    return this.http.post<Auth>(`${this.API_URL}/login`, {email, password});
  }

  profile(token: string) {
    return this.http.get<User>(`${this.API_URL}/login`, {
      headers: {
        Autorization: `Bearer ${token}`,
      }
    });
  }
}
