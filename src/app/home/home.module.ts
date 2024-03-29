import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import {AlbumsModule} from "../albums/albums.module";
import {ArtistsModule} from "../artists/artists.module";
import {SharedModule} from "../shared/shared.module";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {LoaderComponent} from "../core/loader/loader.component";



@NgModule({
  declarations: [
    HomeComponent
  ],
    imports: [
        CommonModule,
        AlbumsModule,
        ArtistsModule,
        SharedModule,
        MatProgressSpinnerModule,
        LoaderComponent
    ]
})
export class HomeModule { }
