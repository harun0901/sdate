import { ChangeDetectorRef, Component, OnInit, OnDestroy, Input, ViewChild, ElementRef } from '@angular/core';
import { ScrollToService } from '@nicky-lenaers/ngx-scroll-to';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

import { Chat, SendMessagePayload } from '../../core/models/chat';
import { ChatStoreService } from '../../core/services/chat-store.service';
import { ChatService } from '../../core/services/chat.service';
import { AuthService } from '../../core/services/auth.service';
import { UserService } from '../../core/services/user.service';
import { ROUTES, toAbsolutePath } from '../../core/data/routes';
import { ScrollPosition } from '../../core/data/scroll-pos';
import { User } from '../../core/models/user';

@Component({
  selector: 'sdate-chatbox',
  templateUrl: './chatbox.component.html',
  styleUrls: ['./chatbox.component.scss']
})
export class ChatboxComponent implements OnInit, OnDestroy {
  private unsubscribeAll: Subject<any> = new Subject<any>();
  show: boolean;
  ROUTES = ROUTES;
  chatStore: Chat[];
  @Input() customerId: string;
  customerInfo: User;
  chatForm: FormGroup;
  @ViewChild('scrollMe') private myScrollContainer: ElementRef;

  constructor(
    private chatStoreService: ChatStoreService,
    private cRef: ChangeDetectorRef,
    private chatService: ChatService,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private userService: UserService,
    private router: Router,
    private scrollToService: ScrollToService,
  ) {
    this.chatForm = this.formBuilder.group({
      message_content: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.getCustomerInfo(this.customerId);
    this.chatStore = [];
    this.show = true;

    this.chatStoreService.chatStore$.asObservable().pipe(
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
        try {
          this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
        } catch (err) { }
      } catch (e) {
        console.log(e);
      } finally {

      }
    }
  }

  onCloseClicked(): void {
    this.chatStoreService.deleteChat(this.customerId);
  }

  onToggle(): void {
    this.show = !this.show;
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

  ngOnDestroy(): void {
    this.chatStoreService.deleteChat(this.customerId);
    this.unsubscribeAll.next();
    this.unsubscribeAll.complete();
  }

}
