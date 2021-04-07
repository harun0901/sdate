import { AfterViewInit, Component, OnDestroy, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { Gender, User, UserTableForm } from '../../core/models/user';
import { UserService } from '../../core/services/user.service';
import { UserRole } from '../../core/models/auth';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { SignalService } from '../../core/services/signal.service';
import { takeUntil } from 'rxjs/operators';
import { ToastrService } from '../../core/services/toastr.service';
import { CategoryComponent } from './category/category.component';
import { Option } from '../../core/models/option';
import { CategoryService } from '../../core/services/category.service';
import { DEFAULT_IMAGE, Signal } from '../../core/models/base';
import { genderList, roleList } from '../../core/models/option';

@Component({
  selector: 'sdate-dash-user',
  templateUrl: './dash-user.component.html',
  styleUrls: ['./dash-user.component.scss']
})

export class DashUserComponent implements OnInit, OnDestroy, AfterViewInit {

  DEFAULT_IMAGE = DEFAULT_IMAGE;
  genderList = genderList;
  roleList = roleList;
  isLoading = false;
  genFakerCount = 10;
  onlineUserCount = 0;
  fakeUserCount = 0;
  manCount = 0;
  womanCount = 0;
  startAge = 18;
  endAge = 60;
  location = '';
  nameList = '';
  gender = '';
  selectedRole = '';
  country = '';
  displayedColumns: string[] = ['select', 'id', 'name', 'role', 'gender', 'category', 'location'];
  dataSource: MatTableDataSource<UserTableForm>;
  userList: User[] = [];
  categoryList: Option<string>[] = [];
  private unsubscribeAll: Subject<any> = new Subject<any>();
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(
    private userService: UserService,
    private signalService: SignalService,
    private detailDialog: MatDialog,
    private toastrService: ToastrService,
    private categoryService: CategoryService,
  ) {}

  ngAfterViewInit(): void {
    // this.dataSource.paginator = this.paginator;
    // this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
  }

  onSliderChange(selectedValues: number[]): void {
    this.startAge = selectedValues[0];
    this.endAge = selectedValues[1];
  }

  async getActiveCategories(): Promise<void> {
    try {
      this.isLoading = true;
      const res = await this.categoryService.getActiveCategories().toPromise();
      this.categoryList = res.map((item) => {
        return {value: item.id, label: item.name};
      });
    } catch (e) {
      this.toastrService.danger(`Invalid Request. Please try again.`);
    } finally {
      this.isLoading = false;
    }
  }

  async onGenerateFakerClicked(): Promise<void> {
    this.isLoading = true;
    const item = {
      count: this.genFakerCount,
      startAge: this.startAge,
      endAge: this.endAge,
      nameList: this.nameList,
      location: this.location,
      gender: this.gender,
      country: this.country,
    };
    await this.userService.generateFaker(item).toPromise();
    this.getAllOperators();
    this.initializeCount();
    this.isLoading = false;
    this.toastrService.success('Generating Fakers successfully finished.');
  }

  onEditCategoryClicked(): void {
    this.detailDialog.open(CategoryComponent, {
      panelClass: 'full-panel',
      backdropClass: 'custom-backdrop'
    });
  }

  async onDeleteUserClicked(): Promise<void> {
    const filteredDataList = this.dataSource.data.filter((item) => {
      if (item.select) {
        return true;
      } else {
        return false;
      }
    });
    const idList = filteredDataList.map((item) => item.detail.id);
    const selUserLen = idList.length;
    if (selUserLen > 0) {
      try {
        this.isLoading = true;
        for (let index = 0; index < selUserLen; index ++) {
          await this.userService.deleteUser({id: idList[index]}).toPromise();
        }
        this.toastrService.success('You have successfully deleted users.');
        this.signalService.sendSignal(Signal.UserListchanged);
      } catch (e) {
        this.toastrService.danger(`Invalid Request. Fakers who had chat before can't delete.`);
      } finally {
        this.isLoading = false;
      }
    }
  }

  async onCategoryChanged(selId: string): Promise<void> {
    if (selId !== '') {
      const res = await this.categoryService.getCategoryById({id: selId}).toPromise();
      const userIdList = res.userList.map((item) => item.id);
      const tmpRes = this.dataSource.data.map((item) => {
        if (userIdList.indexOf(item.detail.id) > -1) {
           item.select = true;
        } else  {
          item.select = false;
        }
        return item;
      });
    }
  }

  async onSaveClicked(selId: string): Promise<void> {
    const filteredDataList = this.dataSource.data.filter((item) => {
      if (item.select) {
        return true;
      } else {
        return false;
      }
    });
    const idList = filteredDataList.map((item) => item.detail.id);
    if (idList.length > 0 && selId !== '') {
      try {
        this.isLoading = true;
        const item = {
          id: selId,
          userIds: idList,
        };
        await this.categoryService.addUsers(item).toPromise();
        await this.onCategoryChanged(selId);
        this.toastrService.success('You have successfully saved category option.');
      } catch (e) {
        this.toastrService.danger(`Invalid Request. Please try again.`);
      } finally {
        this.isLoading = false;
      }
    }
  }

  onEditClicked(item: User): void {
    this.detailDialog.open(UserDetailComponent, {
      panelClass: 'full-panel',
      backdropClass: 'custom-backdrop',
      data: {detail: item}
    });
  }

  ngOnInit(): void {
    this.getAllOperators();
    this.initializeCount();
    this.getActiveCategories();
    this.signalService.signalEvent$.asObservable().pipe(
      takeUntil(this.unsubscribeAll)
    ).subscribe((next) => {
      this.getAllOperators();
      this.initializeCount();
      this.getActiveCategories();
    });
  }

  async initializeCount(): Promise<void> {
    this.onlineUserCount = await this.userService.getOnlineUserCount().toPromise();
    this.fakeUserCount = await this.userService.getFakeUserCount().toPromise();
  }

  async getAllOperators(): Promise<void> {
    this.manCount = 0;
    this.womanCount = 0;
    this.userList = await this.userService.getAll().toPromise();
    this.userList = this.userList.filter((item) => {
      if (item.role === UserRole.SuperAdmin || item.role === UserRole.Admin) {
        return false;
      } else {
        return true;
      }
    });
    let users = this.userList.map((item, index) => {
      const order = index + 1;
      if (item.role === UserRole.Customer && item.gender === Gender.MAN) {
        this.manCount ++;
      } else if (item.role === UserRole.Customer && item.gender === Gender.WOMAN) {
        this.womanCount ++;
      }
      let categoryNamesList = '';
      if (item.categoryList.length > 0) {
        categoryNamesList = item.categoryList.map((category) => category.name).join(',');
      }
      return {
        id: order,
        name: item.fullName,
        role: item.role,
        gender: item.gender,
        category: categoryNamesList,
        location: item.location,
        detail: item,
        select: false,
      };
    });
    if (this.selectedRole !== 'Any' && this.selectedRole !== '') {
      users = users.filter(item => item.role === this.selectedRole);
    }
    this.dataSource = new MatTableDataSource(users);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  async onRoleChanged(): Promise<void> {
    await this.getAllOperators();
  }

  ngOnDestroy(): void {
    this.unsubscribeAll.next();
    this.unsubscribeAll.complete();
  }
}
