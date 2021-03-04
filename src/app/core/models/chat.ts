import { User } from './user';
import { Entity } from './base';

export enum MessageFrom {
  FromConsultant = 'FROM_CONSULTANT',
  FromCustomer = 'FROM_CUSTOMER',
}

export enum ChatType {
  ProjectConsultation = 'PROJECT_CONSULTATION',
  SubContractConsultation = 'SUB_CONTRACT_CONSULTATION',
  ContractorOnboardingConsultation = 'CONTRACTOR_ONBOARDING_CONSULTATION'
}

export enum MessageStatusType {
  Read = 'READ',
  Mailed = 'MAILED',
}

export enum ChatRoomEventType {
  AddChatBox = 'ADDNEWCHATBOX',
  DeleteOneChatBox = 'DELETEONECHATBOX',
  ChangeOrderChatBox = 'CHANGEORDERCHATBOX',
}

export enum ChatType {
  RoomChat = 'ROOMCHAT',
  BoxChat = 'BOXCHAT'
}


export interface Chat extends Entity {
  id: string;
  sender: User;
  sender_delete: number;
  receiver: User;
  receiver_delete: number;
  text: string;
  gift: string;
  kiss: string;
  seen: number;
  createdAt: string;
  updatedAt: string;
}

export interface ChatEmit{
  id: string;
  chat: Chat;
}

export interface SendMessagePayload {
  receiverId: string;
  text: string;
  gift: string;
  kiss: string;
}
