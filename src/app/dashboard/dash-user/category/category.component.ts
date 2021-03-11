import { Component, OnInit } from '@angular/core';
import { ToastrService } from '../../../core/services/toastr.service';
import { CategoryService } from '../../../core/services/category.service';
import { GState, Signal } from '../../../core/models/base';
import { Category } from '../../../core/models/category';
import { MatDialogRef } from '@angular/material/dialog';
import { SignalService } from '../../../core/services/signal.service';

@Component({
  selector: 'sdate-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {
  typesOfShoes: string[] = ['Aleksei Panov', 'Huskar Malev', 'Podolsky Usev', 'Oleg Japrin', 'Sangiton Bishy'];
  categoryList: Category[] = [];
  categoryName = '';
  isLoading = false;
  constructor(
    private signalService: SignalService,
    private toastrService: ToastrService,
    private categoryService: CategoryService,
    public dialogRef: MatDialogRef<CategoryComponent>,
  ) { }

  ngOnInit(): void {
    this.getActiveCategories();
  }

  async onAddClicked(): Promise<void> {
    if (this.categoryName === '') {
      this.toastrService.danger('You must type the name of category first.');
    } else {
      try {
        this.isLoading = true;
        const item = {
          name: this.categoryName,
          state: GState.Accept,
        };
        const res = await this.categoryService.addCategory(item).toPromise();
        await this.getActiveCategories();
        this.toastrService.success('You have successfully added a new category.');
        this.signalService.sendSignal(Signal.UserListchanged);
      } catch (e) {
        this.toastrService.danger(`Invalid Request. Please try again.`);
      } finally {
        this.isLoading = false;
      }
    }
  }

  async onDeleteClicked(idStr: string): Promise<void> {
    if (idStr === null) {
      this.toastrService.danger('You must select one of category list.');
    } else {
      try {
        this.isLoading = true;
        const item = {
          id: idStr,
          name: this.categoryName,
          state: GState.Decline,
        };
        const res = await this.categoryService.updateCategory(item).toPromise();
        await this.getActiveCategories();
        this.toastrService.success('You have successfully delete a category.');
        this.signalService.sendSignal(Signal.UserListchanged);
      } catch (e) {
        this.toastrService.danger(`Invalid Request. Please try again.`);
      } finally {
        this.isLoading = false;
      }
    }
  }

  async getActiveCategories(): Promise<void> {
    try {
      this.isLoading = true;
      this.categoryList = await this.categoryService.getActiveCategories().toPromise();
    } catch (e) {
      this.toastrService.danger(`Invalid Request. Please try again.`);
    } finally {
      this.isLoading = false;
    }
  }

  onCloseClicked(): void {
    this.dialogRef.close();
  }

}
