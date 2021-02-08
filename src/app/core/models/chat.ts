import { User } from './auth';
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
}

export interface SendMessagePayload {
  receiver: number;
  text: string;
  gift: string;
  kiss: string;
}
