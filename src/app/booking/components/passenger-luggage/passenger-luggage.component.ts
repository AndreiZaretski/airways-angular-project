import { Component, Input } from '@angular/core';
import { Passenger } from '../../pages/summary-page/summary-page.component';

@Component({
  selector: 'app-passenger-luggage',
  templateUrl: './passenger-luggage.component.html',
  styleUrls: ['./passenger-luggage.component.scss'],
})
export class PassengerLuggageComponent {
  @Input() passenger: Passenger;
}
