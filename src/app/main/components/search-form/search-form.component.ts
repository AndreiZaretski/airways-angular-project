import { Component, OnInit } from '@angular/core';
import { Observable, map, startWith } from 'rxjs';
import { Router } from '@angular/router';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { FormControl } from '@angular/forms';
import { ILocation, IPassengers } from '../../model/search-form.model';
import { Path } from '../../../shared/enums/router.enum';

@Component({
  selector: 'app-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.scss'],
})
export class SearchFormComponent implements OnInit {
  filteredLocations?: Observable<string[]>;

  isFormVertical = false;

  fromLocation = new FormControl('');

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
    {
      value: 'Adult', viewCategory: 'Adults', viewDesc: '14+ years', count: 0,
    },
    {
      value: 'Child', viewCategory: 'Child', viewDesc: '2-14 years', count: 0,
    },
    {
      value: 'Infant', viewCategory: 'Infant', viewDesc: '0-2 years', count: 0,
    },
  ];

  ngOnInit():void {
    this.responsive.observe(Breakpoints.XSmall).subscribe((result) => {
      this.isFormVertical = false;
      if (result.matches) {
        this.isFormVertical = true;
      }
    });

    this.filteredLocations = this.fromLocation.valueChanges
      .pipe(
        startWith(''),
        map((value) => this.filter(value || '')),
      );
  }

  filter(value: string):string[] {
    const filterValue = value.toLowerCase();
    const locationsValues = this.locations.map((item) => item.viewValue);
    console.log(filterValue, locationsValues);

    return locationsValues.filter((option) => option.toLowerCase().includes(filterValue));
  }

  submitSearchRequest() {
    console.log('search request submitted');
    this.router.navigateByUrl(`/${Path.Booking}`);
  }
}
