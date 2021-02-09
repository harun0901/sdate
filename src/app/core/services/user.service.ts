import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Chat, SendMessagePayload } from '../models/chat';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';
import { LimitCount, User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<User[]> {
    const url = `${environment.api}/sdate/user/getAll`;
    return this.http.get<User[]>(url);
  }

  getRandomUserByLimit(payload: LimitCount): Observable<User[]> {
    const url = `${environment.api}/sdate/user/getRandomUserByLimit`;
    return this.http.post<User[]>(url, payload);
  }

  getById(customerId): Observable<User> {
    const url = `${environment.api}/sdate/user/${customerId}`;
    return this.http.get<User>(url);
  }
}
