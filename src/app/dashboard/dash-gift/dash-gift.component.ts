import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { AuthService } from '../../core/services/auth.service';
import { UserService } from '../../core/services/user.service';
import { UploadType } from '../../core/models/upload';
import { ImageCropperComponent } from '../../ui-kit/common-ui-kit/image-cropper/image-cropper.component';
import { GiftService } from '../../core/services/gift.service';
import { GState } from '../../core/models/base';

@Component({
  selector: 'sdate-dash-gift',
  templateUrl: './dash-gift.component.html',
  styleUrls: ['./dash-gift.component.scss']
})
export class DashGiftComponent implements OnInit {
  gift$ = this.giftService.gift$.asObservable();
  constructor(
    private giftService: GiftService,
    public uploadImgDialog: MatDialog,
  ) { }

  async ngOnInit(): Promise<void> {
    await this.giftService.getGiftByState({ state: GState.Accept });
  }

  onGiftAddClicked(): void {
    this.uploadImgDialog.open(ImageCropperComponent, {
      width: '450px',
      height: '500px',
      panelClass: 'full-panel',
      backdropClass: 'custom-backdrop',
      data: { type: UploadType.GiftUploading, detailInfo: 'gift Dialog', customerId: '' }
    });
  }

  async onGiftClicked(itemId): Promise<void> {
    if (confirm('Are you sure to delete this item?')) {
      const res = await this.giftService.updateGift({ giftId: itemId, price: 0, state: GState.Decline }).toPromise();
      this.giftService.setGifts(res);
    }
  }

}
