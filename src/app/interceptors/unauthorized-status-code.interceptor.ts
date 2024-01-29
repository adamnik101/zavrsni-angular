import {inject, Injectable} from "@angular/core";
import {HttpEvent, HttpEventType, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {catchError, Observable, tap, throwError} from "rxjs";
import {Router} from "@angular/router";

@Injectable()
export class UnauthorizedStatusCodeInterceptor implements HttpInterceptor {
  private _router = inject(Router)
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      return next.handle(req).pipe(catchError(err => {
        if([401,403].includes(err.status)) {
          this._router.navigateByUrl('/auth/login')
        }

        return throwError(() => err)
      }))
    }
}
