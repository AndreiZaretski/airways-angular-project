/* eslint-disable default-case */
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectUserSettingsDateFormat } from 'src/app/redux/selectors/state.selector';
import { DateFormat } from 'src/app/shared/enums/date.enum';

@Injectable()

export class MyFormat {
  value: DateFormat;

  constructor(
    private store: Store,
  ) {
    this.store
      .select(selectUserSettingsDateFormat)
    // eslint-disable-next-line @ngrx/no-store-subscription
      .subscribe((format) => {
        this.value = format;
      });
  }

  // eslint-disable-next-line consistent-return
  get display() {
    switch (this.value) {
      case DateFormat.MDY:
        return {
          dateInput: 'MM/DD/YYYY',
          monthYearLabel: 'MMM YYYY',
          dateA11yLabel: 'MM/DD/YYYY',
          monthYearA11yLabel: 'MMMM YYYY',
        };
      case DateFormat.DMY:
        return {
          dateInput: 'DD/MM/YYYY',
          monthYearLabel: 'MMM YYYY',
          dateA11yLabel: 'DD/MM/YYYY',
          monthYearA11yLabel: 'MMMM YYYY',
        };
      case DateFormat.YDM:
        return {
          dateInput: 'YYYY/DD/MM',
          monthYearLabel: 'YYYY MMM',
          dateA11yLabel: 'YYYY/DD/MM',
          monthYearA11yLabel: 'YYYY MMMM',
        };
      case DateFormat.YMD:
        return {
          dateInput: 'YYYY/MM/DD',
          monthYearLabel: 'YYYY MMM',
          dateA11yLabel: 'YYYY/MM/DD',
          monthYearA11yLabel: 'YYYY MMMM',
        };
    }
  }

  // eslint-disable-next-line consistent-return
  get parse() {
    switch (this.value) {
      case DateFormat.MDY:
        return { dateInput: 'MM/DD/YYYY' };
      case DateFormat.DMY:
        return { dateInput: 'DD/MM/YYYY' };
      case DateFormat.YDM:
        return { dateInput: 'YYYY/DD/MM' };
      case DateFormat.YMD:
        return { dateInput: 'YYYY/MM/DD' };
    }
  }
}
