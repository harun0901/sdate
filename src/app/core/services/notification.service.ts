import { Observable, Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../../environments/environment';
import { AddNotification, NotificationEntity, NotificationId } from '../models/notificationEntity';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  notificationStore: NotificationEntity[];
  notificationStore$: Subject<NotificationEntity>;

  constructor(
    private http: HttpClient,
    private authService: AuthService,
  ) {
    this.notificationStore = [];
    this.notificationStore$ = new Subject<NotificationEntity>();
  }

  addNotification(payload: AddNotification): Observable<NotificationEntity> {
    if (this.authService.user.id !== payload.receiver_id) {
      const url = `${environment.api}/sdate/notification/addNotification`;
      return this.http.post<NotificationEntity>(url, payload);
    }
  }

  updateNotification(payload: NotificationId): Observable<NotificationEntity[]> {
    const url = `${environment.api}/sdate/notification/updateNotification`;
    return this.http.put<NotificationEntity[]>(url, payload);
  }

  getAllNotification(): Observable<NotificationEntity[]> {
    const url = `${environment.api}/sdate/notification/getAllNotification`;
    return this.http.get<NotificationEntity[]>(url);
  }

  addNotificationOnPanel(notification: NotificationEntity): void {
    this.notificationStore.push(notification);
    this.notificationStore$.next(notification);
  }

  removeNotificationOnPanel(notification: NotificationEntity): void {
    const index = this.notificationStore.indexOf(notification);
    if (index > -1) {
      this.notificationStore.splice(index, 1);
    }
  }

  setNotificationStore(notificationList: NotificationEntity[]): void {
    this.notificationStore = notificationList;
    this.notificationStore$.next(notificationList[0]);
  }
}
