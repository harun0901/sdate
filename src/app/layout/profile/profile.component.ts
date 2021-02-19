import { ChangeDetectorRef, Component, Input, OnInit, OnDestroy } from '@angular/core';
import { ScrollToService } from '@nicky-lenaers/ngx-scroll-to';
import { ActivatedRoute, Router } from '@angular/router';

import { OpenPageService } from '../../core/services/open-page.service';
import { User } from '../../core/models/user';
import { UserService } from '../../core/services/user.service';
import {
  bodyList,
  lookingForList,
  educationList,
  alcoholicList,
  heightList,
  kidsList,
  professionList,
  RelationshipList,
  smokerList,
  languageList,
  interestedList,
} from '../../core/models/option';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from '../../core/services/toastr.service';
import { ROUTES, toAbsolutePath } from '../../core/data/routes';
import { ScrollPosition } from '../../core/data/scroll-pos';
import { AuthService } from '../../core/services/auth.service';
import { UserRole } from '../../core/models/auth';
import { NotificationService } from '../../core/services/notification.service';
import { NotificationType } from '../../core/models/notificationEntity';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'sdate-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit, OnDestroy {
  ROUTES = ROUTES;
  private unsubscribeAll: Subject<any> = new Subject<any>();
  @Input() customerInfo: User;
  @Input() isOwner: boolean;
  isEditFact: boolean;
  isEditBasic: boolean;
  isEditable: boolean;
  customerId: string;
  factFG: FormGroup;
  basicFG: FormGroup;
  lookingForList = lookingForList;
  bodyList = bodyList;
  educationList = educationList;
  alcoholicList = alcoholicList;
  heightList = heightList;
  kidsList = kidsList;
  professionList = professionList;
  relationshipList = RelationshipList;
  smokerList = smokerList;
  languageList = languageList;
  interestedList = interestedList;
  sampleImageUrl = '../../../assets/images/uploaded/avatar.png';

  constructor(
    private openPageSv: OpenPageService,
    private router: ActivatedRoute,
    private userService: UserService,
    private authService: AuthService,
    private factFB: FormBuilder,
    private basicFB: FormBuilder,
    private toastr: ToastrService,
    private routerNavigate: Router,
    private scrollToService: ScrollToService,
    private notificationService: NotificationService,
  ) {
    this.factFG = this.factFB.group({
      lookingFor: [''],
      body: [''],
      education: [''],
      interestedIn: [''],
      kids: [''],
      profession: [''],
      relationshipStatus: [''],
      smoker: [''],
      language: [''],
      height: [''],
      alcohol: ['']
    });
    this.basicFG = this.basicFB.group({
      fullName: [''],
      location: [''],
      about: ['']
    });
  }

  ngOnInit(): void {
    this.isEditFact = false;
    this.isEditBasic = false;
    this.isEditable = false;
    if (typeof this.isOwner === 'undefined') {
      this.customerId = this.router.snapshot.paramMap.get('userId');
      this.getCustomerInfo(this.customerId);
      if (this.authService.user.role === UserRole.Admin) {
        this.isEditable = true;
      }
      this.addNotification();
    } else {
      this.customerId = this.customerInfo.id;
      this.isEditable = true;
    }
    this.getCustomEditInfo();
    this.openPageSv.send('profile');
    this.authService.user$.asObservable().pipe(
      takeUntil(this.unsubscribeAll)
    ).subscribe((item) => {
      if (typeof this.isOwner === 'undefined') {
        this.customerId = this.router.snapshot.paramMap.get('userId');
        this.getCustomerInfo(this.customerId);
      } else {
        this.customerInfo = item;
      }
    });
  }
  async addNotification(): Promise<void> {
    const res = await this.notificationService.addNotification({
      receiver_id: this.customerId,
      pattern: NotificationType.Visit
    }).toPromise();
  }
  async getCustomerInfo(customerId): Promise<void> {
    this.customerInfo = await this.userService.getById(customerId).toPromise();
  }

  getCustomEditInfo(): void {
    if (this.customerInfo) {
      this.factFG.setValue({
        lookingFor: this.customerInfo.lookingFor,
        body: this.customerInfo.body,
        education: this.customerInfo.education,
        interestedIn: this.customerInfo.interestedIn,
        kids: this.customerInfo.kids,
        profession: this.customerInfo.profession,
        relationshipStatus: this.customerInfo.relationshipStatus,
        smoker: this.customerInfo.smoker,
        language: this.customerInfo.language,
        height: this.customerInfo.height,
        alcohol: this.customerInfo.alcohol
      });
      this.basicFG.setValue({
        fullName: this.customerInfo.fullName,
        location: this.customerInfo.location,
        about: this.customerInfo.about
      });
    }
  }

  onEditFactsToggle(): void {
    this.isEditFact = !this.isEditFact;
    this.getCustomEditInfo();
  }

  onEditBasicToggle(): void {
    this.isEditBasic = !this.isEditBasic;
    this.getCustomEditInfo();
  }

  async onFactSubmitClicked(): Promise<void> {
    this.customerInfo = await this.userService.updateUserFact(this.factFG.value, this.customerId).toPromise();
    this.isEditFact = !this.isEditFact;
    this.toastr.success(`You've successfully saved.`);
  }

  async onBasicSubmitClicked(): Promise<void> {
    this.customerInfo = await this.userService.updateUserBasic(this.basicFG.value, this.customerId).toPromise();
    this.isEditBasic = !this.isEditBasic;
    this.toastr.success(`You've successfully saved.`);
  }

  navigate(path: string | string[]): void {
    this.routerNavigate.navigateByUrl(toAbsolutePath(path)).then(() => {
      this.scrollToService.scrollTo({ target: ScrollPosition.Root });
    });
  }

  ngOnDestroy(): void {
    this.unsubscribeAll.next();
    this.unsubscribeAll.complete();
  }

}
