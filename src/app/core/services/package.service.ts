import { BehaviorSubject, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../../environments/environment';
import { Packages, RegisterPackagePayload, UpdatePackagePayload } from '../models/package';

@Injectable({
  providedIn: 'root'
})
export class PackageService {
  packages: Packages[] = [];
  packages$: BehaviorSubject<Packages[]> = new BehaviorSubject<Packages[]>(this.packages);
  constructor(
    private http: HttpClient
  ) { }

  register(payload: RegisterPackagePayload): Observable<Packages[]> {
    const url = `${environment.api}/sdate/package/register`;
    return this.http.post<Packages[]>(url, payload);
  }

  updatePackage(payload: UpdatePackagePayload): Observable<Packages[]> {
    const url = `${environment.api}/sdate/package/update`;
    return this.http.put<Packages[]>(url, payload);
  }

  async getPackages(): Promise<void> {
    const url = `${environment.api}/sdate/package/getAll`;
    this.packages = await this.http.get<Packages[]>(url).toPromise();
    this.packages$.next(this.packages);
  }

  setPackage(gifts: Packages[]): void {
    this.packages = gifts;
    this.packages$.next(this.packages);
  }
}
