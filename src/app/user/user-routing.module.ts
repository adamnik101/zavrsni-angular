import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ProfileComponent} from "./profile/profile.component";
import {PlaylistsComponent} from "./playlists/playlists.component";
import {SettingsComponent} from "./settings/settings.component";
import {LikedComponent} from "./liked/liked.component";
import {FollowingComponent} from "./following/following.component";

const routes: Routes = [
  {path: '', component: ProfileComponent, pathMatch: "full"},
  {path: 'profile', component: ProfileComponent},
  {path: 'settings', component: SettingsComponent},
  {path: 'playlists', component: PlaylistsComponent},
  {path: 'followings', component: FollowingComponent},
  {path: 'liked', component: LikedComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
