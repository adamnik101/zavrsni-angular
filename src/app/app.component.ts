import {ChangeDetectionStrategy, Component, inject, OnInit} from '@angular/core';
import {UserService} from "./user/services/user.service";
import {Title} from "@angular/platform-browser";
import {QueueService} from "./queue/services/queue.service";
import {animate, state, style, transition, trigger} from '@angular/animations';
import {PlaylistService} from "./playlists/services/playlist.service";
import {LoaderService} from "./core/services/loader.service";
import {TokenService} from "./auth/services/token.service";

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
      this.loaderService.showLoader()
      this._tokenService.checkTokenFromApi().subscribe({
        next: (response) => {
          console.log(response)
          if(response.token == null) {

            return
          }
          this._userService.getUser()
          this._playlistService.getPlaylists()
        }
      }).add(() => {
        this.loaderService.hideLoader()
      })
    }

    this._titleService.setTitle('Treble')
  }
}
