import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { AuthService } from '../../core/services/auth.service';
import { UserService } from '../../core/services/user.service';
import { UploadType } from '../../core/models/upload';
import { ImageCropperComponent } from '../../ui-kit/common-ui-kit/image-cropper/image-cropper.component';
import { GiftService } from '../../core/services/gift.service';
import { GiftState } from '../../core/models/gift';

@Component({
  selector: 'sdate-dash-gift',
  templateUrl: './dash-gift.component.html',
  styleUrls: ['./dash-gift.component.scss']
})
export class DashGiftComponent implements OnInit {
  gift$ = this.giftService.gift$.asObservable();
  constructor(
    private giftService: GiftService,
    private authService: AuthService,
    private userService: UserService,
    public uploadImgDialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.giftService.getGiftByState({ state: GiftState.Accept });
  }

  onGiftAddClicked(): void {
    this.uploadImgDialog.open(ImageCropperComponent, {
      width: '450px',
      height: '500px',
      panelClass: 'full-panel',
      backdropClass: 'custom-backdrop',
      data: { type: UploadType.GiftUploading, detailInfo: 'gift Dialog' }
    });
  }

  async onGiftClicked(itemId): Promise<void> {
    if (confirm('Are you sure to delete this item?')) {
      const res = await this.giftService.updateGift({ giftId: itemId, state: GiftState.Decline }).toPromise();
      this.giftService.setGifts(res);
    }
  }

}
