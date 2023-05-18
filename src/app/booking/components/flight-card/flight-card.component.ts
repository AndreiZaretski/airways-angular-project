import { Component, Input } from '@angular/core';
import { PeriodicElement } from '../../../cart/components/table/table.component';
import { ICurrentFlightSummary } from '../../pages/summary-page/summary-page.component';
import { IPassengersData } from 'src/app/shared/models/interface-user-booking';

@Component({
  selector: 'app-flight-card',
  templateUrl: './flight-card.component.html',
  styleUrls: ['./flight-card.component.scss'],
})
export class FlightCardComponent {
  @Input() flight: ICurrentFlightSummary;
  @Input() passengers: IPassengersData[];
  @Input() indexOfFlight: number;

}
