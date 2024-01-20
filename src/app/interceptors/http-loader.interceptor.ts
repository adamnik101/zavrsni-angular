import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpHeaders, HttpResponse
} from '@angular/common/http';
import {finalize, Observable} from 'rxjs';
import {TokenService} from "../auth/services/token.service";
import {AuthService} from "../auth/services/auth.service";
import {LoaderService} from "../core/services/loader.service";

@Injectable()
export class HttpLoaderInterceptor implements HttpInterceptor {

  constructor(private _loaderService: LoaderService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if(request.url.includes('/api/tracks/') || request.method !== "GET") {
      return next.handle(request)
    }

    this._loaderService.showLoader()

    return next.handle(request).pipe(
      finalize(() => {
        this._loaderService.hideLoader()
      })
    )
  }
}
