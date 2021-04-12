import { Entity } from './base';

export interface Basic extends Entity {
  key: string;
  value: string;
}

export interface RegisterBasicPayload{
  key: string;
  value: string;
}

export interface UpdateBasicPayload{
  key: string;
  value: string;
}

export enum BasicInformation {
  kiss = 'KISS',
  message = 'MESSAGE',
  gif = 'GIF'
}
