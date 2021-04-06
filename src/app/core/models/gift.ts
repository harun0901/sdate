import { Entity } from './base';

export interface Gift extends Entity {
  path: string;
  price: number;
  state: number;
}

export interface RegisterGiftPayload{
  path: string;
  price: number;
  state: number;
}

export interface UpdateGiftPayload{
  giftId: string;
  price: number;
  state: number;
}

export interface StateGiftPayload{
  state: number;
}

export interface GiftPanelPayload{
  type: string;
  customerId: string;
}

export interface GiftChatPayload{
  type: string;
  customerId: string;
  gift: Gift;
}
