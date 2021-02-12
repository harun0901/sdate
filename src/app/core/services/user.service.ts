import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Chat, SendMessagePayload } from '../models/chat';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';
import { LimitCount, User, UserBasic, UserFact, UserInfo, UserLike } from '../models/user';

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
    const url = `${environment.api}/sdate/user/getById/${customerId}`;
    return this.http.get<User>(url);
  }

  updateUserFact(payload: UserFact, userId: string): Observable<User> {
    const url = `${environment.api}/sdate/user/updateFact/${userId}`;
    return this.http.put<User>(url, payload);
  }

  updateUserBasic(payload: UserBasic, userId: string): Observable<User> {
    const url = `${environment.api}/sdate/user/updateBasic/${userId}`;
    return this.http.put<User>(url, payload);
  }

  updateUserInfo(payload: UserInfo, userId: string): Observable<User> {
    const url = `${environment.api}/sdate/user/updateInfo/${userId}`;
    return this.http.put<User>(url, payload);
  }

  likeUser(payload: UserLike): Observable<User> {
    const url = `${environment.api}/sdate/user/likeUser`;
    return this.http.put<User>(url, payload);
  }

  removeLikeUser(payload: UserLike): Observable<User> {
    const url = `${environment.api}/sdate/user/removeLikeUser`;
    return this.http.put<User>(url, payload);
  }

  getLikedUser(): Observable<User[]> {
    const url = `${environment.api}/sdate/user/getLikedUser`;
    return this.http.get<User[]>(url);
  }

  favoriteUser(payload: UserLike): Observable<User> {
    const url = `${environment.api}/sdate/user/favoriteUser`;
    return this.http.put<User>(url, payload);
  }

  removeFavoriteUser(payload: UserLike): Observable<User> {
    const url = `${environment.api}/sdate/user/removeFavoriteUser`;
    return this.http.put<User>(url, payload);
  }

  getFavoriteUser(): Observable<User[]> {
    const url = `${environment.api}/sdate/user/getFavoriteUser`;
    return this.http.get<User[]>(url);
  }
}
