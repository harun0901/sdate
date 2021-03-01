import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';

import { environment } from '../../../environments/environment';
import { AuthService } from './auth.service';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SocketService {

  constructor(
    private socket: Socket,
    private authService: AuthService
  ) {
  }

  join(id: string): any {
    this.socket.emit(environment.socket.join, id);
  }

  disconnect(id: string): any {
    console.log('disconnect = ', id);
    this.socket.emit(environment.socket.disconnect, id);
  }

  subscribeEvents(): Observable<any> {
    return this.socket.fromEvent(`${this.authService.user.id}_${environment.socket.events}`);
  }

  subscribeMessages(): Observable<any> {
    return this.socket.fromEvent(`${this.authService.user.id}_${environment.socket.messages}`);
  }
}
