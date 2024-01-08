import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GenreRoutingModule } from './genre-routing.module';
import { GenreCardComponent } from './genre-card/genre-card.component';
import { GenreDetailComponent } from './genre-detail/genre-detail.component';
import {PlaylistsModule} from "../playlists/playlists.module";


@NgModule({
  declarations: [
    GenreCardComponent,
    GenreDetailComponent
  ],
  exports: [
    GenreCardComponent,
  ],
  imports: [
    CommonModule,
    GenreRoutingModule,
    PlaylistsModule
  ]
})
export class GenreModule { }
