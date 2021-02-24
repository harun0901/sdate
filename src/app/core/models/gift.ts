import { Entity } from './base';

export interface Gift extends Entity {
  path: string;
  state: number;
}

export interface RegisterGiftPayload{
  path: string;
  state: number;
}

export interface UpdateGiftPayload{
  giftId: string;
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
  path: string;
}
