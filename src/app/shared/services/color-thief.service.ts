import {ElementRef, Injectable, Renderer2} from '@angular/core';
// @ts-ignore
import {default as ColorThief} from 'colorthief/dist/color-thief.mjs';
import {QueueService} from "../../queue/services/queue.service";
@Injectable({
  providedIn: 'root'
})
export class ColorThiefService {
  constructor() { }

  getRgbColorsFromImage(url: string, type: string, header?: boolean) : void {

    const colorThief = new ColorThief()
    const image = new Image()


    image.onload = () => {
      const dominantColor =  colorThief.getColor(image)
      const red = dominantColor[0]
      const green = dominantColor[1]
      const blue = dominantColor[2]

      const darkenFactor = 0.8
      const darkerRed = red * darkenFactor
      const darkerGreen = green * darkenFactor
      const darkerBlue = blue * darkenFactor

      let newBackground = `rgb(${red}, ${green}, ${blue})`
      let newBackgroundDarker = `rgb(${darkerRed}, ${darkerGreen}, ${darkerBlue})`
      if(header) {
        document.documentElement.style.setProperty('--header', newBackgroundDarker);

      }
      switch (type) {
        case "artist": {
          document.documentElement.style.setProperty('--artist', `linear-gradient(to bottom, rgb(${red}, ${green}, ${blue}), var(--black))`);
        } break;
        case "playlist": {
          document.documentElement.style.setProperty('--playlist', `linear-gradient(to bottom, rgb(${red}, ${green}, ${blue}), var(--black))`);
        } break;
        case "queue" : {
          document.documentElement.style.setProperty('--queue', newBackground);
        } break;
        case "profile" : {
          document.documentElement.style.setProperty('--profile', `linear-gradient(to bottom, rgb(${red}, ${green}, ${blue}), var(--black))`);
        } break;
        case "small-header" : {
          console.log(newBackgroundDarker)
          document.documentElement.style.setProperty('--small-header', newBackgroundDarker);
        }
      }


    }

    let googleProxyURL = 'https://images1-focus-opensocial.googleusercontent.com/gadgets/proxy?container=focus&refresh=2592000&url=';
    image.crossOrigin = 'anonymous';
    if(type === 'profile') {
      image.src = url
    }
    else if (url.includes('placeholder')) {
      image.src = googleProxyURL + encodeURIComponent(url)
      console.log(url)
    }
    else {
      image.src = url
    }
  }

  getDominantColors(image: HTMLImageElement) : [number[]] {
    let dominantColors: [number[]] = [[]]
    const colorThief = new ColorThief()
    dominantColors = colorThief.getPalette(image, 5)
    return dominantColors;
  }
}
