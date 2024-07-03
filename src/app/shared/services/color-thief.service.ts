import { ElementRef, inject, Injectable, Renderer2} from '@angular/core';
// @ts-ignore
import {default as ColorThief} from 'colorthief/dist/color-thief.mjs';
import {QueueService} from "../../queue/services/queue.service";
@Injectable({
  providedIn: 'root'
})
export class ColorThiefService {
  constructor(
  ) { }
  isAnimating: boolean = false;

  getRgbColorsFromImage(url: string, type: string, header?: boolean) : void {
    const colorThief = new ColorThief()
    const image = new Image()

    image.onload = () => {
    this.isAnimating = true;

      const dominantColor = colorThief.getColor(image);
      const palette = colorThief.getPalette(image);
      
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
          
          let linearGradient = this.getLinearGradient(palette);
          document.documentElement.style.setProperty('--queue', linearGradient);  
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
      image.src = encodeURIComponent(url)
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

  getLinearGradient(palette: [number[]]): string {
    const gradientStart = 'radial-gradient(';
    let gradientContent = [];
    const gradientEnd = ')';

    for(let i = 0; i < 2; i++) {
      gradientContent.push(`rgb(${palette[i][0]}, ${palette[i][1]}, ${palette[i][2]}) `)
    }

    let final = gradientContent.join(', ');
    console.log(gradientStart + final + gradientEnd)
    return gradientStart + final + gradientEnd;
  }
}
