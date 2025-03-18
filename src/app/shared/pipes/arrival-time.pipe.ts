import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'arrivalTime',
})
export class ArrivalTimePipe implements PipeTransform {
  transform(departureTime: string, durationMin: number): string {
    const [departureHours, departureMinutes] = departureTime.split(':');
    const totalMinutes = +departureHours * 60 + +departureMinutes + durationMin;
    let hours = Math.floor(totalMinutes / 60);
    if (hours >= 24) {
      hours -= 24;
    }
    const minutes = (totalMinutes % 60).toString();
    return `${hours.toString().padStart(2, '0')}:${minutes.padStart(2, '0')}`;
  }
}
