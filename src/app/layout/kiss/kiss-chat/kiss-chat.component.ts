import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { AuthService } from '../../../core/services/auth.service';
import { ChatService } from '../../../core/services/chat.service';
import { ChatStoreService } from '../../../core/services/chat-store.service';
import { NotificationService } from '../../../core/services/notification.service';
import { GiftChatPayload } from '../../../core/models/gift';
import { ChatType, SendMessagePayload } from '../../../core/models/chat';
import { NotificationType } from '../../../core/models/notificationEntity';
import { ToastrService } from '../../../core/services/toastr.service';
import { kissCredit } from '../../../core/models/base';
import { UserService } from '../../../core/services/user.service';

@Component({
  selector: 'sdate-kiss-chat',
  templateUrl: './kiss-chat.component.html',
  styleUrls: ['./kiss-chat.component.scss']
})
export class KissChatComponent implements OnInit {

  kissForm: FormGroup;
  userInfo = this.authService.user;

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private chatService: ChatService,
    private toastrService: ToastrService,
    private chatStoreService: ChatStoreService,
    private notificationService: NotificationService,
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<KissChatComponent>,
    @Inject(MAT_DIALOG_DATA) public data: GiftChatPayload,
  ) {
    this.kissForm = this.formBuilder.group({
      message_content: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
  }

  async onTransferClicked(): Promise<void> {
    if (this.kissForm.valid) {
      try {
        if (this.authService.user.balance < kissCredit) {
          this.toastrService.danger('Shortage of Coin, you can\'t have a chat.');
          return;
        }
        const payload: SendMessagePayload = {
          receiverId: this.data.customerId,
          text: this.kissForm.value.message_content,
          gift: '',
          kiss: 'kiss'
        };
        const res = await this.chatService.sendMessage(payload).toPromise();
        const resUser = await this.userService.updateUserBalance({ amount: -1 * kissCredit }).toPromise();
        this.authService.setUser(resUser);
        if (this.data.type === ChatType.RoomChat) {
          this.chatStoreService.addRoomChat(res);
        } else if (this.data.type === ChatType.BoxChat) {
          this.chatStoreService.addChat(this.data.customerId, res);
        }
        this.kissForm.reset();
        this.addNotification(NotificationType.Kiss, '');
        this.toastrService.success('You have just sent a kiss successfully.');
        this.dialogRef.close();
      } catch (e) {
        console.log(e);
      } finally {

      }
    }
  }

  async addNotification(notificationType: string, content: string): Promise<void> {
    const res = await this.notificationService.addNotification({
      receiver_id: this.data.customerId,
      pattern: notificationType,
      content
    }).toPromise();
  }

}
