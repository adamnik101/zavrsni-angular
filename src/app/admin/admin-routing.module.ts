import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {DashboardComponent} from "./dashboard/dashboard.component";
import {ArtistsComponent} from "./artists/artists.component";
import {TracksComponent} from "./tracks/tracks.component";
import {AlbumsComponent} from "./albums/albums.component";
import {GenresComponent} from "./genres/genres.component";
import {UsersComponent} from "./users/users.component";

const routes: Routes = [
  {path: '', component: DashboardComponent},
  {path: 'artists', component: ArtistsComponent},
  {path: 'users', component: UsersComponent},
  {path: 'tracks', component: TracksComponent},
  {path: 'albums', component: AlbumsComponent},
  {path: 'genres', component: GenresComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
