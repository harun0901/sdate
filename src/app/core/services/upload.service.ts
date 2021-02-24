import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { GetUploadByIdState, SendUpload, UpdateUpload, Upload, UploadFileName, UploadUrl } from '../models/upload';

@Injectable({
  providedIn: 'root'
})
export class UploadService {
  uploadData: Upload[] = [];
  uploadData$: BehaviorSubject<Upload[]> = new BehaviorSubject<Upload[]>(this.uploadData);
  constructor(private http: HttpClient) { }

  getUploadURL(payload: UploadFileName): Observable<UploadUrl> {
    const url = `${environment.api}/sdate/upload/getUploadURL`;
    return this.http.post<UploadUrl>(url, payload);
  }

  uploadImage(image: File): Observable<any> {
    const formData = new FormData();
    formData.append('image', image);
    const url = `${environment.api}/sdate/upload`;
    return this.http.post(url, formData);
  }

  register(payload: SendUpload): Observable<Upload> {
    const url = `${environment.api}/sdate/upload/register`;
    return this.http.post<Upload>(url, payload);
  }

  updateUpload(payload: UpdateUpload): Observable<Upload> {
    const url = `${environment.api}/sdate/upload/update`;
    return this.http.put<Upload>(url, payload);
  }

  async getByIdState(payload: GetUploadByIdState): Promise<void> {
    const url = `${environment.api}/sdate/upload/getByIdState`;
    const res = await this.http.post<Upload[]>(url, payload).toPromise();
    this.uploadData = res;
    this.uploadData$.next(this.uploadData);
  }

  getCustomerUploadByIdState(payload: GetUploadByIdState): Observable<Upload[]> {
    const url = `${environment.api}/sdate/upload/getByIdState`;
    const res = this.http.post<Upload[]>(url, payload);
    return res;
  }

  async getById(customerId: string): Promise<void> {
    const url = `${environment.api}/sdate/upload/getById/${customerId}`;
    const res = await this.http.get<Upload[]>(url).toPromise();
    this.uploadData = res;
    this.uploadData$.next(this.uploadData);
  }
}

