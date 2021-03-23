import { ChangeDetectorRef, Component, OnInit, OnDestroy, Input, ViewChild, ElementRef } from '@angular/core';
import { ScrollToService } from '@nicky-lenaers/ngx-scroll-to';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

import { DEFAULT_IMAGE } from '../../core/models/base';
import { Chat, ChatRoomEventType, ChatType, SendMessagePayload } from '../../core/models/chat';
import { ChatStoreService } from '../../core/services/chat-store.service';
import { ChatService } from '../../core/services/chat.service';
import { AuthService } from '../../core/services/auth.service';
import { UserService } from '../../core/services/user.service';
import { ROUTES, toAbsolutePath } from '../../core/data/routes';
import { ScrollPosition } from '../../core/data/scroll-pos';
import { User } from '../../core/models/user';
import { NotificationType } from '../../core/models/notificationEntity';
import { NotificationService } from '../../core/services/notification.service';
import { GiftPanelComponent } from '../gift/gift-panel/gift-panel.component';
import { MatDialog } from '@angular/material/dialog';
import { KissChatComponent } from '../kiss/kiss-chat/kiss-chat.component';

@Component({
  selector: 'sdate-chatbox',
  templateUrl: './chatbox.component.html',
  styleUrls: ['./chatbox.component.scss']
})
export class ChatboxComponent implements OnInit, OnDestroy {
  private unsubscribeAll: Subject<any> = new Subject<any>();
  isBlocked = false;
  @Input() showFlag: boolean;
  show: boolean;
  ROUTES = ROUTES;
  chatStore: Chat[];
  @Input() customerId: string;
  customerInfo: User;
  chatForm: FormGroup;
  DEFAULT_IMAGE: string = DEFAULT_IMAGE;
  message = '';
  showEmojiPicker = false;
  set = 'twitter';
  @ViewChild('scrollBox') private myScrollContainer: ElementRef;

  constructor(
    private notificationService: NotificationService,
    private chatStoreService: ChatStoreService,
    private scrollToService: ScrollToService,
    private cRef: ChangeDetectorRef,
    private chatService: ChatService,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private userService: UserService,
    private giftListDialog: MatDialog,
    private router: Router,
  ) {
    this.chatForm = this.formBuilder.group({
      message_content: ['', [Validators.required]],
    });
  }

  async ngOnInit(): Promise<void> {
    this.chatStore = [];
    if (this.showFlag === undefined) {
      this.show = true;
    } else {
      this.show = this.showFlag;
    }
    await this.getCustomerInfo(this.customerId);
    await this.getPartChatList(this.customerId);
    this.cRef.detectChanges();
    try {
      this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
    } catch (err) { }
    this.chatStoreService.chatStore$.asObservable().pipe(
      takeUntil(this.unsubscribeAll)
    ).subscribe( chatEmmitInfo => {
        if (this.customerId === chatEmmitInfo.id) {
          // this.chatStore.push(chatEmmitInfo.chat);
          this.chatStore = this.chatStoreService.getChat(this.customerId);
          this.getPartChatList(this.customerId);
          this.cRef.detectChanges();
          try {
            this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
          } catch (err) { }
        }
      }
    );
  }

  async getPartChatList(customerId): Promise<void> {
    this.chatStore = await this.chatService.getPartChatList({id: customerId}).toPromise();
    this.chatStoreService.setChatStore(this.customerId, this.chatStore);
  }

  async onAllChatHistoryClicked(): Promise<void> {
    this.chatStore = await this.chatService.getAllChatList({id: this.customerId}).toPromise();
    this.chatStoreService.setChatStore(this.customerId, this.chatStore);
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

  onCustomerClicked(): void {
    this.showEmojiPicker = false;
    this.navigate([ROUTES.home.root, ROUTES.home.profile_root, this.customerInfo.id]);
  }

  onOwnerClicked(): void {
    this.showEmojiPicker = false;
    this.navigate([ROUTES.home.root, ROUTES.home.profile_root, this.authService.user.id]);
  }

  async onTransferClicked(): Promise<void> {
    this.showEmojiPicker = false;
    if (this.chatForm.valid) {
      try {
        const payload: SendMessagePayload = { receiverId: this.customerId, text: this.chatForm.value.message_content, gift: '', kiss: ''};
        const res = await this.chatService.sendMessage(payload).toPromise();
        this.chatStore.push(res);
        this.chatForm.reset();
        await this.addNotification();
        this.cRef.detectChanges();
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
      data: { type: ChatType.BoxChat, customerId: this.customerId }
    });
  }

  onKissClicked(): void {
    this.showEmojiPicker = false;
    this.giftListDialog.open(KissChatComponent, {
      width: '300px',
      maxHeight: '400px',
      panelClass: 'full-panel',
      backdropClass: 'custom-backdrop',
      data: { type: ChatType.BoxChat, customerId: this.customerId, path: '' }
    });
  }

  onTitleClicked(): void {
    this.showEmojiPicker = false;
    if (this.showFlag !== undefined) {
      this.chatStoreService.moveFirst(this.customerId);
    }
  }

  onCloseClicked(): void {
    this.showEmojiPicker = false;
    this.chatStoreService.deleteChat(this.customerId);
  }

  onToggle(): void {
    this.showEmojiPicker = false;
    if (this.showFlag === undefined) {
      this.show = !this.show;
    }
  }

  onExpandClicked(): void {
    this.chatStoreService.deleteChat(this.customerId);
    this.navigate([ROUTES.home.root, ROUTES.home.chatroom_root, this.customerId]);
  }

  navigate(path: string | string[]): void {
    this.router.navigateByUrl(toAbsolutePath(path)).then(() => {
      this.scrollToService.scrollTo({ target: ScrollPosition.Root });
    });
  }

  async addNotification(): Promise<void> {
    const res = await this.notificationService.addNotification({
      receiver_id: this.customerId,
      pattern: NotificationType.Message,
    }).toPromise();
  }

  toggleEmojiPicker($event) {
    $event.preventDefault();
    this.showEmojiPicker = !this.showEmojiPicker;
  }

  addEmoji(event) {
    this.message = `${this.message}${event.emoji.native}`;
  }

  onFocus() {
    this.showEmojiPicker = false;
  }
  onBlur() {
    console.log('onblur')
  }

  ngOnDestroy(): void {
    this.unsubscribeAll.next();
    this.unsubscribeAll.complete();
  }

}
