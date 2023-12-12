import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GenreRoutingModule } from './genre-routing.module';
import { GenreCardComponent } from './genre-card/genre-card.component';


@NgModule({
  declarations: [
    GenreCardComponent
  ],
  exports: [
    GenreCardComponent
  ],
  imports: [
    CommonModule,
    GenreRoutingModule
  ]
})
export class GenreModule { }
