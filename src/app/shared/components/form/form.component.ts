import {
  Component, Input, OnDestroy, OnInit,
} from '@angular/core';
import { Router } from '@angular/router';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { createDateValidator, createLocationsValidator } from 'src/app/shared/validators/custom-validators-search-form';
import { Store } from '@ngrx/store';
import {
  updateChooseChekedBackWayEdit,
  updateChooseChekedThereWayEdit,
  updateIndexBackWay,
  updateIndexThereWay,
  updateMainState,
} from 'src/app/redux/actions/state.actions';
import { Subscription } from 'rxjs';
import { selectSearchMain, selectUserBooking, selectUserSettingsDateFormat } from 'src/app/redux/selectors/state.selector';
import { IAirport, IPassengers } from '../../models/interface-locations-passengers';
import { Path } from '../../enums/router.enum';
import { DropdownComponent } from '../dropdown/dropdown.component';
import airports from '../../data/airports.json';
import { EditPanelService } from '../../services/edit-panel.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit, OnDestroy {
  @Input() source: string;

  airportsList: IAirport[] = airports;

  checkedThereWay = false;

  checkedBackWay = false;

  isBookingFormVertical = false;

  isFormVertical = false;

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

  userBooking$ = this.store.select(selectUserBooking);

  userDateFormat$ = this.store.select(selectUserSettingsDateFormat);

  private locationFrom = '';

  private locationTo = '';

  private savedState$ = this.store.select(selectSearchMain);

  private selectedPassengers: string[] = [];

  private subscriptionBreakpoints: Subscription;

  private subscriptionSavedState: Subscription;

  private subscriptionUserBooking: Subscription;

  constructor(
    private router: Router,
    private responsive: BreakpointObserver,
    private formBuilder: FormBuilder,
    private store: Store,
    private editPanelService: EditPanelService,
  ) {}

  ngOnInit(): void {
    this.subscriptionBreakpoints = this.responsive.observe(
      [Breakpoints.XSmall, Breakpoints.Medium, Breakpoints.Small],
    ).subscribe((result) => {
      const { breakpoints } = result;
      this.isFormVertical = false;
      this.isBookingFormVertical = false;

      if (breakpoints[Breakpoints.Medium] || breakpoints[Breakpoints.Small]) {
        this.isBookingFormVertical = true;
      }
      if (breakpoints[Breakpoints.XSmall]) {
        this.isFormVertical = true;
      }
    });

    this.subscriptionSavedState = this.savedState$.subscribe((res) => {
      this.way?.setValue(res.searchForm.way);
      this.route?.setValue(res.searchForm.route);

      this.selectedPassengers = [...res.searchForm.passengers as Array<string>];
      this.passengers?.setValue(this.selectedPassengers);

      this.passengerOptions = JSON.parse(JSON.stringify(res.passengerOptions));

      if (res.searchForm.startDate && res.searchForm.endDate) {
        this.dates?.setValue(
          {
            startDate: new Date(res.searchForm.startDate),
            endDate: new Date(res.searchForm.endDate),
          },
        );
      }
    });

    this.subscriptionUserBooking = this.userBooking$.subscribe((res) => {
      this.checkedThereWay = res.checkedThereWay;
      this.checkedBackWay = res.checkedBackWay;
    });
  }

  addPassenger(chosenPassenger: IPassengers, event: Event): void {
    if (chosenPassenger.count !== undefined) {
      const totalPassengers = this.passengerOptions
        .reduce((sum, acc) => sum + (acc.count as number), 0);
      if (totalPassengers < 100) {
        // eslint-disable-next-line no-param-reassign
        chosenPassenger.count += 1;
        // eslint-disable-next-line no-param-reassign
        chosenPassenger.selected = true;
        event.stopPropagation();
      }
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

  ngOnDestroy(): void {
    this.subscriptionBreakpoints.unsubscribe();
    this.subscriptionSavedState.unsubscribe();
    this.subscriptionUserBooking.unsubscribe();
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

  submitSearchRequest(event: Event): void {
    event.preventDefault();
    if (this.searchForm.valid) {
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

      if (this.checkedThereWay) {
        this.store.dispatch(updateChooseChekedThereWayEdit());
      }
      if (this.checkedBackWay) {
        this.store.dispatch(updateChooseChekedBackWayEdit());
      }
      this.store.dispatch(updateIndexThereWay({ newIndexThereWay: 3 }));
      this.store.dispatch(updateIndexBackWay({ newIndexBackWay: 3 }));

      this.editPanelService.editPanelShown = false;

      this.router.navigate([Path.Booking, Path.Flights]);
    }
  }

  switchLocations(
    event: Event,
    fromLocation: DropdownComponent,
    toLocation: DropdownComponent,
  ): void {
    event.preventDefault();
    this.locationFrom = toLocation.locationInput.value ?? '';
    this.locationTo = fromLocation.locationInput.value ?? '';

    fromLocation.locationInput.setValue(this.locationFrom);
    toLocation.locationInput.setValue(this.locationTo);
  }
}
