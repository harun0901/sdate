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

  join(id: string) {
    this.socket.emit(environment.socket.join, id);
  }

  subscribeEvents() {
    return this.socket.fromEvent(`${this.authService.user.id}_${environment.socket.events}`);
  }

  subscribeMessages() {
    return this.socket.fromEvent(`${this.authService.user.id}_${environment.socket.messages}`);
  }
}
