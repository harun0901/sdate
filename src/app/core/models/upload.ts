import { Entity } from './base';
import { User } from './user';

export interface Upload extends Entity {
  fileName: string;
  url: string;
}

export interface UploadFileName {
  fileName: string;
}

export interface UploadUrl {
  uploadURL: string;
  uploadFileName: string;
}

export enum UploadStatus {
  SUCCESS = 200,
}
