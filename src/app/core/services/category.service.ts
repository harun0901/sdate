import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../../environments/environment';
import { AddNotification, NotificationEntity, NotificationId } from '../models/notificationEntity';
import { AuthService } from './auth.service';
import { AddCategory, AddUsersPayload, Category, UpdateCategory } from '../models/category';
import { UserId } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(
    private http: HttpClient,
    private authService: AuthService,
  ) {}

  addCategory(payload: AddCategory): Observable<Category> {
    const url = `${environment.api}/sdate/category/addCategory`;
    return this.http.post<Category>(url, payload);
  }

  updateCategory(payload: UpdateCategory): Observable<Category> {
    const url = `${environment.api}/sdate/category/updateCategory`;
    return this.http.put<Category>(url, payload);
  }

  getActiveCategories(): Observable<Category[]> {
    const url = `${environment.api}/sdate/category/getActiveCategories`;
    return this.http.get<Category[]>(url);
  }

  getCategoryById(payload: UserId): Observable<Category> {
    const url = `${environment.api}/sdate/category/getCategoryById`;
    return this.http.post<Category>(url, payload);
  }

  addUsers(payload: AddUsersPayload): Observable<Category> {
    const url = `${environment.api}/sdate/category/addUsers`;
    return this.http.post<Category>(url, payload);
  }
}
