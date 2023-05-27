import { Pipe, PipeTransform } from '@angular/core';
import { DateFormat } from '../enums/date.enum';

@Pipe({
  name: 'userFormatData',
})
export class UserFormatDataPipe implements PipeTransform {
  mdy = DateFormat.MDY;

  dmy = DateFormat.DMY;

  ydm = DateFormat.YDM;

  ymd = DateFormat.YMD;

  transform(formatData: DateFormat | null): string {
    if (formatData === null) {
      return 'EE, d MMM y';
    }

    if (formatData === this.mdy) {
      return 'EE, MMM d, y';
    }

    if (formatData === this.dmy) {
      return 'EE, d MMM y';
    }

    if (formatData === this.ydm) {
      return 'EE, y d MMM';
    }

    if (formatData === this.ymd) {
      return 'EE, y MMM d';
    }

    return 'EE, MMM d, y';
  }
}
