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
  Any = 'any',
}

export enum NotificationDescription {
  Visit = 'visited your profile.',
  Like = 'like you',
  Favorite = 'favorite you',
  Message = 'sent a message to you',
}
