import { ChangeDetectorRef, Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { DEFAULT_IMAGE } from '../../core/models/base';
import { OpenPageService } from '../../core/services/open-page.service';
import { ChatStoreService } from '../../core/services/chat-store.service';
import { Chat, ChatType, SendMessagePayload } from '../../core/models/chat';
import { ChatService } from '../../core/services/chat.service';
import { AuthService } from '../../core/services/auth.service';
import { UserService } from '../../core/services/user.service';
import { User } from '../../core/models/user';
import { NotificationType } from '../../core/models/notificationEntity';
import { NotificationService } from '../../core/services/notification.service';
import { MatDialog } from '@angular/material/dialog';
import { GiftPanelComponent } from '../gift/gift-panel/gift-panel.component';
import { KissChatComponent } from '../kiss/kiss-chat/kiss-chat.component';
import { ROUTES, toAbsolutePath } from '../../core/data/routes';
import { ScrollPosition } from '../../core/data/scroll-pos';
import { ScrollToService } from '@nicky-lenaers/ngx-scroll-to';
import { Signal } from '../../core/models/base';
import { ToastrService } from '../../core/services/toastr.service';
import { SignalService } from '../../core/services/signal.service';

@Component({
  selector: 'sdate-chatroom',
  templateUrl: './chatroom.component.html',
  styleUrls: ['./chatroom.component.scss']
})
export class ChatroomComponent implements OnInit, OnDestroy {
  private unsubscribeAll: Subject<any> = new Subject<any>();
  isBlocked = false;
  chatStore: Chat[];
  customerId: string;
  customerInfo: User;
  chatForm: FormGroup;
  DEFAULT_IMAGE: string = DEFAULT_IMAGE;
  message = '';
  showEmojiPicker = false;
  set = 'twitter';
  @ViewChild('scrollMe') private myScrollContainer: ElementRef;

  constructor(
    private routerRouter: Router,
    private scrollToService: ScrollToService,
    private openPageSv: OpenPageService,
    private chatStoreService: ChatStoreService,
    private cRef: ChangeDetectorRef,
    private chatService: ChatService,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: ActivatedRoute,
    private userService: UserService,
    private giftListDialog: MatDialog,
    private toastr: ToastrService,
    private signalService: SignalService,
    private notificationService: NotificationService
  ) {
    this.chatForm = this.formBuilder.group({
      message_content: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.chatStore = [];
    this.router.params.subscribe(async params => {
      this.openPageSv.send('chatroom');
      this.customerId = this.router.snapshot.paramMap.get('userId');
      await this.getCustomerInfo(this.customerId);
      this.chatStoreService.setChatroomUserId(this.customerId);
      await this.getPartChatList(this.customerId);
      this.cRef.detectChanges();
      try {
        this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
      } catch (err) { }
    });
    this.chatStoreService.chatroomStore$.asObservable().pipe(
      takeUntil(this.unsubscribeAll)
    ).subscribe( async chatEmmitInfo => {
        if (this.customerId === chatEmmitInfo.id) {
          this.chatStore = this.chatStoreService.chatroomStore;
          await this.getPartChatList(this.customerId);
          try {
            this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
          } catch (err) { }
        }
      }
    );
  }

  async getPartChatList(customerId): Promise<void> {
    this.chatStore = await this.chatService.getPartChatList({id: customerId}).toPromise();
    this.chatStoreService.setChatroomStore(this.chatStore);
  }

  async onAllChatHistoryClicked(): Promise<void> {
    this.chatStore = await this.chatService.getAllChatList({id: this.customerId}).toPromise();
    this.chatStoreService.setChatroomStore(this.chatStore);
  }

  async getCustomerInfo(customerId): Promise<void> {
    this.customerInfo = await this.userService.getById(customerId).toPromise();
    if (this.customerInfo.blockedList !== null && this.customerInfo.blockedList.length > 0) {
      const temp = this.customerInfo.blockedList.map((item) => {
        if (item.id === this.authService.user.id) {
          this.isBlocked = true;
        }
        return item;
      });
    }
  }

  async onTextareaFocused(): Promise<void> {
    const res = await this.chatService.seenMessage({senderId: this.authService.user.id, receiverId: this.customerId}).toPromise();
  }

  async onTransferClicked(): Promise<void> {
    this.showEmojiPicker = false;
    if (this.chatForm.valid) {
      try {
        const payload: SendMessagePayload = { receiverId: this.customerId, text: this.chatForm.value.message_content, gift: '', kiss: ''};
        const res = await this.chatService.sendMessage(payload).toPromise();
        this.chatStore.push(res);
        this.chatForm.reset();
        // this.cRef.detectChanges();
        await this.addNotification(NotificationType.Message);
        try {
          this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
        } catch (err) { }
      } catch (e) {
        console.log(e);
      } finally {

      }
    }
  }

  onGiftClicked(): void {
    this.showEmojiPicker = false;
    this.giftListDialog.open(GiftPanelComponent, {
      width: '300px',
      maxHeight: '400px',
      panelClass: 'word-panel',
      backdropClass: 'custom-backdrop',
      data: { type: ChatType.RoomChat, customerId: this.customerId }
    });
  }

  onKissClicked(): void {
    this.showEmojiPicker = false;
    this.giftListDialog.open(KissChatComponent, {
      width: '300px',
      maxHeight: '400px',
      panelClass: 'full-panel',
      backdropClass: 'custom-backdrop',
      data: { type: ChatType.RoomChat, customerId: this.customerId, path: '' }
    });
  }

  async onLikeClicked(): Promise<void> {
    this.showEmojiPicker = false;
    const tmpUser = await this.userService.likeUser({id: this.customerInfo.id}).toPromise();
    this.addNotification(NotificationType.Like);
    this.toastr.success(`You just liked ${this.customerInfo.fullName}.`);
    this.signalService.sendSignal(Signal.UserListchanged);
  }

  async addNotification(notificationType: string): Promise<void> {
    const res = await this.notificationService.addNotification({
      receiver_id: this.customerId,
      pattern: notificationType,
    }).toPromise();
  }

  onCustomerClicked(): void {
    this.showEmojiPicker = false;
    this.navigate([ROUTES.home.root, ROUTES.home.profile_root, this.customerInfo.id]);
  }

  onOwnerClicked(): void {
    this.showEmojiPicker = false;
    this.navigate([ROUTES.home.root, ROUTES.home.profile_root, this.authService.user.id]);
  }

  navigate(path: string | string[]): void {
    this.routerRouter.navigateByUrl(toAbsolutePath(path)).then(() => {
      this.scrollToService.scrollTo({ target: ScrollPosition.Root });
    });
  }

  toggleEmojiPicker($event): void {
    $event.preventDefault();
    this.showEmojiPicker = !this.showEmojiPicker;
  }

  addEmoji(event): void {
    this.message = `${this.message}${event.emoji.native}`;
  }

  onFocus(): void {
    this.showEmojiPicker = false;
  }
  onBlur(): void {
    console.log('onblur');
  }

  ngOnDestroy(): void {
    this.unsubscribeAll.next();
    this.unsubscribeAll.complete();
    this.chatStoreService.setChatroomUserId('');
  }

}
