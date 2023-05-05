import { Component } from '@angular/core';
import { Path } from 'src/app/shared/enums/router.enum';
import { PeriodicElement } from '../table/table.component';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent {
  selectedFlights: PeriodicElement[] = [];

  path = Path;

  getTotalCost() {
    return this.selectedFlights
      .map((flight) => flight.price)
      .reduce((acc, value) => acc + value, 0);
  }

  getSelectedFlights(flights: PeriodicElement[]) {
    this.selectedFlights = [...flights];
  }
}
