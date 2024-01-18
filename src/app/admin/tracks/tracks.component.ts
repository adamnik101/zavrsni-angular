import { Component } from '@angular/core';
import {AdminTracksService} from "./services/admin-tracks.service";

@Component({
  selector: 'app-tracks',
  templateUrl: './tracks.component.html',
  styleUrls: ['./tracks.component.scss']
})
export class TracksComponent {

  constructor(public adminTrackService: AdminTracksService) {
  }

  ngOnInit() {
    this.adminTrackService.getPagedResponse().subscribe({
      next: (pagedResponse) => {
        this.adminTrackService.setPagedResponse(pagedResponse)
      }
    })
  }
}
