import { Component, OnInit } from '@angular/core';

import { Signal } from '../../core/models/base';
import { AgeLimit, LookingFor } from '../../core/models/user';
import { SearchService } from '../../core/services/search.service';
import { SignalService } from '../../core/services/signal.service';
import { AuthService } from '../../core/services/auth.service';
import { PaymentComponent } from '../payment/payment.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'sdate-leftpanel',
  templateUrl: './leftpanel.component.html',
  styleUrls: ['./leftpanel.component.scss']
})
export class LeftpanelComponent implements OnInit {

  LookingFor = LookingFor;
  AgeLimit = AgeLimit;
  startAge: number;
  endAge: number;
  lookingForVal: string;
  location: string;
  currentValues: number[];
  user = this.authService.user;

  constructor(
    private paymentDialog: MatDialog,
    private searchService: SearchService,
    private signalService: SignalService,
    private authService: AuthService,
  ) {}

  onPaymentClicked(): void {
    this.paymentDialog.open(PaymentComponent, {
      width: '300px',
      panelClass: 'word-panel',
      backdropClass: 'custom-backdrop'
    });
  }

  ngOnInit(): void {
    this.startAge = AgeLimit.START;
    this.endAge = AgeLimit.END;
    this.location = this.authService.user.location;
    this.lookingForVal = LookingFor.MAN;
  }

  onSliderChange(selectedValues: number[]): void {
    this.currentValues = selectedValues;
    this.startAge = this.currentValues[0];
    this.endAge = this.currentValues[1];
  }

  femaleClicked(): void {
    this.lookingForVal = LookingFor.WOMAN;
  }

  maleClicked(): void {
    this.lookingForVal = LookingFor.MAN;
  }

  onSearchClicked(): void {
    const item = {
      lookingFor: this.lookingForVal,
      startAge: this.startAge,
      endAge: this.endAge,
      location: this.location,
      ignoreFlag: false,
    };
    this.searchService.setSearchKey(item);
    this.signalService.sendSignal(Signal.SearchAgain);
  }

}
