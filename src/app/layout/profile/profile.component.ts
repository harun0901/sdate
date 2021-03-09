import { ChangeDetectorRef, Component, Input, OnInit, OnDestroy } from '@angular/core';
import { ScrollToService } from '@nicky-lenaers/ngx-scroll-to';
import { ActivatedRoute, Router } from '@angular/router';

import {
  bodyList,
  lookingForList,
  educationList,
  alcoholicList,
  heightList,
  kidsList,
  professionList,
  relationshipList,
  smokerList,
  languageList,
  interestedList,
} from '../../core/models/option';
import { DEFAULT_IMAGE, Signal } from '../../core/models/base';
import { OpenPageService } from '../../core/services/open-page.service';
import { User } from '../../core/models/user';
import { UserService } from '../../core/services/user.service';
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
import { ImageCropperComponent } from '../../ui-kit/common-ui-kit/image-cropper/image-cropper.component';
import { Upload, UploadType } from '../../core/models/upload';
import { MatDialog } from '@angular/material/dialog';
import { ImageSliderComponent } from '../../ui-kit/common-ui-kit/image-slider/image-slider.component';
import { UploadService } from '../../core/services/upload.service';
import { GState } from '../../core/models/base';
import { GiftPanelComponent } from '../gift/gift-panel/gift-panel.component';
import { ChatType } from '../../core/models/chat';
import { KissChatComponent } from '../kiss/kiss-chat/kiss-chat.component';

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
  relationshipList = relationshipList;
  smokerList = smokerList;
  languageList = languageList;
  interestedList = interestedList;
  uploadData: Upload[];
  DEFAULT_IMAGE: string = DEFAULT_IMAGE;

  constructor(
    private router: ActivatedRoute,
    private messageDialog: MatDialog,
    private openPageSv: OpenPageService,
    private userService: UserService,
    private authService: AuthService,
    private factFB: FormBuilder,
    private basicFB: FormBuilder,
    private toastr: ToastrService,
    private routerNavigate: Router,
    private uploadImgDialog: MatDialog,
    private scrollToService: ScrollToService,
    private uploadService: UploadService,
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
    this.uploadData = [];
  }

  ngOnInit(): void {
    this.isEditFact = false;
    this.isEditBasic = false;
    this.isEditable = false;
    this.router.params.subscribe(params => {
      if (typeof this.isOwner === 'undefined') {
        this.customerId = this.router.snapshot.paramMap.get('userId');
        this.getCustomerInfo(this.customerId);
        if (this.authService.user.role === UserRole.Admin) {
          this.isEditable = true;
        }
        this.addNotification(NotificationType.Visit);
      } else {
        this.customerId = this.customerInfo.id;
        this.isEditable = true;
      }
    });
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
  async addNotification(patternStr: string): Promise<void> {
    const res = await this.notificationService.addNotification({
      receiver_id: this.customerId,
      pattern: patternStr
    }).toPromise();
  }

  async getCustomerInfo(customerId): Promise<void> {
    this.customerInfo = await this.userService.getById(customerId).toPromise();
  }

  async onAvatarClicked(): Promise<void> {
    if (this.isEditable) {
      window.scroll(0, 0);
      this.uploadImgDialog.open(ImageCropperComponent, {
        width: '450px',
        height: '500px',
        panelClass: 'full-panel',
        backdropClass: 'custom-backdrop',
        data: {type: UploadType.AvatarUploading, detailInfo: ''}
      });
    } else {
      this.uploadData = await this.uploadService.getCustomerUploadByIdState({
        uploaderId: this.customerId,
        state: GState.Accept
      }).toPromise();
      const imageList = this.uploadData.map((item) => item.data);
      if (this.customerInfo.avatar) {
        imageList.push(this.customerInfo.avatar);
      }
      if (imageList.length !== 0) {
        this.uploadImgDialog.open(ImageSliderComponent, {
          // width: '1200px',
          maxWidth: '600px',
          maxHeight: '700px',
          // height: '600px',
          panelClass: 'word-panel',
          backdropClass: 'custom-backdrop',
          data: { images: imageList }
        });
      } else {
        this.toastr.danger(`There's no images to present.`);
      }
    }
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

  async onFavoriteClicked(): Promise<void> {
    if (!this.isEditable) {
      await this.userService.favoriteUser({id: this.customerInfo.id}).toPromise();
      await this.addNotification(NotificationType.Favorite);
      this.toastr.success(`You've successfully changed.`);
    }
  }

  async onLikeClicked(): Promise<void> {
    if (!this.isEditable) {
      await this.userService.likeUser({id: this.customerInfo.id}).toPromise();
      await this.addNotification(NotificationType.Like);
      this.toastr.success(`You've successfully changed.`);
    }
  }

  onMessageClick(): void {
    if (!this.isEditable) {
      this.navigate([ROUTES.home.root, ROUTES.home.chatroom_root, this.customerInfo.id]);
    }
  }

  onGiftClicked(): void {
    if (!this.isEditable) {
      this.messageDialog.open(GiftPanelComponent, {
        width: '300px',
        maxHeight: '400px',
        panelClass: 'word-panel',
        backdropClass: 'custom-backdrop',
        data: {type: ChatType.RoomChat, customerId: this.customerId}
      });
    }
  }

  onKissClicked(): void {
    if (!this.isEditable) {
      this.messageDialog.open(KissChatComponent, {
        width: '300px',
        maxHeight: '400px',
        panelClass: 'full-panel',
        backdropClass: 'custom-backdrop',
        data: {type: ChatType.RoomChat, customerId: this.customerId, path: ''}
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
