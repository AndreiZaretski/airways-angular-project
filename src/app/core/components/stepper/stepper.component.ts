/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  AfterViewInit, Component, OnInit, ViewChild,
} from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { MatStepper } from '@angular/material/stepper';
import { FormBuilder } from '@angular/forms';
import { STEPPER_GLOBAL_OPTIONS, StepperOrientation } from '@angular/cdk/stepper';
import { BreakpointObserver } from '@angular/cdk/layout';
import { Observable, map } from 'rxjs';
import { StepperService } from '../../services/stepper-service.service';

@Component({
  selector: 'app-stepper',
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.scss'],
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: { displayDefaultIndicatorType: false },
    },
  ],
})
export class StepperComponent implements OnInit, AfterViewInit {
  @ViewChild('stepper') stepper: MatStepper;

  stepperOrientation$: Observable<StepperOrientation>;

  constructor(
    private router: Router,
    private stepperService: StepperService,
    private formBuilder: FormBuilder,
    breakpointObserver: BreakpointObserver,
  ) {
    this.stepperOrientation$ = breakpointObserver
      .observe('(min-width: 500px)')
      .pipe(map(({ matches }) => (matches ? 'horizontal' : 'vertical')));
  }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.stepperService.init(this.stepper);
  }
}
