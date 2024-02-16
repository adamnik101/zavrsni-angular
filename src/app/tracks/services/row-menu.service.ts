import {ElementRef, Injectable, ViewChild} from '@angular/core';
import {Track} from "../../shared/interfaces/track";
import {MatMenu, MatMenuTrigger} from "@angular/material/menu";

@Injectable({
  providedIn: 'root'
})
export class RowMenuService {
  private clickedElement!: HTMLElement;
  private closestRow: HTMLTableRowElement | null = null;
  selectedTrack: Track = {} as Track
  menuTopLeftPosition =  { x: '0px', y: '0px' };
  matMenu : any
  openMenuOnLeftClick(event: MouseEvent, track: Track) {
    if(event.button === 0) { // left click, main
      this.updateMenu(event, track)
    }
  }
  openMenuOnRightClick(event: MouseEvent, track: Track) {
    // if(this.selectedTracks.size > 1 && event.button === 2) {
    //   console.log('multiple')
    // }
    if(event.button === 2) { // right click, secondary
      this.updateMenu(event, track)
      console.log(track)
    }
  }
  private updateMenu(event: MouseEvent, track: Track, contextMenuTrigger?: any) {
    this.clickedElement = event.target as HTMLElement
    this.closestRow = this.clickedElement.closest('.row')

    if(this.closestRow) {
      this.closestRow.style.background = 'var(--light-black)'
    }
    event.preventDefault()
    this.selectedTrack = track
    this.menuTopLeftPosition.x = event.clientX + 'px'
    this.menuTopLeftPosition.y = event.clientY + 'px'
    console.log(contextMenuTrigger)
    if (contextMenuTrigger) {
      console.log(contextMenuTrigger)
      this.matMenu?.openMenu()
    }
  }
  onMenuClosed(contextMenu: MatMenu) {
    if(this.closestRow && contextMenu.closed) {
      this.closestRow.style.background = ''
    }
  }
}
