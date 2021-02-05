import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OpenPageService {
  sendOpenPage$: Subject<string> = new Subject<string>();

  constructor() { }

  send(pageName: string): void {
    this.sendOpenPage$.next(pageName);
  }
}
