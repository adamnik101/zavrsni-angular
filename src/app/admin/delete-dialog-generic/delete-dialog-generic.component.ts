import {Component} from '@angular/core';
import {MatDialogModule} from "@angular/material/dialog";
import {DialogRef} from "@angular/cdk/dialog";
import {MatButtonModule} from "@angular/material/button";
import {SelectionService} from "../services/selection.service";

@Component({
  selector: 'app-delete-dialog-generic',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule],
  templateUrl: './delete-dialog-generic.component.html',
  styleUrl: './delete-dialog-generic.component.scss'
})
export class DeleteDialogGenericComponent {
  constructor(protected selectionService: SelectionService,
              private _dialogRef: DialogRef<DeleteDialogGenericComponent>) { }

  confirm() {

  }
  cancel() {
    this._dialogRef.close()
  }
}
