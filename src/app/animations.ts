import {animate, animation, style} from "@angular/animations";


export const transitionAnimation = animation([
  style({
    top: '{{ top }}'
  }),
  animate('{{ time }}')
])
