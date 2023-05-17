import { Component } from '@angular/core';
import { Path } from 'src/app/shared/enums/router.enum';
import { PeriodicElement } from '../table/table.component';
import { IBookingPage } from 'src/app/shared/models/interface-user-booking';
import { Store } from '@ngrx/store';
import { addToFlightsHistory, deleteOrderCart } from 'src/app/redux/actions/state.actions';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent {
  selectedFlights: IBookingPage[] = [];

  path = Path;

  constructor(private store: Store) {}

  getTotalCost() {
    return this.selectedFlights
      .map((flight) =>
        flight.responseAir
          ? flight.responseAir.thereWay[flight.indexThereWay].price.usd
          : 0
      )
      .reduce((acc, value) => acc + value, 0);
  }

  getSelectedFlights(flights: IBookingPage[]) {
    this.selectedFlights = [...flights];
  }

  payForOrder() {
    if(this.selectedFlights.length) {
      this.store.dispatch(addToFlightsHistory({ newBoughtFlights: this.selectedFlights}));
      this.selectedFlights.map((flight) =>
        flight.orderId && this.store.dispatch(deleteOrderCart({ OrderId: flight.orderId }))
      );
    }
  }
}
