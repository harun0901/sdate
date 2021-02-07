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
import { ROUTES } from '../core/data/routes';


const routes: Routes = [
  {
    path: ROUTES.root,
    component: LayoutComponent,
    children: [
      {
        path: ROUTES.root,
        component: ChatroomComponent,
      },
      {
        path: ROUTES.home.chatroom,
        component: ChatroomComponent,
      },
      {
        path: ROUTES.home.inbox,
        component: InboxComponent,
      },
      {
        path: ROUTES.home.visitors,
        component: VisitorsComponent,
      },
      {
        path: ROUTES.home.likes,
        component: LikesComponent,
      },
      {
        path: ROUTES.home.favorites,
        component: FavoritesComponent,
      },
      {
        path: ROUTES.home.myprofile,
        component: MyprofileComponent,
      },
      {
        path: ROUTES.home.profile,
        component: ProfileComponent,
      },
      {
        path: ROUTES.home.support.root,
        loadChildren: () => import('./support/support.module').then(m => m.SupportModule),
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }
