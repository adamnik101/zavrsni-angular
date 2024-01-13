import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'duration',
  standalone: true,
})
export class DurationPipe implements PipeTransform {
  transform(value: number, ...args: [isTable?:boolean]): string {
    if(args[0]) {
      const seconds: number = value;
      return calculate(seconds)
    } else {
      const seconds: number = Math.floor(value / 1000);
      return calculate(seconds)
    }
    function calculate(seconds: number) {
      const minutes: number = Math.floor(seconds / 60);
      const remainingSeconds: number = seconds % 60;
      const formattedMinutes: string =
        minutes < 10 ? '0' + minutes : String(minutes);
      const formattedSeconds: string =
        remainingSeconds < 10 ? '0' + remainingSeconds : String(remainingSeconds);

      return `${formattedMinutes}:${formattedSeconds}`;
    }

  }
}
