import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { PackageService } from '../../../core/services/package.service';

@Component({
  selector: 'sdate-package-price',
  templateUrl: './package-price.component.html',
  styleUrls: ['./package-price.component.scss']
})
export class PackagePriceComponent implements OnInit {

  isLoading = false;
  packages$ = this.packageService.packages$.asObservable();

  constructor(
    private packageService: PackageService,
  ) {
  }

  async ngOnInit(): Promise<void> {
    await this.packageService.getPackages();
  }

  async onChange(item): Promise<void> {
    this.isLoading = true;
    const res = await this.packageService.updatePackage({
      index: item.index,
      price: item.price,
      credit: item.credit,
      bonus: item.bonus
    }).toPromise();
    this.packageService.setPackage(res);
    this.isLoading = false;
  }

}
