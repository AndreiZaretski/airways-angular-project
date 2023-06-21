import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import {
  FormsModule, ReactiveFormsModule,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCheckboxModule } from '@angular/material/checkbox';

import { MatDatepickerModule } from '@angular/material/datepicker';
import {
  DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE, MatNativeDateModule,
} from '@angular/material/core';

import { MatStepperModule } from '@angular/material/stepper';

import { MatTabsModule } from '@angular/material/tabs';

import { MatBadgeModule } from '@angular/material/badge';

import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatDialogModule } from '@angular/material/dialog';

import { MatChipsModule } from '@angular/material/chips';

import { MatButtonToggleModule } from '@angular/material/button-toggle';

import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatDividerModule } from '@angular/material/divider';
import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AirportNamePipe } from './pipes/airport-name.pipe';
import { FormComponent } from './components/form/form.component';
import { DropdownComponent } from './components/dropdown/dropdown.component';
import { NextDayArrivalPipe } from './pipes/next-day-arrival.pipe';
import { ArrivalTimePipe } from './pipes/arrival-time.pipe';
import { SequenceDatePipe } from './pipes/sequence-date.pipe';
import { MyFormat } from './services/format-date';
import { UserFormatDataPipe } from './pipes/user-format-data.pipe';

const materialModules = [
  MatAutocompleteModule,
  MatBadgeModule,
  MatButtonModule,
  MatCardModule,
  MatCheckboxModule,
  MatDatepickerModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatMenuModule,
  MatNativeDateModule,
  MatRadioModule,
  MatSelectModule,
  MatStepperModule,
  MatTabsModule,
  MatTableModule,
  MatSortModule,
  MatDividerModule,
  MatDialogModule,
  MatChipsModule,
  MatButtonToggleModule,
  MatSlideToggleModule,
  MatTooltipModule,
  MatProgressSpinnerModule,
];

@NgModule({
  declarations: [
    AirportNamePipe,
    FormComponent,
    DropdownComponent,
    NextDayArrivalPipe,
    ArrivalTimePipe,
    SequenceDatePipe,
    UserFormatDataPipe,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ...materialModules,
  ],
  exports: [
    ...materialModules,
    ReactiveFormsModule,
    FormsModule,
    AirportNamePipe,
    FormComponent,
    DropdownComponent,
    NextDayArrivalPipe,
    ArrivalTimePipe,
    SequenceDatePipe,
    UserFormatDataPipe,
  ],
  providers: [
    {
      provide: MAT_DATE_FORMATS, useClass: MyFormat,
    },
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
    },
  // { provide: MAT_MOMENT_DATE_ADAPTER_OPTIONS, useValue: { strict: true } },
  ],
})
export class SharedModule { }
