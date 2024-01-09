import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PlaylistsRoutingModule } from './playlists-routing.module';
import { CreatePlaylistDialogComponent } from './create-playlist-dialog/create-playlist-dialog.component';
import {MatDialogModule} from "@angular/material/dialog";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import { PlaylistDetailComponent } from './playlist-detail/playlist-detail.component';
import { PlaylistCardComponent } from './playlist-card/playlist-card.component';
import {MatMenuModule} from "@angular/material/menu";
import {SharedModule} from "../shared/shared.module";
import {MatRippleModule} from "@angular/material/core";
import { PublicPlaylistCardComponent } from './public-playlist-card/public-playlist-card.component';
import {MatIconModule} from "@angular/material/icon";
import {SmallHeaderComponent} from "../core/header/small-header/small-header.component";


@NgModule({
  declarations: [
    CreatePlaylistDialogComponent,
    PlaylistDetailComponent,
    PlaylistCardComponent,
    PublicPlaylistCardComponent
  ],
  exports: [
    PlaylistCardComponent,
    PublicPlaylistCardComponent
  ],
    imports: [
        CommonModule,
        PlaylistsRoutingModule,
        MatDialogModule,
        FormsModule,
        MatInputModule,
        MatButtonModule,
        ReactiveFormsModule,
        MatMenuModule,
        SharedModule,
        MatRippleModule,
        MatIconModule,
        SmallHeaderComponent,
    ]
})
export class PlaylistsModule { }
