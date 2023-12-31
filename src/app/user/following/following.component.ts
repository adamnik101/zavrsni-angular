import {Component, Input} from '@angular/core';
import {Artist} from "../../artists/interfaces/artist";

@Component({
  selector: 'app-following',
  templateUrl: './following.component.html',
  styleUrls: ['./following.component.scss']
})
export class FollowingComponent {
  @Input('following') following: Artist[] = []

  openContextMenu(event: MouseEvent) {
    if(event.button === 2) { // right click, secondary
      console.log('asdasda')
    }
  }
}
