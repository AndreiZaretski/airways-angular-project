import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'convertDuration',
})
export class ConvertDurationPipe implements PipeTransform {
  transform(durationMin: number): string {
    const hours = Math.round(durationMin / 60);
    const minutes = durationMin % 60;
    // eslint-disable-next-line no-nested-ternary
    return hours ? (minutes ? `${hours} h ${minutes} min` : `${hours} h`) : `${minutes} min`;
  }
}
