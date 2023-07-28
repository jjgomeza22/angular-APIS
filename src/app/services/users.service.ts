import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { CreatedUserDTO, User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  API_URL: string = `${environment.API_URL}/api`;

  constructor(
    private http: HttpClient,
  ) { }

  create(dto: CreatedUserDTO) {
    return this.http.post<User>(`${this.API_URL}/user`, dto);
  }

  getAll() {
    return this.http.get<User>(`${this.API_URL}/user`);
  }
}
