import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DragDropService {
  dragging: boolean = false
  constructor() { }
}
