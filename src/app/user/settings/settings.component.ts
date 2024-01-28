import {ChangeDetectorRef, Component, inject} from '@angular/core';
import {Settings} from "../../settings/interfaces/settings";
import {User} from "../interfaces/user";
import {UserService} from "../services/user.service";
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent {
  loading: boolean = true
  settings: Settings = {} as Settings
  user: User = {} as User
  public userService = inject(UserService)
  private _titleService = inject(Title)
  private _cdr = inject(ChangeDetectorRef)
  ngOnInit() {
    this._titleService.setTitle('My Settings - TREBLE')
    this.userService.user$.subscribe({
      next: (user) => {
        this.user = user
      }
    })
    this.userService.settings$.subscribe({
      next: (settings) => {
       this.settings = settings
        this.loading = false
        this._cdr.markForCheck()
      }
    })
  }

  update(value: any, setting: string) {
    this.userService.updateSettings(value, setting).subscribe({
      next: (response: Settings) => {
        console.log(response)
        this.userService.settings.set(response)
        this.userService.updateUserSettings(response)
      }
    })
    console.log(value)
  }
}
