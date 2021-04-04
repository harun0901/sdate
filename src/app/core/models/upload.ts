import { Entity } from './base';
import { User } from './user';

export interface Upload extends Entity {
  uploader: User;
  type: number;
  data: string;
  state: number;
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
  AvatarUploading = 0,
  GiftUploading = 1,
  PersonImageUploading = 4,
  CustomerAvatarUploading = 5,
}

export interface UploadDialogData {
  type: number;
  detailInfo: string;
  customerId: string;
}

export interface ImageSlider {
  images: string[];
}

export interface SendUpload {
  uploaderId: string;
  type: number;
  data: string;
  state: number;
}

export interface UpdateUpload {
  uploadId: string;
  data: string;
  state: number;
}

export interface GetUploadByIdState {
  uploaderId: string;
  state: number;
}


