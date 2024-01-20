import {ChangeDetectionStrategy, Component, inject, OnInit} from '@angular/core';
import {UserService} from "./user/services/user.service";
import {Title} from "@angular/platform-browser";
import {QueueService} from "./queue/services/queue.service";
import {animate, state, style, transition, trigger} from '@angular/animations';
import {PlaylistService} from "./playlists/services/playlist.service";
import {LoaderService} from "./core/services/loader.service";

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
  ngOnInit() {
    this._userService.getUser()
    this._playlistService.getPlaylists()
    this._titleService.setTitle('Treble')
  }
}
