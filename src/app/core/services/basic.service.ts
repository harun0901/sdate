import { BehaviorSubject, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../../environments/environment';
import { Basic, BasicInformation, RegisterBasicPayload, UpdateBasicPayload } from '../models/basic';
import { Gift, StateGiftPayload } from '../models/gift';

@Injectable({
  providedIn: 'root'
})
export class BasicService {
  basic: Basic[] = [];
  basic$: BehaviorSubject<Basic[]> = new BehaviorSubject<Basic[]>(this.basic);
  constructor(
    private http: HttpClient
  ) { }

  register(payload: RegisterBasicPayload): Observable<Basic[]> {
    const url = `${environment.api}/sdate/basic/register`;
    return this.http.post<Basic[]>(url, payload);
  }

  updateBasic(payload: UpdateBasicPayload): Observable<Basic[]> {
    const url = `${environment.api}/sdate/basic/update`;
    return this.http.put<Basic[]>(url, payload);
  }

  async getBasic(): Promise<void> {
    const url = `${environment.api}/sdate/basic/getAll`;
    this.basic = await this.http.get<Basic[]>(url).toPromise();
    this.basic$.next(this.basic);
  }

  setBasic(basics: Basic[]): void {
    this.basic = basics;
    this.basic$.next(this.basic);
  }

  getItemValue(key: string): number {
    let tmpCredits = 0;
    this.basic.map(item => {
      if (item.key === key) {
        tmpCredits = Number.parseInt(item.value, 10);
      }
      }
    );
    return tmpCredits;
  }
}
