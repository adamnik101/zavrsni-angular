import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import { ArtistsComponent } from './artists/artists.component';
import { ArtistsTableComponent } from './artists/artists-table/artists-table.component';
import { CreateArtistDialogComponent } from './artists/create-artist-dialog/create-artist-dialog.component';
import {MatDialogModule} from "@angular/material/dialog";
import {MatButtonModule} from "@angular/material/button";
import {MatMenuModule} from "@angular/material/menu";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";
import {MatSelectModule} from "@angular/material/select";
import {MatRippleModule} from "@angular/material/core";
import { EditArtistDialogComponent } from './artists/edit-artist-dialog/edit-artist-dialog.component';
import { DeleteDialogComponent } from './delete-dialog/delete-dialog.component';
import { TracksComponent } from './tracks/tracks.component';
import { TracksTableComponent } from './tracks/tracks-table/tracks-table.component';
import {SharedModule} from "../shared/shared.module";
import { AlbumsComponent } from './albums/albums.component';
import { AlbumTableComponent } from './albums/album-table/album-table.component';
import { GenresComponent } from './genres/genres.component';
import { GenreTableComponent } from './genres/genre-table/genre-table.component';
import { UsersComponent } from './users/users.component';
import { UsersTableComponent } from './users/users-table/users-table.component';
import {HumanizeBooleanPipe} from "./pipes/humanize-boolean.pipe";
import {MatCheckboxModule} from "@angular/material/checkbox";

@NgModule({
  declarations: [
    DashboardComponent,
    ArtistsComponent,
    ArtistsTableComponent,
    CreateArtistDialogComponent,
    EditArtistDialogComponent,
    DeleteDialogComponent,
    TracksComponent,
    TracksTableComponent,
    AlbumsComponent,
    AlbumTableComponent,
    GenresComponent,
    GenreTableComponent,
    UsersComponent,
    UsersTableComponent,
  ],
    imports: [
        CommonModule,
        AdminRoutingModule,
        MatProgressSpinnerModule,
        MatDialogModule,
        MatButtonModule,
        MatMenuModule,
        ReactiveFormsModule,
        MatInputModule,
        MatSelectModule,
        MatRippleModule,
        FormsModule,
        SharedModule,
        HumanizeBooleanPipe,
        MatCheckboxModule
    ]
})
export class AdminModule { }
