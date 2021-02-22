import { Entity } from './base';

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

export enum UploadType {
  AvatarUploading = 'AVATAR_UPLOADING',
  GiftUploading = 'GIFT_UPLOADING',
}

export interface UploadDialogData {
  type: string;
  detailInfo: string;
}


