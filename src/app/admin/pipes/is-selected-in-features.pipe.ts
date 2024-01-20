import { Pipe, PipeTransform } from '@angular/core';
import {Artist} from "../../artists/interfaces/artist";

@Pipe({
  name: 'isSelectedInFeatures',
  standalone: true
})
export class IsSelectedInFeaturesPipe implements PipeTransform {

  transform(value: Artist, features: string[] | null): boolean {
    if(features !== null) {
      return features.some(feature => feature === value.id);
    }
    return false
  }

}
