import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SearchService } from './search.service';
import { environment } from '../../../environments/environment';
import {
  LimitCount,
  User,
  UserBasic,
  UserFact,
  UserInfo,
  UserId,
  SearchKey,
  UpdatePasswordPayload,
  UpdateUserPayload,
} from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http: HttpClient,
    private searchService: SearchService,
  ) { }

  getAll(): Observable<User[]> {
    const url = `${environment.api}/sdate/user/getAll`;
    return this.http.get<User[]>(url);
  }

  userCreateAnalyze(): Observable<any> {
    const url = `${environment.api}/sdate/user/userCreateAnalyze`;
    return this.http.get<any>(url);
  }

  getOnlineUserCount(): Observable<number> {
    const url = `${environment.api}/sdate/user/getOnlineUserCount`;
    return this.http.get<number>(url);
  }

  getFakeUserCount(): Observable<number> {
    const url = `${environment.api}/sdate/user/getFakeUserCount`;
    return this.http.get<number>(url);
  }

  getCustomerCount(): Observable<number> {
    const url = `${environment.api}/sdate/user/getCustomerCount`;
    return this.http.get<number>(url);
  }

  getRandomUserByLimit(payload: SearchKey): Observable<User[]> {
    const url = `${environment.api}/sdate/user/getRandomUserByLimit`;
    return this.http.post<User[]>(url, payload);
  }

  generateFaker(payload: UserId): Observable<User> {
    const url = `${environment.api}/sdate/user/generateFaker`;
    return this.http.post<User>(url, payload);
  }

  getById(customerId): Observable<User> {
    const url = `${environment.api}/sdate/user/getById/${customerId}`;
    return this.http.get<User>(url);
  }

  updateAll(payload: UpdateUserPayload): Observable<User> {
    const url = `${environment.api}/sdate/user/updateAll`;
    return this.http.put<User>(url, payload);
  }

  updatePassword(payload: UpdatePasswordPayload): Observable<User> {
    const url = `${environment.api}/sdate/user/updatePassword`;
    return this.http.put<User>(url, payload);
  }

  deleteUser(payload: UserId): Observable<User> {
    const url = `${environment.api}/sdate/user/deleteUser`;
    return this.http.post<User>(url, payload);
  }

  updateAvatar(payload: UserId): Observable<User> {
    const url = `${environment.api}/sdate/user/updateAvatar`;
    return this.http.put<User>(url, payload);
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

  likeUser(payload: UserId): Observable<User> {
    const url = `${environment.api}/sdate/user/likeUser`;
    return this.http.put<User>(url, payload);
  }

  removeLikeUser(payload: UserId): Observable<User> {
    const url = `${environment.api}/sdate/user/removeLikeUser`;
    return this.http.put<User>(url, payload);
  }

  getLikedUser(): Observable<User[]> {
    const url = `${environment.api}/sdate/user/getLikedUser`;
    return this.http.post<User[]>(url, this.searchService.searchKey);
  }

  getVisitUser(): Observable<User[]> {
    const url = `${environment.api}/sdate/user/getVisitUser`;
    return this.http.post<User[]>(url, this.searchService.searchKey);
  }

  getFavoriteUser(): Observable<User[]> {
    const url = `${environment.api}/sdate/user/getFavoriteUser`;
    return this.http.post<User[]>(url, this.searchService.searchKey);
  }

  favoriteUser(payload: UserId): Observable<User> {
    const url = `${environment.api}/sdate/user/favoriteUser`;
    return this.http.put<User>(url, payload);
  }

  removeFavoriteUser(payload: UserId): Observable<User> {
    const url = `${environment.api}/sdate/user/removeFavoriteUser`;
    return this.http.put<User>(url, payload);
  }

  blockUser(payload: UserId): Observable<User> {
    const url = `${environment.api}/sdate/user/blockUser`;
    return this.http.put<User>(url, payload);
  }

  removeBlockedUser(payload: UserId): Observable<User> {
    const url = `${environment.api}/sdate/user/removeBlockedUser`;
    return this.http.put<User>(url, payload);
  }

  getBlockedUser(): Observable<User[]> {
    const url = `${environment.api}/sdate/user/getBlockedUser`;
    return this.http.post<User[]>(url, this.searchService.searchKey);
  }
}
