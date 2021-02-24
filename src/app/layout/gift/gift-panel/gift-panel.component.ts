import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { GiftChatComponent } from '../gift-chat/gift-chat.component';
import { GiftPanelPayload } from '../../../core/models/gift';
import { GiftService } from '../../../core/services/gift.service';
import { GState } from '../../../core/models/base';

@Component({
  selector: 'sdate-gift-panel',
  templateUrl: './gift-panel.component.html',
  styleUrls: ['./gift-panel.component.scss']
})
export class GiftPanelComponent implements OnInit {

  gift$ = this.giftService.gift$.asObservable();

  constructor(
    private giftChatDialog: MatDialog,
    private giftService: GiftService,
    private dialogRef: MatDialogRef<GiftPanelComponent>,
    @Inject(MAT_DIALOG_DATA) public data: GiftPanelPayload,
  ) { }

  ngOnInit(): void {
    this.giftService.getGiftByState({ state: GState.Accept });
  }

  onGiftClicked(pathInfo: string): void {
    this.dialogRef.close();
    this.giftChatDialog.open(GiftChatComponent, {
      width: '300px',
      maxHeight: '400px',
      panelClass: 'full-panel',
      backdropClass: 'custom-backdrop',
      data: { type: this.data.type, customerId: this.data.customerId, path: pathInfo },
    });
  }

}
