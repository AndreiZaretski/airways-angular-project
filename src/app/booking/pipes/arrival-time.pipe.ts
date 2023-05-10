import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'arrivalTime',
})
export class ArrivalTimePipe implements PipeTransform {
  transform(departureTime: string, durationMin: number): string {
    const [departureHours, departureMinutes] = departureTime.split(':');
    const totalMinutes = +departureHours * 60 + +departureMinutes + durationMin;
    const hours = Math.round(totalMinutes / 60).toString();
    const minutes = (totalMinutes % 60).toString();
    return `${hours.padStart(2, '0')}:${minutes.padStart(2, '0')}`;
    // eslint-disable-next-line no-nested-ternary
    // return hours ? (minutes ? `${hours} h ${minutes} min` : `${hours} h`) : `${minutes} min`;
  }
}
