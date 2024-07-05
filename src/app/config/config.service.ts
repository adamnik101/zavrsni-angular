import { Injectable } from '@angular/core';
import {environment} from "../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  getBaseApiUrl() : string {
    return environment.production.apiBaseUrl;
  }
}
