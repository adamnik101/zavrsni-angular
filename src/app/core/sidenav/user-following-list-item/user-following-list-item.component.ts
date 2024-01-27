import {Component, Input} from '@angular/core';
import {Artist} from "../../../artists/interfaces/artist";
import {RouterLink, RouterLinkActive} from "@angular/router";

@Component({
  selector: 'app-user-following-list-item',
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './user-following-list-item.component.html',
  styleUrl: './user-following-list-item.component.scss'
})
export class UserFollowingListItemComponent {

  @Input('artist') artist : Artist = {} as Artist
}
