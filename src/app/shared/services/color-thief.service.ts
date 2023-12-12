import {ElementRef, Injectable, Renderer2} from '@angular/core';
// @ts-ignore
import {default as ColorThief} from 'colorthief/dist/color-thief.mjs';
import {QueueService} from "../../queue/services/queue.service";
@Injectable({
  providedIn: 'root'
})
export class ColorThiefService {
  constructor() { }


  getRgbColorsFromImage(renderer: Renderer2, url: string, element: ElementRef<any>) : void {

    const colorThief = new ColorThief()
    const image = new Image()
    image.src = url
    console.log(element)
    image.onload = () => {
      const dominantColor =  colorThief.getColor(image)
      const red = dominantColor[0]
      const green = dominantColor[1]
      const blue = dominantColor[2]

        let newBackground = `rgb(${red}, ${green}, ${blue})`
        //renderer.setStyle(element, 'background', newBackground)

      document.documentElement.style.setProperty('--queue',newBackground);
      //renderer.setStyle(element, 'transition', 'background 500ms ease 0s');
        //renderer.setStyle(element, 'background', '--queue')

    }

  }

  getDominantColors(image: HTMLImageElement) : [number[]] {
    let dominantColors: [number[]] = [[]]
    const colorThief = new ColorThief()
    dominantColors = colorThief.getPalette(image, 5)
    return dominantColors;
  }
}
