import { Component, OnInit } from '@angular/core';
import { IPayPalConfig, ICreateOrderRequest } from 'ngx-paypal';

import { PaymentItems } from '../../core/models/payment';
import { PackageService } from '../../core/services/package.service';

@Component({
  selector: 'sdate-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {
  public payPalConfig?: IPayPalConfig;
  PaymentItems = PaymentItems;
  isPay: boolean;
  price: number;
  currency: string;
  packages$ = this.packageService.packages$.asObservable();

  constructor(
    private packageService: PackageService,
  ) {
  }

  async ngOnInit(): Promise<void> {
    await this.packageService.getPackages();
    this.isPay = false;
    this.price = 0;
    this.currency = 'USD';
    this.initConfig();
  }

  onPaymentItemClicked(price: number): void {
    this.isPay = true;
    this.price = price;
  }

  private initConfig(): void {
    this.payPalConfig = {
      currency: this.currency,
      clientId: 'sb',
      createOrderOnClient: (data) => <ICreateOrderRequest> {
        intent: 'CAPTURE',
        purchase_units: [
          {
            amount: {
              currency_code: this.currency,
              value: this.price.toString(),
              breakdown: {
                item_total: {
                  currency_code: this.currency,
                  value: this.price.toString()
                }
              }
            },
            items: [
              {
                name: 'Enterprise Subscription',
                quantity: '1',
                category: 'DIGITAL_GOODS',
                unit_amount: {
                  currency_code: this.currency,
                  value: this.price.toString(),
                },
              }
            ]
          }
        ]
      },
      advanced: {
        commit: 'true'
      },
      style: {
        label: 'paypal',
        layout: 'vertical',
        color: 'blue'
      },
      onApprove: (data, actions) => {
        console.log('onApprove - transaction was approved, but not authorized', data, actions);
        actions.order.get().then(details => {
          console.log('onApprove - you can get full order details inside onApprove: ', details);
        });
      },
      onClientAuthorization: (data) => {
        console.log('onClientAuthorization - you should probably inform your server about completed transaction at this point', data);
        // this.showSuccess = true;
      },
      onCancel: (data, actions) => {
        console.log('OnCancel', data, actions);
      },
      onError: err => {
        console.log('OnError', err);
      },
      onClick: (data, actions) => {
        console.log('onClick', data, actions);
      },
    };
  }
}
