import {inject, Injectable} from "@angular/core";
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {catchError, Observable, throwError} from "rxjs";
import {Router} from "@angular/router";

@Injectable()
export class ServerErrorInterceptor implements HttpInterceptor {
    private _router = inject(Router)
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      return next.handle(req)
        .pipe(catchError(err => {
        console.log(err.status)
        if([500].includes(err.status)) {
          this._router.navigateByUrl('/error')
        }

        return throwError(() => err)
      }))
    }

}
