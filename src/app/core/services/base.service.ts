import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {ConfigService} from "../../config/config.service";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class BaseService {
  protected baseUrl = ''
  constructor(private _http: HttpClient, private _configService: ConfigService)
  {
    this.baseUrl = _configService.getBaseApiUrl()
  }

  protected get<T>(endpoint: string, options?: {headers?: HttpHeaders, params?: HttpParams}) : Observable<T> {
    return this._http.get<T>(this.baseUrl + endpoint, options);
  }
  protected post<TRequest, TResponse>(endpoint: string, data: TRequest, options? : {headers: HttpHeaders}) {
    return this._http.post<TResponse>(this.baseUrl + endpoint, data, options)
  }
  protected put<TRequest, TResponse>(endpoint: string, data: TRequest, options?: {headers: HttpHeaders}) {
    return this._http.put<TResponse>(this.baseUrl + endpoint, data, options)
  }
  protected delete<T>(endpoint: string, options? : {headers: HttpHeaders}) {
    return this._http.delete<T>(this.baseUrl + endpoint, options)
  }
}
