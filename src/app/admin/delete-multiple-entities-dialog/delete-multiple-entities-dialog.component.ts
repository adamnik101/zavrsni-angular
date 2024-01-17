import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogModule} from "@angular/material/dialog";
import {DialogRef} from "@angular/cdk/dialog";
import {MatButtonModule} from "@angular/material/button";
import {SelectionService} from "../services/selection.service";
import {AdminService} from "../services/admin.service";

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
              private _dialogRef: DialogRef<DeleteMultipleEntitiesDialog>,
              private _adminService: AdminService,
  ) { }

  confirm() {
    return this._adminService.deleteMany(this.data).subscribe({
      next: (response) => {
        this.selectionService.removeAllFromSelected()
        console.log(response)


      }
    })
  }
  cancel() {
    this._dialogRef.close()
  }
}
