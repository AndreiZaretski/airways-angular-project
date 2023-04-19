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

import { MatStepperModule } from '@angular/material/stepper';

import { MatTabsModule } from '@angular/material/tabs';

import { MatBadgeModule } from '@angular/material/badge';

import { MatSelectModule } from '@angular/material/select';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
  ],
  exports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatStepperModule,
    MatTabsModule,
    MatBadgeModule,
    MatSelectModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    FormsModule,
    MatInputModule,
    MatMenuModule,

  ],
})
export class SharedModule { }
