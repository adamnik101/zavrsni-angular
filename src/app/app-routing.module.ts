import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {ExploreComponent} from "./explore/explore.component";
import {authGuard} from "./guards/auth.guard";
import {ServerErrorComponent} from "./server-error/server-error.component";
import {loggedInGuard} from "./guards/logged-in.guard";
import {adminGuard} from "./admin/guards/admin.guard";

const routes: Routes = [
  {path : '', pathMatch: "full",redirectTo: 'home'},
  {path : 'home', component: HomeComponent, loadChildren: () => import('./home/home.module').then(m => m.HomeModule), pathMatch: "full"},
  {path : 'explore', component: ExploreComponent, loadChildren: () => import('./explore/explore.module').then(m => m.ExploreModule)},
  {path : 'trending', loadChildren: () => import('./trending/trending.module').then(m => m.TrendingModule)},
  {path : 'auth', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule), canActivate: [loggedInGuard]},
  {path : 'genres', loadChildren: () => import('./genre/genre.module').then(m => m.GenreModule)},
  {path : 'playlists', loadChildren: () => import('./playlists/playlists.module').then(m => m.PlaylistsModule)},
  {path : 'artists', loadChildren: () => import('./artists/artists.module').then(m => m.ArtistsModule)},
  {path : 'albums', loadChildren: () => import('./albums/albums.module').then(m => m.AlbumsModule)},
  {path : 'user', loadChildren: () => import('./user/user.module').then(m => m.UserModule), canActivate: [authGuard]},
  {path : 'search', loadChildren: () => import('./search/search.module').then(m => m.SearchModule)},
  {path : 'queue', loadChildren: () => import('./queue/queue.module').then(m => m.QueueModule)},
  {path : 'admin', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule), canActivate: [authGuard, adminGuard]},
  {path : 'error', component: ServerErrorComponent, pathMatch: "full"},
  //{path : '**', pathMatch: 'full', redirectTo: 'explore'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    scrollPositionRestoration: "enabled"
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
