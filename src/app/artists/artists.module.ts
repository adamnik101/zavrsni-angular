import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ArtistsRoutingModule } from './artists-routing.module';
import { ArtistDetailComponent } from './artist-detail/artist-detail.component';
import {SharedModule} from "../shared/shared.module";
import {MatTabsModule} from "@angular/material/tabs";
import {AlbumsModule} from "../albums/albums.module";
import { ArtistCardComponent } from './artist-card/artist-card.component';
import { ArtistRoundCardComponent } from './artist-round-card/artist-round-card.component';
import {SmallHeaderComponent} from "../core/header/small-header/small-header.component";


@NgModule({
  declarations: [
    ArtistDetailComponent,
    ArtistCardComponent,
    ArtistRoundCardComponent
  ],
    exports: [
        ArtistCardComponent,
        ArtistRoundCardComponent
    ],
    imports: [
        CommonModule,
        ArtistsRoutingModule,
        SharedModule,
        MatTabsModule,
        AlbumsModule,
        SmallHeaderComponent,
    ]
})
export class ArtistsModule { }
