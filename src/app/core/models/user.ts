import { Entity } from './base';

export interface User extends Entity {
  email: string;
  fullName: string;
  role: string;
  // lastName: string;
  // phone: string;
  // avatar?: string;
  // ideas?: string[];
  // creditCard: CreditCard;
  // address?: string;
  // latitude?: number;
  // longitude?: number;
  // invitationStatus?: InvitationStatus;
  // stripeCustomerId?: string;
  // relations for profile
  // contractorProfile?: ContractorProfile;
}

export interface LimitCount {
  limit_count: string;
}
