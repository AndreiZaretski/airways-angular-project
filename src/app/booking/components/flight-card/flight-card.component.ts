import { Component, Input, OnInit } from '@angular/core';
import { IPassengersData } from 'src/app/shared/models/interface-user-booking';
import { Observable } from 'rxjs';
import { DateFormat } from 'src/app/shared/enums/date.enum';
import { Store } from '@ngrx/store';
import { selectUserSettingsDateFormat } from 'src/app/redux/selectors/state.selector';
import { ICurrentFlightSummary } from '../../models/current-flight.model';

@Component({
  selector: 'app-flight-card',
  templateUrl: './flight-card.component.html',
  styleUrls: ['./flight-card.component.scss'],
})
export class FlightCardComponent implements OnInit {
  @Input() flight: ICurrentFlightSummary;

  @Input() passengers: IPassengersData[];

  @Input() indexOfFlight: number;

  formatDate$: Observable<DateFormat>;

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.formatDate$ = this.store.select(selectUserSettingsDateFormat);
  }
}
