import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header.component';
import { SearchBarComponent } from './search-bar/search-bar.component';
import {MatMenuModule} from "@angular/material/menu";
import {MatRippleModule} from "@angular/material/core";
import {RouterLink} from "@angular/router";
import {ReactiveFormsModule} from "@angular/forms";



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
        ReactiveFormsModule
    ]
})
export class HeaderModule { }
