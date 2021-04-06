export interface Entity {
  id?: string;
  deletedAt?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface SearchInfo {
  lookingFor: string;
  startAge: number;
  endAge: number;
  location: string;
  ignoreFlag: boolean;
}

export enum Signal {
  UserListchanged = 'USERLISTCHANGED',
  VisitorListChanged = 'VISITORLISTCHANGED',
  SearchAgain = 'SEARCHAGAIN',
  AVATAR_CHANGED = 'avatar_changed',
}

export enum GState {
  Pending = 0,
  Accept = 1,
  Decline = 2
}

export enum GiftDefaultPrice {
  value = 5
}

export enum Opinion {
  Yes = 'YES',
  No = 'NO',
  NotSure = 'NOT_SURE'
}

export interface Location {
  latitude: number;
  longitude: number;
}

export enum TimeUnit {
  Year = 'YEAR',
  Month = 'MONTH',
  Week = 'WEEK',
  Day = 'DAY',
  Hour = 'HOUR',
}

export enum SortByDateType {
  MostRecent = 'MOST_RECENT',
  FromOldest = 'FROM_OLDEST'
}

export enum ArchivedFilterType {
  Active = 'ACTIVE',
  Archived = 'ARCHIVED'
}

export enum SourceFoundUs {
  Referral = 'REFERRAL',
  Google = 'GOOGLE',
  Instagram = 'INSTAGRAM',
  Facebook = 'FACEBOOK',
  Pinterest = 'PINTEREST',
  Linkedin = 'LINKEDIN',
  PastCustomer = 'PAST_CUSTOMER',
  HomeShow = 'HOME_SHOW',
  Signage = 'SIGNAGE',
  Other = 'OTHER'
}

export interface MapMarker<T> {
  latitude: number;
  longitude: number;
  address: string;
  meta: T;
}

export interface ChartItem {
  name: string;
  value: number;
}

export enum SeparatorType {
  Comma = 'COMMA',
  Slash = 'SLASH'
}

export const DEFAULT_FILTER_FROM_DATE = new Date('Jan 1, 1900').toISOString();
export const DEFAULT_FILTER_TO_DATE = new Date('Jan 1, 2100').toISOString();
export const DEFAULT_IMAGE = '../../../assets/images/uploaded/avatar.png';
export const ScrollOffset = -80;
export const messageCredit = 3;
export const kissCredit = 5;
