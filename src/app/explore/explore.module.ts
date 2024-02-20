import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExploreComponent } from './explore.component';
import {GenreModule} from "../genre/genre.module";
import {LoaderComponent} from "../core/loader/loader.component";



@NgModule({
  declarations: [
    ExploreComponent
  ],
    imports: [
        CommonModule,
        GenreModule,
        LoaderComponent
    ]
})
export class ExploreModule { }
