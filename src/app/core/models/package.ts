import { Entity } from './base';

export interface Packages extends Entity {
  index: number;
  price: number;
  credit: number;
  bonus: number;
}

export interface RegisterPackagePayload{
  index: number;
  price: number;
  credit: number;
  bonus: number;
}

export interface UpdatePackagePayload{
  index: number;
  price: number;
  credit: number;
  bonus: number;
}
