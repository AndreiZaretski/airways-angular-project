import {
  Component,
  DoCheck,
  Input,
  OnInit,
} from '@angular/core';
import {
  IPassengersCount,
} from 'src/app/shared/models/interface-user-booking';
import { ResultFlightSumService } from 'src/app/core/services/result-flight-sum.service';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectUserSettings } from 'src/app/redux/selectors/state.selector';
import { ICurrentFlightSummary } from '../../pages/summary-page/summary-page.component';

@Component({
  selector: 'app-total-sum',
  templateUrl: './total-sum.component.html',
  styleUrls: ['./total-sum.component.scss'],
})
export class TotalSumComponent implements OnInit, DoCheck {
  @Input() currentFlight: ICurrentFlightSummary[] = [];

  @Input() passengersCountWithTypes: IPassengersCount = {
    adult: 0,
    child: 0,
    infant: 0,
  };

  fareThere: number;

  fareBack: number;

  typesOfPassengers = Object.keys(this.passengersCountWithTypes);

  userCurrency: string;

  userSettings$ = this.store.select(selectUserSettings);

  private subscriptionUserSettings: Subscription;

  constructor(
    private resultFlightSumService: ResultFlightSumService,
    private store: Store,
  ) {}

  ngOnInit() {
    this.subscriptionUserSettings = this.userSettings$.subscribe(
      (res) => (this.userCurrency = res.currency),
    );
  }

  ngDoCheck() {
    if (this.currentFlight[0]?.flightData?.price) {
      this.fareThere = this.currentFlight[0]?.flightData?.price[this.userCurrency.toLowerCase()];
    }
    if (this.currentFlight[1]?.flightData?.price) {
      this.fareBack = this.currentFlight[1]?.flightData?.price[this.userCurrency.toLowerCase()];
    }
  }

  calculateTotal() {
    return Object.keys(this.passengersCountWithTypes).reduce(
      (acc, rec) => acc + this.passengersCountWithTypes[rec] * this.resultFlightSumService
        .calculateFareByType(
          rec,
          this.fareThere,
          this.fareBack,
        ),
      0,
    );
  }

  calculateFare(type: string) {
    return this.resultFlightSumService.calculateFareByType(
      type,
      this.fareThere,
      this.fareBack,
    );
  }
}
