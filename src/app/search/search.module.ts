import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SearchRoutingModule } from './search-routing.module';
import { SearchComponent } from './search.component';
import {AlbumsModule} from "../albums/albums.module";
import {SharedModule} from "../shared/shared.module";
import {GenreModule} from "../genre/genre.module";
import {ArtistsModule} from "../artists/artists.module";
import {MatRippleModule} from "@angular/material/core";
import {LoaderComponent} from "../core/loader/loader.component";
import {MatSelectModule} from "@angular/material/select";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    SearchComponent
  ],
  imports: [
    CommonModule,
    SearchRoutingModule,
    AlbumsModule,
    SharedModule,
    GenreModule,
    ArtistsModule,
    MatRippleModule,
    LoaderComponent,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class SearchModule { }
