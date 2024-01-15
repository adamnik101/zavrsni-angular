import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogModule} from "@angular/material/dialog";
import {DialogRef} from "@angular/cdk/dialog";
import {MatButtonModule} from "@angular/material/button";
import {SelectionService} from "../services/selection.service";

@Component({
  selector: 'app-delete-multiple-entities-dialog',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule],
  templateUrl: './delete-multiple-entities-dialog.component.html',
  styleUrl: './delete-multiple-entities-dialog.component.scss'
})
export class DeleteMultipleEntitiesDialog {
  constructor(@Inject(MAT_DIALOG_DATA) public data: string = '',
              protected selectionService: SelectionService,
              private _dialogRef: DialogRef<DeleteMultipleEntitiesDialog>) { }

  confirm() {
    console.log(this.data)
  }
  cancel() {
    this._dialogRef.close()
  }
}
