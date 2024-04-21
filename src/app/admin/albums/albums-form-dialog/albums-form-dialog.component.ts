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
        ReactiveFormsModule
    ],
  templateUrl: './albums-form-dialog.component.html',
  styleUrl: './albums-form-dialog.component.scss'
})
export class AlbumsFormDialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData<Album>) { }

  currentYear = new Date().getFullYear();
  years: number[] = [];
  albumGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    artist: new FormControl(null, [Validators.required]),
    releaseYear: new FormControl('', [Validators.required, Validators.max(new Date().getFullYear())])
  });

  ngOnInit(): void {
    this.years = this.createRangeForYears(101);

    if(this.data.isEdit) {
      this.fillForm(this.data.item);
    }
  }

  fillForm(data: Album): void {
    this.fillAlbumName(data.name);
    this.fillReleaseYear(data.release_year);
  }

  fillAlbumName(name: string): void {
    this.albumGroup.get('name')?.setValue(name);
  }

  fillReleaseYear(year: any): void {
    this.albumGroup.get('releaseYear')?.setValue(year);
  }

  submitForm(): void {
    console.log('submit')
  }

  createRangeForYears (years: number) {
    return new Array(years).fill(this.currentYear)
      .map((n, index) => this.currentYear - index)
  }
}
