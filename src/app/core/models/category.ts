import { Entity } from './base';
import { User } from './user';

export interface Category extends Entity {
  name: string;
  userList: User[];
  state: number;
}

export interface AddCategory{
  name: string;
  state: number;
}

export interface UpdateCategory{
  id: string;
  name: string;
  state: number;
}

export interface AddUsersPayload{
  id: string;
  userIds: string[];
}

