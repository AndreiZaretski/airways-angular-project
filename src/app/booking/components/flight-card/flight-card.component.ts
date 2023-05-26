import { Component, Input } from '@angular/core';
import { IPassengersData } from 'src/app/shared/models/interface-user-booking';
import { ICurrentFlightSummary } from '../../pages/summary-page/summary-page.component';

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
