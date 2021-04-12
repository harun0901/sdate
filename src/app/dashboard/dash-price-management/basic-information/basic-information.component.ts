import { Component, OnInit } from '@angular/core';
import { BasicService } from '../../../core/services/basic.service';

@Component({
  selector: 'sdate-basic-information',
  templateUrl: './basic-information.component.html',
  styleUrls: ['./basic-information.component.scss']
})
export class BasicInformationComponent implements OnInit {

  isLoading = false;
  basic$ = this.basicService.basic$.asObservable();

  constructor(
    private basicService: BasicService
  ) { }

  async ngOnInit(): Promise<void> {
    await this.basicService.getBasic();
  }

  async onChange(item): Promise<void> {
    this.isLoading = true;
    const res = await this.basicService.updateBasic({
      key: item.key,
      value: item.value.toString(),
    }).toPromise();
    this.basicService.setBasic(res);
    this.isLoading = false;
  }

}
