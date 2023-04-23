import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { ILocation, IPassengers } from '../../model/search-form.model';
import { Path } from '../../../shared/enums/router.enum';

@Component({
  selector: 'app-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.scss'],
})
export class SearchFormComponent {
  filteredOptions?: Observable<string[]>;

  constructor(private router: Router) {}

  locations: ILocation[] = [
    { value: 'LHR-0', viewValue: 'London Heathrow (LHR)' },
    { value: 'CDG-1', viewValue: 'Paris Charles de Gaulle (CDG)' },
    { value: 'FRA-2', viewValue: 'Frankfurt Airport (FRA)' },
    { value: 'AMS-3', viewValue: 'Amsterdam Airport Schiphol (AMS)' },
    { value: 'MAD-4', viewValue: 'Adolfo Suárez Madrid-Barajas Airport (MAD)' },
    { value: 'FCO-5', viewValue: 'Leonardo Da Vinci-Fiumicino Airport (FCO)' },
  ];

  passengers: IPassengers[] = [
    { value: 'adult-0', viewValue: 'Adults 14+ years' },
    { value: 'child-1', viewValue: 'Child 2-14 years' },
    { value: 'Infant -2', viewValue: 'Infant 0-2 years' },
  ];

  submitSearchRequest() {
    console.log('seearch request submitted');
    this.router.navigateByUrl(`/${Path.Booking}`);
  }
}
