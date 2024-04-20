import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogModule} from "@angular/material/dialog";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";
import {Artist} from "../../../artists/interfaces/artist";
import {MatButtonModule} from "@angular/material/button";
import {FormComponent} from "../../interfaces/form-component";
import {FormData} from "../../interfaces/form-data";

@Component({
  selector: 'app-artist-form-dialog',
  standalone: true,
  imports: [
    MatDialogModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './artist-form-dialog.component.html',
  styleUrl: './artist-form-dialog.component.scss'
})
export class ArtistFormDialogComponent implements FormComponent<Artist>, OnInit{

  group: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required])
  })
  constructor(@Inject(MAT_DIALOG_DATA) public data: FormData<Artist>) { }
  ngOnInit() {
    if(this.data.isEdit) {
      this.fillForm(this.data.item)
    }
  }
  fillForm(item: Artist): void {
    this.group.get('name')?.setValue(item.name)
  }

  submitForm(): void {
    console.log(this.group.getRawValue())
  }
}
