import { Component } from '@angular/core';
import {AdminTracksService} from "./services/admin-tracks.service";
import {TrackService} from "../../tracks/services/track.service";

@Component({
  selector: 'app-tracks',
  templateUrl: './tracks.component.html',
  styleUrls: ['./tracks.component.scss']
})
export class TracksComponent {

  constructor(public trackService: TrackService,
              protected adminTrackService: AdminTracksService) {
  }

  ngOnInit() {
    this.trackService.getTracks().subscribe({
      next: (response) => {
        this.adminTrackService.setPagedResponse(response.data)
      }
    })
  }
}
