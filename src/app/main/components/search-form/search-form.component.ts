import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { ILocation, IPassengers } from '../../model/search-form.model';
import { Path } from '../../../shared/enums/router.enum';

@Component({
  selector: 'app-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.scss'],
})
export class SearchFormComponent implements OnInit {
  filteredOptions?: Observable<string[]>;

  isFormVertical = false;

  constructor(private router: Router, private responsive: BreakpointObserver) {}

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

  ngOnInit() {
    this.responsive.observe(Breakpoints.XSmall).subscribe((result) => {
      this.isFormVertical = false;
      if (result.matches) {
        console.log('width <600px');
        this.isFormVertical = true;
      }
    });
  }

  submitSearchRequest() {
    console.log('search request submitted');
    this.router.navigateByUrl(`/${Path.Booking}`);
  }
}
