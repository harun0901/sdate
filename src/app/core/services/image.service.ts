import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  constructor(private http: HttpClient) { }

  uploadImage(image: File): Observable<any> {
    const formData = new FormData();
    formData.append('image', image);

    const url = `${environment.api}/sdate/upload`;
    return this.http.post(url, formData);
  }
}
