import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';

import { GiftService } from '../../../core/services/gift.service';
import { GState } from '../../../core/models/base';

@Component({
  selector: 'sdate-gift-price',
  templateUrl: './gift-price.component.html',
  styleUrls: ['./gift-price.component.scss']
})
export class GiftPriceComponent implements OnInit {

  isLoading = false;
  gift$ = this.giftService.gift$.asObservable();

  constructor(
    private giftService: GiftService,
    private fb: FormBuilder,
  ) { }

  async ngOnInit(): Promise<void> {
    await this.giftService.getGiftByState({ state: GState.Accept });
  }

  async onChange(item): Promise<void> {
    this.isLoading = true;
    const res = await this.giftService.updateGift({
      giftId: item.id,
      price: item.price,
      state: GState.Accept
    }).toPromise();
    this.giftService.setGifts(res);
    this.isLoading = false;
  }

}
