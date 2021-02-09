import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { Chat, ChatEmit } from '../models/chat';

@Injectable({
  providedIn: 'root'
})
export class ChatStoreService {
  chatStore: Map<string, Chat[]>;
  chatStore$: Subject<ChatEmit>;

  constructor() {
    this.chatStore = new Map<string, Chat[]>();
    this.chatStore$ = new Subject<ChatEmit>();
  }

  addChat(idStr: string, chatItem: Chat): void {
    if (this.chatStore.has(idStr)) {
      this.chatStore.get(idStr).push(chatItem);
    } else {
      this.chatStore.set(idStr, [chatItem]);
    }
    this.chatStore$.next({id: idStr, chat: chatItem});
  }
}
