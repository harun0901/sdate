import { Entity } from './base';
import { User } from './user';

export interface Transaction extends Entity {
  payer: User;
  amount: number;
  status: number;
}


export const PaymentItems = [
  {
    amount: 200,
    coins: 200,
    bonus: 20
  },
  {
    amount: 400,
    coins: 400,
    bonus: 40
  },
  {
    amount: 1000,
    coins: 1000,
    bonus: 100
  }
];

