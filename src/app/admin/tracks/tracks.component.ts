import { Component } from '@angular/core';
import {AdminTracksService} from "./services/admin-tracks.service";
import {TrackService} from "../../tracks/services/track.service";
import {LoaderService} from "../../core/services/loader.service";

@Component({
  selector: 'app-tracks',
  templateUrl: './tracks.component.html',
  styleUrls: ['./tracks.component.scss']
})
export class TracksComponent {

  constructor(public trackService: TrackService,
              protected adminTrackService: AdminTracksService,
              private _loader: LoaderService) {
  }

  ngOnInit() {
    this._loader.showLoader()
    this.trackService.getTracks().subscribe({
      next: (response) => {
        this.adminTrackService.setPagedResponse(response.data)
        this._loader.hideLoader()
      }
    })
  }
}
