import {ElementRef, inject, Injectable, Renderer2, RendererFactory2, signal} from '@angular/core';
import {MatCheckboxChange} from "@angular/material/checkbox";

@Injectable({
  providedIn: 'root'
})
export class SelectionService {
  selectedItems = signal<string[]>([])
  private _renderer2!: Renderer2
  constructor(rendererFactory: RendererFactory2) {
    this._renderer2 = rendererFactory.createRenderer(null, null)
  }
  onSingleSelectChange(event: MatCheckboxChange, item: string, element: ElementRef) {
    if(event.checked) {
      this.pushToSelected(item)
      return
    }
    this.selectedItems.update(items => {
      for(let i = 0; i < items.length; i++) {
        if(items[i] === item) {
          this._renderer2.setProperty(element, 'checked', false)
          items.splice(i, 1)
        }
      }
      return items
    })
  }

  onAllSelectChange(event: MatCheckboxChange, data: any[]) {
    if(event.checked) {
      for(let item of data) {
        this.pushToSelected(item.id)
      }
      return
    }
    this.removeFromSelected(data)
  }

  pushToSelected(item: string) {
    this.selectedItems.update(items => {
      if(!items.includes(item)) {
        items.push(item)
      }
      return items
    })
  }
  removeFromSelected(data: any[]) {
    console.log(data)

    this.selectedItems.update(items => {
      console.log(items)
      console.log(data)
      for (let dataItem of data){
        for(let item of items) {
          if(item === dataItem.id) {
            let indexOf = items.indexOf(item)
            items.splice(indexOf, 1)
            console.log(dataItem.title)
          }
        }
      }
      return items
    })
  }

  removeAll() {
    this.selectedItems.set([])
  }
}
