import { Entity, SearchInfo } from './base';
import { Category } from './category';

export interface User extends Entity {
  email: string;
  fullName: string;
  role: string;
  gender: string;
  lookingFor: string;
  body: string;
  education: string;
  interestedIn: string;
  kids: string;
  profession: string;
  relationshipStatus: string;
  smoker: string;
  language: string;
  height: string;
  alcohol: string;
  birthday: Date;
  avatar: string;
  about: string;
  location: string;
  paypal: string;
  balance: number;
  state: number;
  lastLogin: Date;
  ipAddress: string;
  blockedList?: User[];
  categoryList?: Category[];
}

export interface UpdateUserPayload {
  id: string;
  email: string;
  fullName: string;
  role: string;
  gender: string;
  lookingFor: string;
  body: string;
  education: string;
  interestedIn: string;
  kids: string;
  profession: string;
  relationshipStatus: string;
  smoker: string;
  language: string;
  height: string;
  alcohol: string;
  birthday: Date;
  avatar: string;
  about: string;
  location: string;
  balance: number;
}

export interface UserFact {
  lookingFor: string;
  body: string;
  education: string;
  interestedIn: string;
  kids: string;
  profession: string;
  relationshipStatus: string;
  smoker: string;
  language: string;
  height: string;
  alcohol: string;
}

export interface UserBasic {
  fullName: string;
  location: string;
  about: string;
}

export interface UserInfo {
  birthday: Date;
  email: string;
}

export interface UserId {
  id: string;
}

export interface UpdatePasswordPayload {
  id: string;
  password: string;
}

export interface LimitCount {
  limit_count: string;
}

export interface SearchKey {
  limit_count: string;
  searchKey: SearchInfo;
}

export enum UserShowType {
  RANDOM = 'RANDOMUSERLIST',
  VISITOR = 'VISITORUSERLIST',
  LIKE = 'LIKEUSERLIST',
  FAVORITE = 'FAVORITELIST'
}

export enum Gender {
  WOMAN = 'Woman',
  MAN = 'Man',
}

export enum LookingFor {
  WOMAN = 'Woman',
  MAN = 'Man',
}

export enum AgeLimit {
  START = 18,
  END = 100,
}

export enum ShowLimitCount {
  UserShowCount = 9,
}


export interface UserTableForm {
  select: boolean;
  detail: User;
  id: number;
  name: string;
  email: string;
  gender: string;
  category: string;
  location: string;
}

export interface UserDetailDialogForm {
  detail: User;
}

export interface GenerateFaker {
  count: number;
  startAge: number;
  endAge: number;
  nameList: string;
  location: string;
  gender: string;
  country: string;
}
