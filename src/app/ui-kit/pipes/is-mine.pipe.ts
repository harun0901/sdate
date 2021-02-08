import { Pipe, PipeTransform } from '@angular/core';

import { AuthService } from '../../core/services/auth.service';
import { Chat } from '../../core/models/chat';

@Pipe({
  name: 'isMine'
})
export class IsMinePipe implements PipeTransform {

  constructor(
    private authService: AuthService
  ) {
  }

  transform(message: Chat): boolean {
    if (message.receiver.id === this.authService.user.id) {
      return true;
    } else {
      return false;
    }
  }

}
