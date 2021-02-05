import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LayoutComponent } from './layout.component';
import { InboxComponent } from './inbox/inbox.component';
import { VisitorsComponent } from './visitors/visitors.component';
import { LikesComponent } from './likes/likes.component';
import { FavoritesComponent } from './favorites/favorites.component';
import { ChatroomComponent } from './chatroom/chatroom.component';
import { MyprofileComponent } from './myprofile/myprofile.component';
import { ProfileComponent } from './profile/profile.component';


const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        component: ChatroomComponent,
      },
      {
        path: 'chatroom',
        component: ChatroomComponent,
      },
      {
        path: 'inbox',
        component: InboxComponent,
      },
      {
        path: 'visitors',
        component: VisitorsComponent,
      },
      {
        path: 'likes',
        component: LikesComponent,
      },
      {
        path: 'favorites',
        component: FavoritesComponent,
      },
      {
        path: 'my-profile',
        component: MyprofileComponent,
      },
      {
        path: 'profile',
        component: ProfileComponent,
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }
