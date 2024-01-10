import { Pipe, PipeTransform } from '@angular/core';
import {Artist} from "../../artists/interfaces/artist";

@Pipe({
  name: 'isSelectedInFeatures',
  standalone: true
})
export class IsSelectedInFeaturesPipe implements PipeTransform {

  transform(value: Artist, features: Artist[] | null): boolean {
    if(features !== null) {
      return features.some(feature => feature.id === value.id);
    }
    return false
  }

}
