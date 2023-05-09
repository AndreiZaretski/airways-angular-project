import { Component, Input } from '@angular/core';
import { IPassengersTotalSum } from '../../pages/summary-page/summary-page.component';
// import { MatTableDataSource } from '@angular/material/table';

const initialPassengersTotalSum = {
  adult: [],
  child: [],
  infant: [],
};

@Component({
  selector: 'app-total-sum',
  templateUrl: './total-sum.component.html',
  styleUrls: ['./total-sum.component.scss'],
})
export class TotalSumComponent {
  @Input() passengersTotalSum: IPassengersTotalSum = initialPassengersTotalSum;

  typesOfPassengers = Object.keys(this.passengersTotalSum);

  calculateTotal() {
    return Object.values(this.passengersTotalSum).flat()
      .reduce((acc, rec) => acc + rec.cost, 0);
  }
}
