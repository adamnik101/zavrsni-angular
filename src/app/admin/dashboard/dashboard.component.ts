import {Component, ElementRef, inject, ViewChild} from '@angular/core';
import {AdminService} from "../services/admin.service";
import {Chart, LineController, registerables} from "chart.js/auto";
import {ChartService} from "../services/chart.service";
import {UserService} from "../../user/services/user.service";
import {User} from "../../user/interfaces/user";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  private _adminService = inject(AdminService);
  private _chartService = inject(ChartService);
  private _userService = inject(UserService)
  tracksCount: number = 0
  albumsCount: number = 0
  artistsCount: number = 0
  userCount: number = 0
  playlistCount: number = 0
  averageNumberOfPlaylistsPerUser: number = 0
  averageNumberOfTracksPerPlaylist: number = 0
  newUsers: number = 0
  @ViewChild('canvas') canvas!: ElementRef
  progress1: number = 0
  chart1: any
  pieChart: any;
  user: User = {} as User;
  ngOnInit() {

    this._adminService.dashboard().subscribe({
      next: (response: any) => {
        console.log(response)
        this.albumsCount = response.totalAlbums
        this.artistsCount = response.totalArtists
        this.tracksCount = response.totalTracks
        this.progress1 = response.percentageOfActiveUsers
        this.userCount = response.totalUsers
        this.playlistCount = response.totalPlaylists
        this.averageNumberOfPlaylistsPerUser = response.average
        this.averageNumberOfTracksPerPlaylist = response.averageNofTrackPerPlaylist
        this.newUsers = response.newUsers
        this._chartService
          .createLineChart(
            'MyChart_1',
            response.percentageOfActiveUsersInLast7Days[0],
            [response.percentageOfActiveUsersInLast7Days[1],
                  response.createdPlaylists[1]]);

        this.chart1 = this._chartService.chart1

        this._chartService.createPieChart('barChart', response.popularGenres[0], response.popularGenres[1], response.popularGenres[2])
        this._userService.user$.subscribe({
          next: (user) => {
            this.user = user
          }
        })
        //this.createLineChart(response.percentageOfActiveUsersInLast7Days[0], response.percentageOfActiveUsersInLast7Days[1], response.createdPlaylists[1])
      }
    })
  }
}
