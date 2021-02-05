export interface Location {
  latitude: number;
  longitude: number;
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

export enum ArchivedFilterType {
  Active = 'ACTIVE',
  Archived = 'ARCHIVED'
}

export interface Entity {
  id?: string;
  deletedAt?: string;
  createdAt?: string;
  updatedAt?: string;
}

export enum SortByDateType {
  MostRecent = 'MOST_RECENT',
  FromOldest = 'FROM_OLDEST'
}

export enum Opinion {
  Yes = 'YES',
  No = 'NO',
  NotSure = 'NOT_SURE'
}
