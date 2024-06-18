import {inject, Injectable, signal} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {ConfigService} from "../../config/config.service";
import {LoginRequest} from "../interfaces/login-request";
import {RegisterData} from "../interfaces/register-data";
import {BaseService} from "../../core/services/base.service";
import {LoginResponse} from "../interfaces/login-response";
import {BehaviorSubject, forkJoin, map, mergeMap, Observable, tap} from "rxjs";
import {User} from "../../user/interfaces/user";
import {Router} from "@angular/router";
import {UserService} from "../../user/services/user.service";
import {ResponseAPI} from "../../shared/interfaces/response-api";
import {PlaylistService} from "../../playlists/services/playlist.service";
import {TokenService} from "./token.service";
import {Playlist} from "../../playlists/interfaces/playlist";
import {SpinnerFunctions} from "../../core/static-functions";

@Injectable({
  providedIn: 'root'
})
export class AuthService extends BaseService{

  constructor(
    protected http: HttpClient,
    protected configService: ConfigService,
    private playlistService: PlaylistService,
    private tokenService: TokenService,
    private userService: UserService,
    private _router: Router

  ) {
    super(http, configService);
  }

  public isLoggedIn = false

  register(data: RegisterData)  {
    return this.post('auth/register', data)
  }

  getDataFromAllRequests(loginData: LoginRequest): Observable<any> {
    return this.login(loginData).pipe(
      tap((loginResponse: ResponseAPI<LoginResponse>) => {
        this.userService.userLoaded.set(true);
        this.userService.user.set(loginResponse.data.user);
        let user = this.userService.user();
        if(user?.role.name === 'end-user') {
          this._router.navigate(['user/profile']).then(() => {
            SpinnerFunctions.hideSpinner();
          })
        } else if(user?.role.name === 'admin') {
          this._router.navigate(['admin/dashboard']).then(() => {
            SpinnerFunctions.hideSpinner();
          })
        }
      }),
      mergeMap((loginResponse: ResponseAPI<LoginResponse>) => {
        return this.getUserPlaylists().pipe(
          map((playlists: Playlist[]) => ({
            loginResponse,
            playlists,
          }))
        );
      })
    );
  }

  getUserPlaylists(): Observable<any> {
    return this.playlistService.getPlaylists().pipe(
      tap((response: ResponseAPI<Playlist[]>) => {
        if(response) {
          this.playlistService.playlists.set(response.data);
          SpinnerFunctions.hideSpinner();
        }
      })
    );
  }

  login(data: LoginRequest) : Observable<ResponseAPI<LoginResponse>> {
    return this.post<LoginRequest, ResponseAPI<LoginResponse>>('auth/login', data ).pipe(
      tap((loginResponse: ResponseAPI<LoginResponse>) => {
        if(loginResponse) {
          this.tokenService.setToken(loginResponse.data.token);
        }
      })
    );
  }

  logout() {
    return this.delete('auth/token')
  }
}
