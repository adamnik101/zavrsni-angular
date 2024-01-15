import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'nameColumn',
  standalone: true
})
export class NameColumnPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
