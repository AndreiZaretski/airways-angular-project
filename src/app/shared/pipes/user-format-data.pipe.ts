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
      return 'y, d MMM, EE';
    }

    if (formatData === this.ymd) {
      return 'y MMM d, EE';
    }

    return 'EE, MMM d, y';
  }
}
