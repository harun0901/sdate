import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { Signal } from '../../core/models/base';
import { AgeLimit, LookingFor } from '../../core/models/user';
import { SearchService } from '../../core/services/search.service';
import { SignalService } from '../../core/services/signal.service';
import { AuthService } from '../../core/services/auth.service';
import { PaymentComponent } from '../payment/payment.component';

@Component({
  selector: 'sdate-leftpanel',
  templateUrl: './leftpanel.component.html',
  styleUrls: ['./leftpanel.component.scss']
})
export class LeftpanelComponent implements OnInit {

  user = this.authService.user;

  constructor(
    private paymentDialog: MatDialog,
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
  }

}
