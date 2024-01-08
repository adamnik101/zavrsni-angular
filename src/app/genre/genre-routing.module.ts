import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {GenreCardComponent} from "./genre-card/genre-card.component";
import {GenreDetailComponent} from "./genre-detail/genre-detail.component";

const routes: Routes = [
  {path: ':id', component: GenreDetailComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GenreRoutingModule { }
