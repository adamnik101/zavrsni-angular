import {Component, Input} from '@angular/core';
import {PagedResponse} from "../../../shared/interfaces/paged-response";
import {Track} from "../../../shared/interfaces/track";
import {AdminTracksService} from "../services/admin-tracks.service";

@Component({
  selector: 'app-tracks-table',
  templateUrl: './tracks-table.component.html',
  styleUrls: ['./tracks-table.component.scss']
})
export class TracksTableComponent {
  @Input('pagedResponse') pagedResponse: PagedResponse<Track[]> = {} as PagedResponse<Track[]>

  constructor(private _adminTrackService: AdminTracksService) {
  }
  navigateTo(url: string) {
    return this._adminTrackService.navigateTo(url).subscribe({
      next: (pagedResponse) => {
        this._adminTrackService.setPagedResponse(pagedResponse)
      }
    })
  }

  openEditDialog(track: Track) {

  }

  openDeleteDialog(id: string, title: string, tracks: string, current_page: number) {

  }
}
