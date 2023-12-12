import { Injectable } from '@angular/core';
import {MatSnackBar, MatSnackBarConfig} from "@angular/material/snack-bar";

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {

  constructor(private _snackbar: MatSnackBar) { }
  private successSnackbarConfig: MatSnackBarConfig = {
    horizontalPosition: "center",
    verticalPosition: "bottom",
    duration: 4000,
    panelClass: ['success-snack']
  }
  private failedSnackbarConfig: MatSnackBarConfig = {
    horizontalPosition: "center",
    verticalPosition: "bottom",
    duration: 5000,
    panelClass: ['failed-snack']
  }

  showSuccessMessage(message: string) {
    this._snackbar.open(message, undefined, this.successSnackbarConfig)
  }
  showFailedMessage(message: string) {
    this._snackbar.open(message, undefined, this.failedSnackbarConfig)
  }
}
