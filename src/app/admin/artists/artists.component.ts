import {Component, inject} from '@angular/core';
import {AdminService} from "../services/admin.service";
import {Artist} from "../../artists/interfaces/artist";
import {PagedResponse} from "../../shared/interfaces/paged-response";
import {BehaviorSubject} from "rxjs";
import {AdminArtistService} from "../services/admin-artist.service";
import {LoaderService} from "../../core/services/loader.service";
import { SpinnerFunctions } from 'src/app/core/static-functions';

@Component({
  selector: 'app-artists',
  templateUrl: './artists.component.html',
  styleUrls: ['./artists.component.scss']
})
export class ArtistsComponent {
  artists: Artist[] = []

  constructor(
    public adminArtistsService: AdminArtistService,
  ) {}

  ngOnInit() {
    SpinnerFunctions.showSpinner();
    this.adminArtistsService.getPagedResponse().subscribe({
      next: (pagedResponse) => {
        this.adminArtistsService.setPagedResponse(pagedResponse.data)
        SpinnerFunctions.hideSpinner();
      }
    })
  }
}
