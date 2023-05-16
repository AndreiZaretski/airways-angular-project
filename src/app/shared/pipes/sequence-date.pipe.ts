import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sequenceDate',
})
export class SequenceDatePipe implements PipeTransform {
  transform(flightDate: string, index: number) {
    const dayInMs = 24 * 60 * 60 * 1000;
    const date = new Date(+new Date(flightDate) + dayInMs * (index - 3));

    return date;
  }
}
