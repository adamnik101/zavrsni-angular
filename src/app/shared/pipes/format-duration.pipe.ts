import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatDuration'
})
export class FormatDurationPipe implements PipeTransform {

  transform(ms: number, ...args: unknown[]): string {
    const seconds: number = Math.floor(ms / 1000);
    const minutes: number = Math.floor(seconds / 60);
    const hours: number = Math.floor(minutes / 60);
    const days: number = Math.floor(hours / 24);

    // Extract the whole number part
    const daysWhole: number = days;
    const hoursWhole: number = hours % 24;
    const minutesWhole: number = minutes % 60;
    const secondsWhole: number = seconds % 60;
    // Format the duration string
    const formattedDuration = [
      daysWhole > 0 ? `${daysWhole}d` : '',
      hoursWhole > 0 ? `${hoursWhole}h` : '',
      minutesWhole > 0 ? `${minutesWhole}m` : '',
      secondsWhole > 0 ? `${secondsWhole}s` : '',
    ].filter(Boolean).join(' ');

    return formattedDuration;
  }

}
