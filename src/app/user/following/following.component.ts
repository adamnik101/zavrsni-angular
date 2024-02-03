import {Component, Input} from '@angular/core';
import {Artist} from "../../artists/interfaces/artist";
import {UserService} from "../services/user.service";

@Component({
  selector: 'app-following',
  templateUrl: './following.component.html',
  styleUrls: ['./following.component.scss']
})
export class FollowingComponent {
  following : Artist[] = []

  constructor(private _userService: UserService) { }
  ngOnInit() {
    this._userService.following$.subscribe({
      next: (artists) => {
        this.following = artists
      }
    })
  }
  openContextMenu(event: MouseEvent) {
    if(event.button === 2) { // right click, secondary
      console.log('asdasda')
    }
  }
}
