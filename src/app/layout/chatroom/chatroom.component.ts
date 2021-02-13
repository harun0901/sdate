import { ChangeDetectorRef, Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { OpenPageService } from '../../core/services/open-page.service';
import { ChatStoreService } from '../../core/services/chat-store.service';
import { Chat, SendMessagePayload } from '../../core/models/chat';
import { ChatService } from '../../core/services/chat.service';
import { AuthService } from '../../core/services/auth.service';
import { UserService } from '../../core/services/user.service';
import { User } from '../../core/models/user';
import { NotificationType } from '../../core/models/notificationEntity';
import { NotificationService } from '../../core/services/notification.service';

@Component({
  selector: 'sdate-chatroom',
  templateUrl: './chatroom.component.html',
  styleUrls: ['./chatroom.component.scss']
})
export class ChatroomComponent implements OnInit, OnDestroy {
  private unsubscribeAll: Subject<any> = new Subject<any>();
  chatStore: Chat[];
  customerId: string;
  customerInfo: User;
  chatForm: FormGroup;
  @ViewChild('scrollMe') private myScrollContainer: ElementRef;

  constructor(
    private openPageSv: OpenPageService,
    private chatStoreService: ChatStoreService,
    private cRef: ChangeDetectorRef,
    private chatService: ChatService,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: ActivatedRoute,
    private userService: UserService,
    private notificationService: NotificationService
  ) {
    this.chatForm = this.formBuilder.group({
      message_content: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.openPageSv.send('chatroom');
    this.customerId = this.router.snapshot.paramMap.get('userId');
    this.getCustomerInfo(this.customerId);
    this.chatStoreService.setChatroomUserId(this.customerId);
    this.chatStore = [];

    this.chatStoreService.chatroomStore$.asObservable().pipe(
      takeUntil(this.unsubscribeAll)
    ).subscribe( chatEmmitInfo => {
        if (this.customerId === chatEmmitInfo.id) {
          this.chatStore.push(chatEmmitInfo.chat);
          this.cRef.detectChanges();
          try {
            this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
          } catch (err) { }
        }
      }
    );
  }

  async getCustomerInfo(customerId): Promise<void> {
    this.customerInfo = await this.userService.getById(customerId).toPromise();
  }

  async onTransferClicked(): Promise<void> {
    if (this.chatForm.valid) {
      try {
        const payload: SendMessagePayload = { receiverId: this.customerId, text: this.chatForm.value.message_content, gift: '', kiss: ''};
        const res = await this.chatService.sendMessage(payload).toPromise();
        this.chatStore.push(res);
        this.chatForm.reset();
        this.cRef.detectChanges();
        this.addNotification();
        try {
          this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
        } catch (err) { }
      } catch (e) {
        console.log(e);
      } finally {

      }
    }
  }

  async addNotification(): Promise<void> {
    const res = await this.notificationService.addNotification({
      receiver_id: this.customerId,
      pattern: NotificationType.Message,
    }).toPromise();
  }

  ngOnDestroy(): void {
    this.unsubscribeAll.next();
    this.unsubscribeAll.complete();
    this.chatStoreService.setChatroomUserId('');
  }

}
