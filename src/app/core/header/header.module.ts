import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header.component';
import { SearchBarComponent } from './search-bar/search-bar.component';
import {MatMenuModule} from "@angular/material/menu";
import {MatRippleModule} from "@angular/material/core";
import {RouterLink} from "@angular/router";
import {ReactiveFormsModule} from "@angular/forms";
import {MatIconModule} from "@angular/material/icon";
import {MatListModule} from "@angular/material/list";



@NgModule({
    declarations: [
        HeaderComponent,
        SearchBarComponent
    ],
    exports: [
        HeaderComponent
    ],
  imports: [
    CommonModule,
    MatMenuModule,
    MatRippleModule,
    RouterLink,
    ReactiveFormsModule,
    MatIconModule,
    MatListModule
  ]
})
export class HeaderModule { }
