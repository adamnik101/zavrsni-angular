import {ChangeDetectionStrategy, Component, inject, OnInit} from '@angular/core';
import {UserService} from "./user/services/user.service";
import {Title} from "@angular/platform-browser";
import {QueueService} from "./queue/services/queue.service";
import {animate, state, style, transition, trigger} from '@angular/animations';
import {PlaylistService} from "./playlists/services/playlist.service";
import {LoaderService} from "./core/services/loader.service";
import {TokenService} from "./auth/services/token.service";
import {forkJoin, Observable} from "rxjs";
import {SpinnerFunctions} from "./core/static-functions";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default,
  animations: [
    trigger('slideInOut', [
      state('in', style({ transform: 'translateY(0)' })),
      transition('void => *', [
        style({  transform: 'translateY(100vh)'}),
        animate('500ms ease-in-out')
      ]),
      transition('* => void', [
        animate('500ms ease-in-out', style({  transform: 'translateY(100vh)'}))
      ])
    ])
  ]
})
export class AppComponent implements OnInit {

  title = 'Home - TREBLE';

  private _userService = inject(UserService)
  private _titleService = inject(Title)
  private _playlistService = inject(PlaylistService)
  public queueService = inject(QueueService)
  public loaderService = inject(LoaderService)
  private _tokenService = inject(TokenService)
  ngOnInit() {

    if(this._tokenService.getToken()){
      SpinnerFunctions.showSpinner();
      this._tokenService.checkTokenFromApi().subscribe({
        next: (response) => {

          if(response.data.token == null) {
            return
          }

          this.getDataFromAllRequests().subscribe({
            next: (data) => {
              if(data) {
              }
              SpinnerFunctions.hideSpinner();
            }
          });
        }
      })
    }

    this._titleService.setTitle('Treble')
  }

  getDataFromAllRequests(): Observable<any> {
    return forkJoin({
      user: this._userService.getUser(),
      playlists: this._playlistService.getPlaylists()
    })
  }
}
