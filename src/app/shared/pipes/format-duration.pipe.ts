import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatDuration'
})
export class FormatDurationPipe implements PipeTransform {

  transform(originalSeconds: number, ...args: unknown[]): string {
    let seconds = originalSeconds
    console.log(seconds)
    const days: number = Math.floor(seconds / (24 * 3600));
    seconds %= 24 * 3600;
    const hours: number = Math.floor(seconds / 3600);
    seconds %= 3600;
    const minutes: number = Math.floor(seconds / 60);
    seconds %= 60;

    let formattedDuration = '';

    if (days > 0) {
      formattedDuration += `${days}d `;
    }

    if (hours > 0 || days > 0) {
      formattedDuration += `${hours}h `;
    }

    formattedDuration += `${minutes}m ${seconds}s`;

    return formattedDuration;
  }

}
