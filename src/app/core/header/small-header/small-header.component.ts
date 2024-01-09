import {Component, Input} from '@angular/core';
import {ColorThiefService} from "../../../shared/services/color-thief.service";
import {animate, state, style, transition, trigger} from "@angular/animations";
import {NgClass} from "@angular/common";

@Component({
  selector: 'app-small-header',
  standalone: true,
  imports: [
    NgClass
  ],
  templateUrl: './small-header.component.html',
  styleUrl: './small-header.component.scss',
})
export class SmallHeaderComponent {
  @Input('title') title: string = ''
  @Input('image') image: string  = ''
  @Input('shouldShow') shouldShow: boolean = false

  constructor(private _colorService: ColorThiefService) {
  }
  ngOnInit() {
    console.log('init')
    this._colorService.getRgbColorsFromImage(this.image,'small-header')
  }
  ngOnDestroy() {
    this.shouldShow = false
    document.documentElement.style.setProperty('--small-header', 'var(--primary-black)')
  }
}
