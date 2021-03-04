import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { Chat, ChatEmit, ChatRoomEventType } from '../models/chat';

@Injectable({
  providedIn: 'root'
})
export class ChatStoreService {
  chatStoreIds: string[];
  chatStore: Map<string, Chat[]>;
  chatStore$: Subject<ChatEmit>;
  chatStoreEvent$: Subject<string>;
  chatroomUserId: string;
  chatroomStore: Chat[];
  chatroomStore$: Subject<ChatEmit>;

  constructor() {
    this.chatroomUserId = '';
    this.chatStoreIds = [];
    this.chatStore = new Map<string, Chat[]>();
    this.chatStore$ = new Subject<ChatEmit>();
    this.chatStoreEvent$ = new Subject<string>();
    this.chatroomStore = [];
    this.chatroomStore$ = new Subject<ChatEmit>();
  }

  setChatroomUserId(id: string): void {
    this.chatroomUserId = id;
    this.chatroomStore = [];
  }

  setChatroomStore(store: Chat[]): void {
    this.chatroomStore = store;
  }

  setChatStore(idStr: string, store: Chat[]): void {
    this.chatStore.set(idStr, store);
  }

  addRoomChat(chatItem: Chat): void {
    this.chatroomStore.push(chatItem);
    this.chatroomStore$.next({id: this.chatroomUserId, chat: chatItem});
  }

  getChat(idStr: string): Chat[] {
    return this.chatStore.get(idStr);
  }

  addChat(idStr: string, chatItem: Chat): void {
    if (this.chatStore.has(idStr)) {
      this.chatStore.get(idStr).push(chatItem);
    } else {
      this.chatStore.set(idStr, [chatItem]);
      this.chatStoreIds.push(idStr);
      this.chatStoreEvent$.next(ChatRoomEventType.AddChatBox);
    }
    this.chatStore$.next({id: idStr, chat: chatItem});
  }

  deleteChat(idStr: string): void {
    this.chatStore.delete(idStr);
    if (this.chatStoreIds.indexOf(idStr) > -1) {
      this.chatStoreIds.splice(this.chatStoreIds.indexOf(idStr), 1);
    }
    this.chatStoreEvent$.next(ChatRoomEventType.DeleteOneChatBox);
  }

  moveFirst(idStr: string): void {
    if (this.chatStoreIds.indexOf(idStr) > -1) {
      this.chatStoreIds.splice(this.chatStoreIds.indexOf(idStr), 1);
      this.chatStoreIds.unshift(idStr);
    }
    this.chatStoreEvent$.next(ChatRoomEventType.ChangeOrderChatBox);
  }
}
