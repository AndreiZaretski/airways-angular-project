import {
  AfterViewInit, Component, OnDestroy, OnInit, ViewChild,
} from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { MatStepper } from '@angular/material/stepper';
import { FormBuilder } from '@angular/forms';
import { STEPPER_GLOBAL_OPTIONS, StepperOrientation } from '@angular/cdk/stepper';
import { BreakpointObserver } from '@angular/cdk/layout';
import {
  Observable, Subscription, filter, map,
} from 'rxjs';
import { Path } from 'src/app/shared/enums/router.enum';
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
export class StepperComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('stepper') stepper: MatStepper;

  stepperOrientation$: Observable<StepperOrientation>;

  private subscription: Subscription;

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

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  ngOnInit(): void {
    // this.subscribeToRouterEvents();
  }

  ngAfterViewInit() {
    this.stepperService.init(this.stepper);
  }

  private setStepProperties(currentRoute: string, stepIndex: number) {
    const step = this.stepper.steps.get(stepIndex);
    if (step) {
      switch (currentRoute) {
        case `/${Path.Booking}/${Path.Flights}`:
          step.completed = false;
          step.editable = stepIndex === 0;
          break;
        case `/${Path.Booking}/${Path.Passengers}`:
          step.completed = stepIndex < 1;
          step.editable = stepIndex === 1;
          break;
        case `/${Path.Booking}/${Path.Summary}`:
          step.completed = stepIndex <= 1;
          step.editable = stepIndex === 2;
          break;
        default:
          step.completed = false;
          step.editable = false;
      }
    }
  }

  private handleRouterEvents(event: NavigationEnd) {
    const currentRoute = event.urlAfterRedirects;
    switch (currentRoute) {
      case `/${Path.Booking}/${Path.Flights}`:
        this.stepper.selectedIndex = 0;
        break;
      case `/${Path.Booking}/${Path.Passengers}`:
        this.stepper.selectedIndex = 1;
        break;
      case `/${Path.Booking}/${Path.Summary}`:
        this.stepper.selectedIndex = 2;
        break;
      default:
        this.stepper.selectedIndex = 0;
    }

    this.stepper.steps.forEach((step, index) => {
      this.setStepProperties(currentRoute, index);
    });
  }

  private subscribeToRouterEvents() {
    this.subscription = this.router.events.pipe(
      filter((event) => event instanceof NavigationEnd),
    ).subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.handleRouterEvents(event);
      }
    });
  }
}
