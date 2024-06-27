import {inject, Injectable} from "@angular/core";
import {HttpEvent, HttpEventType, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {catchError, Observable, tap, throwError} from "rxjs";
import {Router} from "@angular/router";
import {QueueService} from "../queue/services/queue.service";
import {UserService} from "../user/services/user.service";
import {TokenService} from "../auth/services/token.service";
import {MatDialog} from "@angular/material/dialog";
import {SpinnerFunctions} from "../core/static-functions";

@Injectable()
export class UnauthorizedStatusCodeInterceptor implements HttpInterceptor {
  private _router = inject(Router)
  private _queueService = inject(QueueService)
  private _userService = inject(UserService)
  private _tokenService = inject(TokenService)
  private _matDialog = inject(MatDialog)
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      return next.handle(req).pipe(catchError(err => {
        if([401,403].includes(err.status)) {
          this.clearData()
          SpinnerFunctions.hideSpinner();
          this._router.navigateByUrl('/auth/login')
        }

        return throwError(() => err)
      }))
  }
  clearData() {
    this._queueService.clear()
    this._queueService.currentTrackInfo.set(null)
    this._tokenService.removeToken()
    this._userService.userLoaded.set(false)
    this._userService.setUserSubject(null)
    this._userService.unsetAllUserRelevantSubjects()
    this._matDialog.closeAll()
  }
}
