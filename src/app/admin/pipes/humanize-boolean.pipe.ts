import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'humanizeBoolean',
  standalone: true
})
export class HumanizeBooleanPipe implements PipeTransform {

  transform(value: boolean): string {
    return value ? 'Yes' : 'No'
  }

}
