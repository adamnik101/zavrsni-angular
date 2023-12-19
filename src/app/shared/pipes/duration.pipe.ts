import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'duration',
  standalone: true,
})
export class DurationPipe implements PipeTransform {
  transform(value: number, ...args: unknown[]): unknown {
    const seconds: number = Math.floor(value / 1000);
    const minutes: number = Math.floor(seconds / 60);
    const remainingSeconds: number = seconds % 60;

    const formattedMinutes: string =
      minutes < 10 ? '0' + minutes : String(minutes);
    const formattedSeconds: string =
      remainingSeconds < 10 ? '0' + remainingSeconds : String(remainingSeconds);

    return `${formattedMinutes}:${formattedSeconds}`;
  }
}
