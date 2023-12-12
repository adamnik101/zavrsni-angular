import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExploreComponent } from './explore.component';
import {GenreModule} from "../genre/genre.module";



@NgModule({
  declarations: [
    ExploreComponent
  ],
  imports: [
    CommonModule,
    GenreModule
  ]
})
export class ExploreModule { }
