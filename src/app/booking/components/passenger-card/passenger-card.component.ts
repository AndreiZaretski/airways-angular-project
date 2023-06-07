import {
  AfterViewInit, Component, OnDestroy, OnInit,
} from '@angular/core';
import {
  // AbstractControl,
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Store } from '@ngrx/store';
import { selectPassengersInfo, selectUserBooking, selectUserSettingsDateFormat } from 'src/app/redux/selectors/state.selector';
import { IPassengersCount } from 'src/app/shared/models/interface-user-booking';
import { ValidatedForms } from 'src/app/shared/validators/custom-validate-forms';
import { country } from 'src/app/shared/data/country';
import { Path } from 'src/app/shared/enums/router.enum';
import { Router } from '@angular/router';
import { updatePassengersInfo } from 'src/app/redux/actions/state.actions';
import { StepperService } from 'src/app/core/services/stepper-service.service';

import { Subscription } from 'rxjs';

interface Country {
  country: string;
  calling_code: number;
}

@Component({
  selector: 'app-passenger-card',
  templateUrl: './passenger-card.component.html',
  styleUrls: ['./passenger-card.component.scss'],
})
export class PassengerCardComponent implements OnInit, OnDestroy, AfterViewInit {
  passengersCount$: IPassengersCount = {
    adult: 1,
    child: 0,
    infant: 0,
  };

  formPassengers: FormGroup;

  countries: Country[] = country;

  takenSeatsThere: string[] = [];

  takenSeatsBack: string[] = [];

  passengerInfo$ = this.store.select(selectPassengersInfo);

  private userDateFormat$ = this.store.select(selectUserSettingsDateFormat);

  private subscribePas$: Subscription;

  private subscribeStore$: Subscription;

  hideDelay = new FormControl(2000);

  previousRoute: string | undefined;

  private subscriptionFormatDate: Subscription;

  constructor(
    private formBuilder: FormBuilder,
    private store: Store,
    private router: Router,
    private stepper: StepperService,
  ) {
    this.previousRoute = this.router
      .getCurrentNavigation()
      ?.previousNavigation?.finalUrl?.toString();

    this.subscribeStore$ = this.store
      .select(selectUserBooking)
    // eslint-disable-next-line @ngrx/no-store-subscription
      .subscribe((bookingData) => {
        if (bookingData.passengersCount) {
          this.passengersCount$ = bookingData.passengersCount;
        }
      });

    if (this.previousRoute === `/${Path.Booking}/${Path.Flights}` || this.previousRoute === undefined) {
      setTimeout(() => this.stepper.nextStep());
    }
  }

  ngAfterViewInit(): void {
    this.subscriptionFormatDate = this.userDateFormat$
      .subscribe(() => {
        this.allPassengers.controls.forEach((el) => {
          const birthDay = el.get('birthDay');
          if (birthDay) {
            el.patchValue({ birthDay: birthDay.value });
          }
        });
      });
  }

  ngOnDestroy(): void {
    this.subscribePas$?.unsubscribe();
    this.subscribeStore$?.unsubscribe();
    this.subscriptionFormatDate?.unsubscribe();
  }

  ngOnInit() {
    this.formPassengers = this.formBuilder.group({
      passengers: this.formBuilder.array([]),
      contact: this.formBuilder.group({
        countryCode: [this.countries[0].calling_code, [Validators.required]],
        phoneNumber: [
          '',
          [Validators.required, Validators.pattern('[0-9]{5,13}')],
        ],
        email: [
          '',
          [
            Validators.required,
            Validators.pattern(
              '^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$',
            ),
          ],
        ],
      }),
    });

    Object.entries(this.passengersCount$).forEach(([type, count]) => {
      for (let i = 0; i < count; i += 1) {
        const randomSeats = type === 'infant'
          ? []
          : [
            this.generateRandomSeat(this.takenSeatsThere),
            this.generateRandomSeat(this.takenSeatsBack),
          ];
        const passengerFormGroup = this.formBuilder.group({
          type,
          firstName: [
            '',
            [Validators.required, Validators.pattern('[A-Za-zА-Яа-яЁё]+$')],
          ],
          lastName: [
            '',
            [Validators.required, Validators.pattern('[A-Za-zА-Яа-яЁё]+$')],
          ],
          gender: ['male', [Validators.required]],
          birthDay: ['', [Validators.required, ValidatedForms.validateDate]],
          specialAssistance: [false],
          commonLuggage: [{ value: false, disabled: type === 'infant' }],
          cabinLuggage: [{ value: false, disabled: type === 'infant' }],
          seat: [randomSeats],
        });

        (this.formPassengers.get('passengers') as FormArray).push(
          passengerFormGroup,
        );
      }
    });

    this.subscribePas$ = this.passengerInfo$.subscribe((res) => {
      if (res) {
        this.formPassengers.controls['contact'].setValue({
          countryCode: res.contactsDetail.countryCode,
          phoneNumber: res.contactsDetail.phoneNumber,
          email: res.contactsDetail.email,
        });

        this.allPassengers.controls.forEach((el, i) => {
          el.patchValue({
            firstName: res?.passengers[i].firstName,
            lastName: res?.passengers[i].lastName,
            gender: res?.passengers[i].gender,
            birthDay: res?.passengers[i].birthDay,
            seat: res?.passengers[i].seat,
            cabinLuggage: res?.passengers[i].cabinLuggage,
            commonLuggage: res?.passengers[i].commonLuggage,
            specialAssistance: res?.passengers[i].specialAssistance,
          });
        });
      }
    });
  }

  get allPassengers(): FormArray {
    return this.formPassengers.get('passengers') as FormArray;
  }

  generateRandomSeat(takenSeats: string[]): string {
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let randomRow = Math.floor(Math.random() * 30) + 1;
    let randomCol = Math.floor(Math.random() * 6);
    let seatLetter = letters[randomCol];
    let seat = `${randomRow}${seatLetter}`;
    while (takenSeats.includes(seat)) {
      randomRow = Math.floor(Math.random() * 30) + 1;
      randomCol = Math.floor(Math.random() * 6);
      seatLetter = letters[randomCol];
      seat = `${randomRow}${seatLetter}`;
    }
    takenSeats.push(seat);
    return seat;
  }

  getErrorMessageEmail() {
    if (this.formPassengers?.get('contact.email')?.hasError('required')) {
      return 'Please enter a login email';
    }
    return this.formPassengers?.get('contact.email')?.hasError('pattern')
      ? 'Enter a valid email'
      : '';
  }

  goBack() {
    this.stepper.previousStep();
    this.store.dispatch(
      updatePassengersInfo({
        newPassengersInfo: {
          passengers: this.formPassengers.value.passengers,
          contactsDetail: this.formPassengers.value.contact,
        },
      }),
    );
    return this.router.navigateByUrl(`/${Path.Booking}/${Path.Flights}`);
  }

  submitForm() {
    if (this.formPassengers.valid) {
      this.stepper.nextStep();
      this.store.dispatch(
        updatePassengersInfo({
          newPassengersInfo: {
            passengers: this.formPassengers.value.passengers,
            contactsDetail: this.formPassengers.value.contact,
          },
        }),
      );
    }
    this.router.navigateByUrl(`/${Path.Booking}/${Path.Summary}`);
  }
}
