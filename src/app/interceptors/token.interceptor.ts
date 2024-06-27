import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpHeaders, HttpResponse
} from '@angular/common/http';
import { Observable } from 'rxjs';
import {TokenService} from "../auth/services/token.service";
import {AuthService} from "../auth/services/auth.service";

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private _tokenService: TokenService, private _authService: AuthService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = this._tokenService.getToken()

    if(token) {
      const newRequest = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      })
      return next.handle(newRequest)
    }
    return next.handle(request);
  }
}
