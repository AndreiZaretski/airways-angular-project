import { Location } from '@angular/common';
import { Component, OnChanges, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import {
  IBookingPage,
  IPassengersData,
  IUserPassengers,
  IPassengersCount,
} from 'src/app/shared/models/interface-user-booking';
import { selectUserBooking } from 'src/app/redux/selectors/state.selector';
import { IFlightInfo } from 'src/app/shared/models/interfaces';
import { addOrderCart } from 'src/app/redux/actions/state.actions';
import { Router } from '@angular/router';
import { Path } from 'src/app/shared/enums/router.enum';
import { filter, pairwise } from 'rxjs';
import { RoutesRecognized } from '@angular/router';
import { StepperService } from 'src/app/core/services/stepper-service.service';

export interface ICurrentFlightSummary {
  from: string;
  to: string;
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

  previousUrl: string = '';

  isFromFlightsHistory: boolean = false;

  constructor(
    public stepper: StepperService,
    private location: Location,
    private store: Store,
    private router: Router,
  ) {
    this.store.pipe(select(selectUserBooking)).subscribe((bookingData) => {
      if (bookingData.passengersCount)
        this.passengersCountWithTypes$ = bookingData.passengersCount;
      this.bookingFlight$ = bookingData;
    });
  }

  ngOnInit() {
    // this.isPreviousUrlFromFlightsHistory();

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
              flightData:
                this.bookingFlight$.responseAir?.thereWay[
                  this.bookingFlight$.indexThereWay
                ],
            },
            {
              from: this.bookingFlight$.responseAir?.to,
              to: this.bookingFlight$.responseAir?.from,
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
              flightData:
                this.bookingFlight$.responseAir?.thereWay[
                  this.bookingFlight$.indexThereWay
                ],
            },
          ];
    }

    // if (this.bookingFlight$.userPassengers) {
    //   const passengersArray: IPassengersData[] = Object.values(
    //     this.bookingFlight$.userPassengers
    //   ).reduce((acc, rec) => {
    //     if (Array.isArray(rec)) {
    //       return [...acc, ...rec];
    //     }
    //     return acc;
    //   }, []);
    //   this.passengers = [...passengersArray];
    // }
    if (this.bookingFlight$.userPassengers?.passengers) {
      this.passengers = this.bookingFlight$.userPassengers.passengers;
    }
  }

  addOrderToCard(id: string | null) {
    if (id) {
      this.store.dispatch(addOrderCart({ newOrderId: id }));
    }
    this.stepper.resetStepper();
    this.router.navigateByUrl(`/${Path.Main}`);
  }

  goToCart() {
    this.stepper.resetStepper();
    this.router.navigateByUrl(`/${Path.Cart}`);
  }

  backClicked() {
    this.stepper.previousStep();
    this.location.back();
  }

  backToAccount() {
    this.router.navigateByUrl(`/${Path.Cart}/${Path.FlightsHistory}`);
  }

  // isPreviousUrlFromFlightsHistory() {
  //   this.router.events
  //     .pipe(
  //       filter((evt: any) => evt instanceof RoutesRecognized),
  //       pairwise()
  //     )
  //     .subscribe((events: RoutesRecognized[]) => {
  //       this.previousUrl = events[0].urlAfterRedirects;
  //       this.isFromFlightsHistory = this.previousUrl.includes(
  //         '/cart/flights-history'
  //       )
  //       console.log('isFromFlightsHistory', this.isFromFlightsHistory);
  //     });
  // }
}
