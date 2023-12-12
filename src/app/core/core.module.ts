import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SidenavModule} from "./sidenav/sidenav.module";
import {MatDialogModule} from "@angular/material/dialog";



@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    SidenavModule,
    MatDialogModule
  ],
  exports: [
    SidenavModule
  ]
})
export class CoreModule { }
