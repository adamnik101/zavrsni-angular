import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GenreRoutingModule } from './genre-routing.module';
import { GenreCardComponent } from './genre-card/genre-card.component';
import { GenreDetailComponent } from './genre-detail/genre-detail.component';
import {PlaylistsModule} from "../playlists/playlists.module";
import {SharedModule} from "../shared/shared.module";
import {LoaderComponent} from "../core/loader/loader.component";


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
    PlaylistsModule,
    SharedModule,
    LoaderComponent
  ]
})
export class GenreModule { }
