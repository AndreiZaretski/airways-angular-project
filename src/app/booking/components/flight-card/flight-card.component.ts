import { Component, Input } from '@angular/core';
import { PeriodicElement } from '../../../cart/components/table/table.component';
import { Passenger } from '../../pages/summary-page/summary-page.component';

@Component({
  selector: 'app-flight-card',
  templateUrl: './flight-card.component.html',
  styleUrls: ['./flight-card.component.scss'],
})
export class FlightCardComponent {
  @Input() flight: PeriodicElement;
  @Input() passengers: Passenger[];
}
