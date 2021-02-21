import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NpnSliderModule } from 'npn-slider';
import { A11yModule } from '@angular/cdk/a11y';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';
import { NgxPayPalModule } from 'ngx-paypal';

import { LayoutComponent } from './layout.component';
import { LayoutRoutingModule } from './layout-routing.module';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { LeftpanelComponent } from './leftpanel/leftpanel.component';
import { PipesModule } from '../ui-kit/pipes/pipes.module';
import { IconModule } from '../ui-kit/icon/icon.module';
import { RightpanelComponent } from './rightpanel/rightpanel.component';
import { NotificationComponent } from './notification/notification.component';
import { ChatroomComponent } from './chatroom/chatroom.component';
import { LikesComponent } from './likes/likes.component';
import { FavoritesComponent } from './favorites/favorites.component';
import { VisitorsComponent } from './visitors/visitors.component';
import { InboxComponent } from './inbox/inbox.component';
import { PersoncardComponent } from './personcard/personcard.component';
import { MyprofileComponent } from './myprofile/myprofile.component';
import { ProfileComponent } from './profile/profile.component';
import { UserlistComponent } from './userlist/userlist.component';
import { CommonUiKitModule } from '../ui-kit/common-ui-kit/common-ui-kit.module';
import { ChatboxComponent } from './chatbox/chatbox.component';
import { PaymentComponent } from './payment/payment.component';
import { AvatarModule } from '../ui-kit/avatar/avatar.module';


@NgModule({
  declarations: [
    LayoutComponent,
    HeaderComponent,
    FooterComponent,
    LeftpanelComponent,
    RightpanelComponent,
    NotificationComponent,
    ChatroomComponent,
    LikesComponent,
    FavoritesComponent,
    VisitorsComponent,
    InboxComponent,
    PersoncardComponent,
    MyprofileComponent,
    ProfileComponent,
    UserlistComponent,
    ChatboxComponent,
    PaymentComponent,
  ],
  imports: [
    CommonModule,
    NpnSliderModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule,
    MatFormFieldModule,
    NgxPayPalModule,
    LayoutRoutingModule,
    PipesModule,
    IconModule,
    A11yModule,
    ReactiveFormsModule,
    FormsModule,
    CommonUiKitModule,
    AvatarModule,
  ],
})
export class LayoutModule { }
