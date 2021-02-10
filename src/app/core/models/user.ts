import { Entity } from './base';

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
}

export interface LimitCount {
  limit_count: string;
}
