import { Entity } from './base';
import { User } from './user';

export interface NotificationEntity extends Entity {
  sender: User;
  receiver: User;
  pattern: string;
  seen: number;
}

export interface AddNotification {
  receiver_id: string;
  pattern: string;
}

export interface NotificationId {
  id: string;
}

export enum NotificationType {
  Visit = 'visit',
  Like = 'like',
  Favorite = 'favorite',
  Message = 'message',
  Block = 'block',
  Any = 'any',
}

export enum NotificationDescription {
  Visit = 'visited your profile.',
  Like = 'Sent a like signal to you.',
  Favorite = 'Sent a favorite signal to you',
  Message = 'sent a message to you',
  Block = 'make you as a blocked Customer',
}
