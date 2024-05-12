import {Component, OnInit} from '@angular/core';
import {AdminGenreService} from "./services/admin-genre.service";
import {LoaderService} from "../../core/services/loader.service";

@Component({
  selector: 'app-genres',
  templateUrl: './genres.component.html',
  styleUrls: ['./genres.component.scss']
})
export class GenresComponent implements OnInit{
  constructor(public adminGenreService: AdminGenreService,
              private _loader: LoaderService) { }

  ngOnInit(): void {
    this._loader.showLoader()
    this.adminGenreService.getPagedResponse().subscribe({
      next: (response) => {
        this.adminGenreService.setPagedResponse(response.data)
        this._loader.hideLoader()
      }
    })
  }
}
