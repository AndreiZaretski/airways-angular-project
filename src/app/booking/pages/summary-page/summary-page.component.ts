import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  IBookingPage,
  IPassengersData,
  IPassengersCount,
} from 'src/app/shared/models/interface-user-booking';
import { selectUserBooking } from 'src/app/redux/selectors/state.selector';
import { IFlightInfo } from 'src/app/shared/models/interfaces';
import { checkCart, updateBookingPageToInitState } from 'src/app/redux/actions/state.actions';
import { Router } from '@angular/router';
import { Path } from 'src/app/shared/enums/router.enum';
import { StepperService } from 'src/app/core/services/stepper-service.service';

export interface ICurrentFlightSummary {
  from: string;
  to: string;
  startDate: string;
  index: number;
  flightData?: IFlightInfo;
}
@Component({
  selector: 'app-summary-page',
  templateUrl: './summary-page.component.html',
  styleUrls: ['./summary-page.component.scss'],
})
export class SummaryPageComponent implements OnInit {
  currentFlight: ICurrentFlightSummary[] = [];

  passengers: IPassengersData[] = [];

  passengersCountWithTypes$: IPassengersCount;

  bookingFlight$: IBookingPage;

  isPresentInFlightsHistory: boolean;

  previousRoute: string | undefined;

  isPreviousRouteFromPassengers: boolean;

  isPreviousRouteFromHistory: boolean;

  constructor(
    public stepper: StepperService,
    private location: Location,
    private store: Store,
    private router: Router,
  ) {
    this.store.select(selectUserBooking).subscribe((bookingData) => {
      if (bookingData.passengersCount) {
        this.bookingFlight$ = bookingData;
        this.passengersCountWithTypes$ = bookingData.passengersCount;
      }

      this.previousRoute = this.router
        .getCurrentNavigation()
        ?.previousNavigation?.finalUrl?.toString();
    });
  }

  ngOnInit() {
    this.isPreviousRouteFromPassengers = this.previousRoute === `/${Path.Booking}/${Path.Passengers}`;

    if (
      this.bookingFlight$.responseAir?.thereWay[
        this.bookingFlight$.indexThereWay
      ]
    ) {
      this.currentFlight = this.bookingFlight$.responseAir?.backWay?.length
        ? [
          {
            from: this.bookingFlight$.responseAir?.from,
            to: this.bookingFlight$.responseAir?.to,
            startDate: this.bookingFlight$.responseAir?.startDate,
            index: this.bookingFlight$.indexThereWay,
            flightData:
              this.bookingFlight$.responseAir?.thereWay[
                this.bookingFlight$.indexThereWay
              ],
          },
          {
            from: this.bookingFlight$.responseAir?.to,
            to: this.bookingFlight$.responseAir?.from,
            startDate: this.bookingFlight$.responseAir?.startDate,
            index: this.bookingFlight$.indexBackWay,
            flightData:
              this.bookingFlight$.responseAir?.backWay[
                this.bookingFlight$.indexBackWay
              ],
          },
        ]
        : [
          {
            from: this.bookingFlight$.responseAir?.from,
            to: this.bookingFlight$.responseAir?.to,
            startDate: this.bookingFlight$.responseAir?.startDate,
            index: this.bookingFlight$.indexThereWay,
            flightData:
              this.bookingFlight$.responseAir?.thereWay[
                this.bookingFlight$.indexThereWay
              ],
          },
        ];
    }

    if (this.bookingFlight$.userPassengers?.passengers) {
      this.passengers = this.bookingFlight$.userPassengers.passengers;
    }
  }

  addOrderToCart() {
    this.store.dispatch(checkCart());
    this.stepper.resetStepper();
    this.router.navigateByUrl(`/${Path.Main}`);
  }

  goToCart() {
    this.store.dispatch(checkCart());
    this.stepper.resetStepper();
    this.router.navigateByUrl(`/${Path.Cart}`);
  }

  backClicked() {
    this.stepper.previousStep();
    this.location.back();
  }

  backToAccount() {
    this.stepper.resetStepper();
    this.store.dispatch(updateBookingPageToInitState());
    this.router.navigateByUrl(`/${Path.Cart}/${Path.FlightsHistory}`);
  }
}
