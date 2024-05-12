import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatButtonModule} from "@angular/material/button";
import {MAT_DIALOG_DATA, MatDialogModule} from "@angular/material/dialog";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatOptionModule} from "@angular/material/core";
import {MatSelectModule} from "@angular/material/select";
import {DialogData} from "../../interfaces/dialog-data";
import {Artist} from "../../../artists/interfaces/artist";
import {Album} from "../../../albums/interfaces/album";
import {AdminService} from "../../services/admin.service";
import {ArtistService} from "../../../artists/services/artist.service";
import {DialogLoadingComponent} from "../../dialog-loading/dialog-loading.component";
import {FormComponent} from "../../interfaces/form-component";
import {Observable} from "rxjs";

@Component({
  selector: 'app-albums-form-dialog',
  standalone: true,
  imports: [
    FormsModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatOptionModule,
    MatSelectModule,
    ReactiveFormsModule,
    DialogLoadingComponent
  ],
  templateUrl: './albums-form-dialog.component.html',
  styleUrl: './albums-form-dialog.component.scss'
})
export class AlbumsFormDialogComponent implements FormComponent<Album>, OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData<Album>,
              private artistService: ArtistService,
              private adminService: AdminService
  ) { }

  currentYear = new Date().getFullYear();
  years: number[] = [];
  artists: Artist[] = [];
  dataLoading: boolean = true;
  group = new FormGroup({
    name: new FormControl('', [Validators.required]),
    artist_id: new FormControl('', [Validators.required]),
    release_year: new FormControl('', [Validators.required, Validators.max(new Date().getFullYear())]),
    cover: new FormControl('')
  });

  ngOnInit(): void {
    this.years = this.createRangeForYears(101);
    this.getArtists();

    if(this.data.isEdit) {
      this.fillForm(this.data.item);
    }
  }

  getArtists(): void {
    this.artistService.getArtists().subscribe({
      next: (artists) => {
        this.artists = artists.data;
        this.dataLoading = false;
      }
    })
  }

  fillForm(data: Album): void {
    this.fillAlbumName(data.name);
    this.fillArtist(data.artist.id)
    this.fillReleaseYear(data.release_year);
    this.fillCover(data.cover);
  }

  fillAlbumName(name: string): void {
    this.group.get('name')?.setValue(name);
  }

  fillArtist(id: string): void {
    this.group.get('artist_id')?.setValue(id);
  }

  fillReleaseYear(year: any): void {
    this.group.get('release_year')?.setValue(year);
  }

  fillCover(imagePath: string): void {
    this.group.get('cover')?.setValue(imagePath);
  }

  submitForm(): void {
    let data: FormData = this.prepareDataToSend();
    console.log(data)
    if(this.data.isEdit) {
      this.submitUpdate(data).subscribe({
        next: (data) => {
          console.log(data)
        },
        error: (err) => {

        }
      })
    }
     else {
       this.submitInsert(data).subscribe({
         next: (data) => {
            console.log(data)
         },
         error: (err) => {

         }
       })
    }
  }

  prepareDataToSend(): FormData {
    let formData = new FormData();

    formData.append('name', this.group.controls.name.value!);
    formData.append('artist_id', this.group.controls.artist_id.value!);
    formData.append('cover', this.group.controls.cover.value!);
    formData.append('release_year', this.group.controls.release_year.value!);

    return formData;
  }

  submitInsert(data: FormData): Observable<any> {
    return this.adminService.insert('albums', data);
  }

  submitUpdate(data: FormData): Observable<any> {
    return this.adminService.update('albums', data, this.data.item.id);
  }

  createRangeForYears (years: number) {
    return new Array(years).fill(this.currentYear)
      .map((n, index) => this.currentYear - index)
  }
}
