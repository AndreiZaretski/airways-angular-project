import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'nextDayArrival',
})
export class NextDayArrivalPipe implements PipeTransform {
  transform(
    flightDate: string,
    startTime: string | undefined,
    durationMin: number | undefined,
  ): string {
    const date = new Date(flightDate);
    if (startTime) {
      date.setHours(+startTime.slice(0, 2), +startTime.slice(3));
    }
    let newDate = new Date(+date);
    if (durationMin) {
      newDate = new Date(+date + durationMin * 60 * 1000);
    }

    return newDate.toString();
  }
}
