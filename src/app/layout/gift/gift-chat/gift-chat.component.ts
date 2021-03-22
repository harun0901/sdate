import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { GiftChatPayload } from '../../../core/models/gift';
import { ChatType, SendMessagePayload } from '../../../core/models/chat';
import { ChatService } from '../../../core/services/chat.service';
import { ChatStoreService } from '../../../core/services/chat-store.service';
import { NotificationType } from '../../../core/models/notificationEntity';
import { NotificationService } from '../../../core/services/notification.service';
import { AuthService } from '../../../core/services/auth.service';
import { ToastrService } from '../../../core/services/toastr.service';

@Component({
  selector: 'sdate-gift-chat',
  templateUrl: './gift-chat.component.html',
  styleUrls: ['./gift-chat.component.scss']
})
export class GiftChatComponent implements OnInit {

  chatForm: FormGroup;
  userInfo = this.authService.user;

  constructor(
    private authService: AuthService,
    private chatService: ChatService,
    private toastrService: ToastrService,
    private chatStoreService: ChatStoreService,
    private notificationService: NotificationService,
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<GiftChatComponent>,
    @Inject(MAT_DIALOG_DATA) public data: GiftChatPayload,
  ) {
    this.chatForm = this.formBuilder.group({
      message_content: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
  }

  async onTransferClicked(): Promise<void> {
    if (this.chatForm.valid) {
      try {
        const payload: SendMessagePayload = {
          receiverId: this.data.customerId,
          text: this.chatForm.value.message_content,
          gift: this.data.path,
          kiss: ''
        };
        const res = await this.chatService.sendMessage(payload).toPromise();
        if (this.data.type === ChatType.RoomChat) {
          this.chatStoreService.addRoomChat(res);
        } else if (this.data.type === ChatType.BoxChat) {
          this.chatStoreService.addChat(this.data.customerId, res);
        }
        this.chatForm.reset();
        this.addNotification(NotificationType.Gift);
        this.toastrService.success('You have just sent a gift successfully.');
        this.dialogRef.close();
      } catch (e) {
        console.log(e);
      } finally {

      }
    }
  }

  async addNotification(notificationType: string): Promise<void> {
    const res = await this.notificationService.addNotification({
      receiver_id: this.data.customerId,
      pattern: notificationType,
    }).toPromise();
  }

}
