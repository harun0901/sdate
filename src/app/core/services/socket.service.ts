import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';

import { environment } from '../../../environments/environment';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SocketService {

  constructor(
    private socket: Socket,
    private authService: AuthService
  ) { }

  join(id: string): any {
    this.socket.emit(environment.socket.join, id);
  }

  subscribeEvents(): Observable<any> {
    return this.socket.fromEvent(`${this.authService.user.id}_${environment.socket.events}`);
  }

  subscribeMessages(): Observable<any> {
    return this.socket.fromEvent(`${this.authService.user.id}_${environment.socket.messages}`);
  }
}
