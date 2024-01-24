import { Component } from '@angular/core';
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";

@Component({
  selector: 'app-dialog-loading',
  standalone: true,
  imports: [
    MatProgressSpinnerModule
  ],
  templateUrl: './dialog-loading.component.html',
  styleUrl: './dialog-loading.component.scss'
})
export class DialogLoadingComponent {

}
