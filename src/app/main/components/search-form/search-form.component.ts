import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { ILocation, IPassengers } from '../../model/search-form.model';
import { Path } from '../../../shared/enums/router.enum';

@Component({
  selector: 'app-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.scss'],
})
export class SearchFormComponent implements OnInit {
  isFormVertical = false;

  locations: ILocation[] = [
    { value: 'LHR-0', viewValue: 'London Heathrow (LHR)' },
    { value: 'CDG-1', viewValue: 'Paris Charles de Gaulle (CDG)' },
    { value: 'FRA-2', viewValue: 'Frankfurt Airport (FRA)' },
    { value: 'AMS-3', viewValue: 'Amsterdam Airport Schiphol (AMS)' },
    { value: 'MAD-4', viewValue: 'Adolfo Suárez Madrid-Barajas Airport (MAD)' },
    { value: 'FCO-5', viewValue: 'Leonardo Da Vinci-Fiumicino Airport (FCO)' },
  ];

  minDate = new Date();

  maxDate = new Date(2024, 0, 1);

  passengerOptions: IPassengers[] = [
    {
      value: 'Adult', viewCategory: 'Adults', viewDesc: '14+ years', count: 0, selected: false,
    },
    {
      value: 'Child', viewCategory: 'Child', viewDesc: '2-14 years', count: 0, selected: false,
    },
    {
      value: 'Infant', viewCategory: 'Infant', viewDesc: '0-2 years', count: 0, selected: false,
    },
  ];

  searchForm = this.formBuilder.group({
    way: ['1', Validators.required],
    fromLocation: ['', Validators.required],
    toLocation: ['', Validators.required],
    startDate: ['', Validators.required],
    endDate: ['', Validators.required],
    passengers: ['', Validators.required],
  });

  constructor(
    private router: Router,
    private responsive: BreakpointObserver,
    private formBuilder: FormBuilder,
  ) {}

  ngOnInit():void {
    this.responsive.observe(Breakpoints.XSmall).subscribe((result) => {
      this.isFormVertical = false;
      if (result.matches) {
        this.isFormVertical = true;
      }
    });
    console.log('minDate', this.minDate);
    console.log('max', this.maxDate);
  }

  addPassenger(chosenPassenger: IPassengers): void {
    if (chosenPassenger.count !== undefined) {
      // eslint-disable-next-line no-param-reassign
      chosenPassenger.count += 1;
      // eslint-disable-next-line no-param-reassign
      chosenPassenger.selected = true;
    }
    console.log(chosenPassenger.value, chosenPassenger.count);
  }

  get way(): AbstractControl<string | null> | null {
    return this.searchForm.get('way');
  }

  get startDate(): AbstractControl<string | null> | null {
    return this.searchForm.get('startDate');
  }

  get endDate(): AbstractControl<string | null> | null {
    return this.searchForm.get('endDate');
  }

  get passengers(): AbstractControl<string | null> | null {
    return this.searchForm.get('passengers');
  }

  removePassenger(chosenPassenger: IPassengers): void {
    if (chosenPassenger.count) {
      // eslint-disable-next-line no-param-reassign
      chosenPassenger.count -= 1;
    } else {
      // eslint-disable-next-line no-param-reassign
      chosenPassenger.selected = false;
    }
    console.log(chosenPassenger.value, chosenPassenger.count);
  }

  submitSearchRequest(): void {
    if (this.searchForm.valid) {
      console.log('search request submitted');
      this.router.navigateByUrl(`/${Path.Booking}`);
    }
  }
}
