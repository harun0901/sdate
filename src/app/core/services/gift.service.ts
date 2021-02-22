import { BehaviorSubject, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../../environments/environment';
import { Gift, RegisterGiftPayload, StateGiftPayload, UpdateGiftPayload } from '../models/gift';

@Injectable({
  providedIn: 'root'
})
export class GiftService {
  gift: Gift[] = [];
  gift$: BehaviorSubject<Gift[]> = new BehaviorSubject<Gift[]>(this.gift);
  constructor(
    private http: HttpClient
  ) { }

  register(payload: RegisterGiftPayload): Observable<Gift[]> {
    const url = `${environment.api}/sdate/gift/register`;
    return this.http.post<Gift[]>(url, payload);
  }

  updateGift(payload: UpdateGiftPayload): Observable<Gift[]> {
    const url = `${environment.api}/sdate/gift/update`;
    return this.http.put<Gift[]>(url, payload);
  }

  async getGifts(): Promise<void> {
    const url = `${environment.api}/sdate/gift/getAll`;
    this.gift = await this.http.get<Gift[]>(url).toPromise();
    this.gift$.next(this.gift);
  }

  async getGiftByState(payload: StateGiftPayload): Promise<void> {
    const url = `${environment.api}/sdate/gift/getByState`;
    this.gift = await this.http.post<Gift[]>(url, payload).toPromise();
    this.gift$.next(this.gift);
  }

  setGifts(gifts: Gift[]): void {
    this.gift = gifts;
    this.gift$.next(this.gift);
  }
}
