import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AlbumsRoutingModule } from './albums-routing.module';
import { AlbumDetailComponent } from './album-detail/album-detail.component';
import {SharedModule} from "../shared/shared.module";
import { AlbumCardComponent } from './album-card/album-card.component';


@NgModule({
  declarations: [
    AlbumDetailComponent,
    AlbumCardComponent
  ],
  exports: [
    AlbumCardComponent
  ],
  imports: [
    CommonModule,
    AlbumsRoutingModule,
    SharedModule
  ]
})
export class AlbumsModule { }
