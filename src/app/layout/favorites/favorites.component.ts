import { Component, OnInit } from '@angular/core';
import { OpenPageService } from '../../core/services/open-page.service';

@Component({
  selector: 'sdate-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss']
})
export class FavoritesComponent implements OnInit {

  constructor(
    private openPageSv: OpenPageService
  ) { }

  ngOnInit(): void {
    this.openPageSv.send('favorite');
  }

}
