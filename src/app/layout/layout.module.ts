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


@NgModule({
  declarations: [LayoutComponent, HeaderComponent, FooterComponent, LeftpanelComponent, RightpanelComponent, NotificationComponent, ChatroomComponent],
  imports: [
    CommonModule,
    NpnSliderModule,
    LayoutRoutingModule,
    PipesModule,
    IconModule,
  ],
})
export class LayoutModule { }
