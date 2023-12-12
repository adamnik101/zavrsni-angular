import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { ProfileComponent } from './profile/profile.component';
import { PlaylistsComponent } from './playlists/playlists.component';
import { SettingsComponent } from './settings/settings.component';
import {PlaylistsModule} from "../playlists/playlists.module";
import {SharedModule} from "../shared/shared.module";
import { LikedComponent } from './liked/liked.component';
import { FollowingComponent } from './following/following.component';
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatDividerModule} from "@angular/material/divider";
import {MatSlideToggleModule} from "@angular/material/slide-toggle";


@NgModule({
    declarations: [
        ProfileComponent,
        PlaylistsComponent,
        SettingsComponent,
        LikedComponent,
        FollowingComponent
    ],
    exports: [
        FollowingComponent
    ],
  imports: [
    CommonModule,
    UserRoutingModule,
    PlaylistsModule,
    SharedModule,
    MatProgressSpinnerModule,
    MatDividerModule,
    MatSlideToggleModule
  ]
})
export class UserModule { }
