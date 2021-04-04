import { Entity } from './base';

export enum UserRole {
  Moderator = 'MODERATOR',
  Customer = 'USER',
  Admin = 'ADMIN',
  SuperAdmin = 'SUPER_ADMIN',
}

export enum InvitationStatus {
  Pending = 'PENDING',
  Sent = 'SENT',
  Accepted = 'ACCEPTED'
}

export interface LoginResponse {
  accessToken: string;
}

export interface LoginPayload {
    email: string;
    password: string;
}

export interface DecodedToken {
  id: string;
  email: string;
  isEmailVerified: boolean;
  role: UserRole;
  iat: number;
  exp: number;
  state: number;
}


export interface CreditCard extends Entity {
  cardName: string;
  cardNumber: string;
  yy: string;
  mm: string;
  cvv: string;
}
