import {Injectable, signal} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  public show = signal<boolean>(false)
  private requestCount = 0
  constructor() { }

  showLoader() {
    this.requestCount++
    this.show.set(true)
  }

  hideLoader() {
    this.requestCount--;
    if (this.requestCount <= 0) {
      this.show.set(false)
    }
  }
}
