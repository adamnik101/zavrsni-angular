import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TrendingRoutingModule } from './trending-routing.module';
import { TrendingComponent } from './trending.component';
import {SharedModule} from "../shared/shared.module";
import {AlbumsModule} from "../albums/albums.module";
import {ArtistsModule} from "../artists/artists.module";
import {MatIconModule} from "@angular/material/icon";


@NgModule({
  declarations: [
    TrendingComponent
  ],
    imports: [
        CommonModule,
        TrendingRoutingModule,
        SharedModule,
        AlbumsModule,
        ArtistsModule,
        MatIconModule
    ]
})
export class TrendingModule { }
