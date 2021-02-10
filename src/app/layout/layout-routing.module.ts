import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LayoutComponent } from './layout.component';
import { InboxComponent } from './inbox/inbox.component';
import { VisitorsComponent } from './visitors/visitors.component';
import { LikesComponent } from './likes/likes.component';
import { FavoritesComponent } from './favorites/favorites.component';
import { ChatroomComponent } from './chatroom/chatroom.component';
import { MyprofileComponent } from './myprofile/myprofile.component';
import { ProfileComponent } from './profile/profile.component';
import { ROUTES } from '../core/data/routes';
import { UserResolver } from '../core/resolvers/user.resolver';
import { RoleGuard } from '../core/guards/role.guard';
import { UserRole } from '../core/models/auth';
import { UserlistComponent } from './userlist/userlist.component';


const routes: Routes = [
  {
    path: ROUTES.root,
    component: LayoutComponent,
    resolve: { user: UserResolver },
    canActivate: [RoleGuard],
    data: {
      roles: [UserRole.Admin, UserRole.Customer, UserRole.Moderator]
    },
    children: [
      {
        path: ROUTES.root,
        redirectTo: ROUTES.home.chats,
      },
      {
        path: ROUTES.home.chats,
        component: UserlistComponent,
        resolve: { user: UserResolver },
        canActivate: [RoleGuard],
        data: {
          roles: [UserRole.Admin, UserRole.Customer, UserRole.Moderator]
        }
      },
      {
        path: ROUTES.home.chatroom,
        component: ChatroomComponent,
        resolve: { user: UserResolver },
        canActivate: [RoleGuard],
        data: {
          roles: [UserRole.Admin, UserRole.Customer, UserRole.Moderator]
        }
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
        resolve: { user: UserResolver },
        canActivate: [RoleGuard],
        data: {
          roles: [UserRole.Admin, UserRole.Customer, UserRole.Moderator]
        }
      },
      {
        path: ROUTES.home.profile,
        component: ProfileComponent,
      },
      {
        path: ROUTES.home.support.root,
        loadChildren: () => import('./support/support.module').then(m => m.SupportModule),
      },
      {
        path: ROUTES.home.legal.root,
        loadChildren: () => import('./legal/legal.module').then(m => m.LegalModule),
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }
