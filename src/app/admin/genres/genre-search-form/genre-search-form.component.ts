import { Component } from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {AdminGenreService} from "../services/admin-genre.service";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {HttpParams} from "@angular/common/http";

@Component({
  selector: 'app-genre-search-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatDatepickerModule
  ],
  templateUrl: './genre-search-form.component.html',
  styleUrl: './genre-search-form.component.scss'
})
export class GenreSearchFormComponent {
  constructor(private _adminGenreService: AdminGenreService) {
  }
  genreFormGroup = new FormGroup({
    name: new FormControl(''),
    createdFrom: new FormControl(undefined),
    createdTo: new FormControl(undefined),
    updatedFrom: new FormControl(undefined),
    updatedTo: new FormControl(undefined)
  })

  search() {
    let group = this.genreFormGroup
    let name = group.get('name')?.value?.trim()
    let createdFrom = group.get('createdFrom')?.value
    let createdTo = group.get('createdTo')?.value
    let updatedFrom = group.get('updatedFrom')?.value
    let updatedTo = group.get('updatedTo')?.value

    this._adminGenreService.params = new HttpParams()

    if(name) {
      this._adminGenreService.params = this._adminGenreService.params.append('name', name)
    }
    if(createdFrom) {
      this._adminGenreService.params = this._adminGenreService.params.append('createdFrom', createdFrom)
    }
    if(createdTo) {
      this._adminGenreService.params = this._adminGenreService.params.append('createdTo', createdTo)
    }
    if(updatedFrom) {
      this._adminGenreService.params = this._adminGenreService.params.append('updatedFrom', updatedFrom)
    }
    if(updatedTo) {
      this._adminGenreService.params = this._adminGenreService.params.append('updatedTo', updatedTo)
    }

    this._adminGenreService.getPagedResponse(this._adminGenreService.params).subscribe({
      next: (pagedResponse) => {
        this._adminGenreService.setPagedResponse(pagedResponse)
      }
    })
  }
  reset() {
    this.genreFormGroup.reset()
  }
}
