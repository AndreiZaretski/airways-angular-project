import { Component, Input } from '@angular/core';
import { IPassengersData } from 'src/app/shared/models/interface-user-booking';

@Component({
  selector: 'app-passenger-luggage',
  templateUrl: './passenger-luggage.component.html',
  styleUrls: ['./passenger-luggage.component.scss'],
})

export class PassengerLuggageComponent {
  @Input() passenger: IPassengersData;

  @Input() indexOfFlight: number;

  commonLuggageMessage = '1checked bag (total 23 kg) included';
  cabinLuggageMessage = '1 cabin bag + 1 personal item (max. 8 kg) included';
}
