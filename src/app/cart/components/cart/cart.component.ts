import { Component, OnInit } from '@angular/core';
import { Path } from 'src/app/shared/enums/router.enum';
import { IBookingPage } from 'src/app/shared/models/interface-user-booking';
import { Store } from '@ngrx/store';
import { addToFlightsHistory, deleteOrderCart } from 'src/app/redux/actions/state.actions';
import { ResultFlightSumService } from 'src/app/core/services/result-flight-sum.service';
import { selectUserSettings } from 'src/app/redux/selectors/state.selector';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  selectedFlights: IBookingPage[] = [];

  path = Path;

  userCurrency: string;

  userSettings$ = this.store.select(selectUserSettings);

  private subscriptionUserSettings: Subscription;

  constructor(
    private store: Store,
    private resultFlightSumService: ResultFlightSumService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.subscriptionUserSettings = this.userSettings$.subscribe(
      (res) => (this.userCurrency = res.currency),
    );
  }

  getTotalCost() {
    return this.selectedFlights
      .map((flight) => this.resultFlightSumService
        .calculateTotalSum(flight, this.userCurrency.toLowerCase()))
      .reduce((acc, value) => acc + value, 0);
  }

  getSelectedFlights(flights: IBookingPage[]) {
    this.selectedFlights = [...flights];
  }

  payForOrder() {
    if (this.selectedFlights.length) {
      this.store.dispatch(
        addToFlightsHistory({ newBoughtFlights: this.selectedFlights }),
      );
      this.selectedFlights
        .map((flight) => flight.orderId && this.store
          .dispatch(deleteOrderCart({ OrderId: flight.orderId })));
    }
  }

}
