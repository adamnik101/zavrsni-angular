import { Component } from '@angular/core';
import {AdminGenreService} from "./services/admin-genre.service";

@Component({
  selector: 'app-genres',
  templateUrl: './genres.component.html',
  styleUrls: ['./genres.component.scss']
})
export class GenresComponent {


  constructor(public adminGenreService: AdminGenreService) {

  }

  ngOnInit() {
    this.adminGenreService.getGenres().subscribe({
      next: (pagedResponse) => {
        this.adminGenreService.setPagedResponse(pagedResponse)
      }
    })
  }
}
