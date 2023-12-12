import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {PlaylistDetailComponent} from "./playlist-detail/playlist-detail.component";

const routes: Routes = [
  {path: ':id', component: PlaylistDetailComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlaylistsRoutingModule { }
