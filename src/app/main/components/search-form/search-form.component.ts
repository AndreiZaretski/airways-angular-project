import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { createDateValidator, createLocationsValidator } from 'src/app/shared/validators/custom-validators-search-form';
import { Store } from '@ngrx/store';
import { updateMainState } from 'src/app/redux/actions/state.actions';
import { Subscription } from 'rxjs';
import { ILocation, IPassengers } from '../../model/search-form.model';
import { Path } from '../../../shared/enums/router.enum';
import { AutocompleteDropdownComponent } from '../autocomplete-dropdown/autocomplete-dropdown.component';

@Component({
  selector: 'app-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.scss'],
})
export class SearchFormComponent implements OnInit, OnDestroy {
  isFormVertical = false;

  subscription: Subscription;

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
    way: ['round', Validators.required],
    route: this.formBuilder.group({
      fromLocation: ['', Validators.required],
      toLocation: ['', Validators.required],
    }, { validator: createLocationsValidator() }),
    dates: this.formBuilder.group({
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
    }, { validator: createDateValidator() }),
    passengers: [[], Validators.required],
  });

  private locationFrom = '';

  private locationTo = '';

  private selectedPassengers: string[] = [];

  constructor(
    private router: Router,
    private responsive: BreakpointObserver,
    private formBuilder: FormBuilder,
    private store: Store,
  ) {}

  ngOnDestroy(): void {
    setTimeout(() => this.subscription?.unsubscribe());
  }

  ngOnInit(): void {
    this.responsive.observe(Breakpoints.XSmall).subscribe((result) => {
      this.isFormVertical = false;
      if (result.matches) {
        this.isFormVertical = true;
      }
    });
  }

  addPassenger(chosenPassenger: IPassengers, event: Event): void {
    if (chosenPassenger.count !== undefined) {
      // eslint-disable-next-line no-param-reassign
      chosenPassenger.count += 1;
      // eslint-disable-next-line no-param-reassign
      chosenPassenger.selected = true;
      event.stopPropagation();
      if (!this.selectedPassengers.includes(chosenPassenger.value)) {
        this.selectedPassengers.push(chosenPassenger.value);
        this.passengers?.setValue(this.selectedPassengers);
      }
    }
  }

  disableClickDefaultBehaviour(event: Event): void {
    event.stopImmediatePropagation();
    event.preventDefault();
  }

  get way(): AbstractControl<string | null> | null {
    return this.searchForm.get('way');
  }

  get route(): AbstractControl<{
    [key: string]: string;
  }, {
    [key: string]: string;
  }> | null {
    return this.searchForm.get('route');
  }

  get dates(): AbstractControl<{
    [key: string]: Date;
  }, {
    [key: string]: Date;
  }> | null {
    return this.searchForm.get('dates');
  }

  get startDate(): AbstractControl<string | null> | null {
    return this.searchForm.get('dates.startDate');
  }

  get endDate(): AbstractControl<string | null> | null {
    return this.searchForm.get('dates.endDate');
  }

  get passengers(): AbstractControl<string[] | null> | null {
    return this.searchForm.get('passengers');
  }

  removePassenger(chosenPassenger: IPassengers, event: Event): void {
    event.stopPropagation();
    if (chosenPassenger.count) {
      // eslint-disable-next-line no-param-reassign
      chosenPassenger.count -= 1;
    }
    if (chosenPassenger.count === 0) {
      // eslint-disable-next-line no-param-reassign
      chosenPassenger.selected = false;
      const indexToRemove = this.selectedPassengers.indexOf(chosenPassenger.value);
      if (indexToRemove > -1) {
        this.selectedPassengers.splice(indexToRemove, 1);
      }
    }
    this.passengers?.setValue(this.selectedPassengers);
  }

  submitSearchRequest(): void {
    if (this.searchForm.valid) {
      console.log('search request submitted');
      console.log(this.searchForm.value);

      const searchFormValue = {
        startDate: String(this.startDate?.value),
        endDate: String(this.endDate?.value),
        passengers: this.searchForm.value.passengers,
        route: {
          fromLocation: this.route?.value['fromLocation'] as string,
          toLocation: this.route?.value['toLocation'] as string,
        },
        way: this.searchForm.value.way as string,
      };

      this.store.dispatch(updateMainState({
        newSearchForm: searchFormValue,
        newPassengerOptions: this.passengerOptions,
      }));
      this.router.navigate([Path.Booking, Path.Flights]);
    }
  }

  switchLocations(
    fromLocation: AutocompleteDropdownComponent,
    toLocation: AutocompleteDropdownComponent,
  ): void {
    this.locationFrom = toLocation.locationInput.value ?? '';
    this.locationTo = fromLocation.locationInput.value ?? '';

    fromLocation.locationInput.setValue(this.locationFrom);
    toLocation.locationInput.setValue(this.locationTo);
  }
}
