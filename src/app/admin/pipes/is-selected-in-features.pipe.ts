import { Pipe, PipeTransform } from '@angular/core';
import {Artist} from "../../artists/interfaces/artist";

@Pipe({
  name: 'isSelectedInFeatures',
  standalone: true
})
export class IsSelectedInFeaturesPipe implements PipeTransform {

  transform(value: Artist, features: Artist[]): boolean {
    return features.some(feature => feature.id === value.id);
  }

}
