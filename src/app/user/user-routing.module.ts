import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ProfileComponent} from "./profile/profile.component";
import {PlaylistsComponent} from "./playlists/playlists.component";
import {SettingsComponent} from "./settings/settings.component";
import {LikedComponent} from "./liked/liked.component";

const routes: Routes = [
  {path: '', component: ProfileComponent},
  {path: 'profile', component: ProfileComponent},
  {path: 'settings', component: SettingsComponent},
  {path: 'playlists', component: PlaylistsComponent},
  {path: 'liked', component: LikedComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
