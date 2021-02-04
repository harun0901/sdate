import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NpnSliderModule } from 'npn-slider';

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


@NgModule({
  declarations: [LayoutComponent, HeaderComponent, FooterComponent, LeftpanelComponent, RightpanelComponent, NotificationComponent, ChatroomComponent, LikesComponent, FavoritesComponent, VisitorsComponent, InboxComponent, PersoncardComponent, MyprofileComponent, ProfileComponent],
  imports: [
    CommonModule,
    NpnSliderModule,
    LayoutRoutingModule,
    PipesModule,
    IconModule,
  ],
})
export class LayoutModule { }
