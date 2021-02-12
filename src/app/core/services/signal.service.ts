import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SignalService {
  signalEvent$: Subject<string>;

  constructor() {
    this.signalEvent$ = new Subject<string>();
  }

  sendSignal(pattern: string): void {
    this.signalEvent$.next(pattern);
  }
}
