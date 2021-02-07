import { Entity } from './base';

export enum UserRole {
  Consultant = 'CONSULTANT',
  Contractor = 'CONTRACTOR',
  Customer = 'CUSTOMER',
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
}


export interface CreditCard extends Entity {
  cardName: string;
  cardNumber: string;
  yy: string;
  mm: string;
  cvv: string;
}

export interface User extends Entity {
  email: string;
  isEmailVerified: boolean;
  role: UserRole;
  firstName: string;
  lastName: string;
  phone: string;
  avatar?: string;
  ideas?: string[];
  creditCard: CreditCard;
  address?: string;
  latitude?: number;
  longitude?: number;
  invitationStatus?: InvitationStatus;
  stripeCustomerId?: string;
  // relations for profile
  // contractorProfile?: ContractorProfile;
}
