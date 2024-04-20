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
    this.adminGenreService.getPagedResponse().subscribe({
      next: (response) => {
        this.adminGenreService.setPagedResponse(response.data)
      }
    })
  }
}
