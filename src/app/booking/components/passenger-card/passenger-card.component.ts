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
import { selectPassengersInfo, selectUserBooking } from 'src/app/redux/selectors/state.selector';
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

  subscripePas$: Subscription;

  subscripeStore$: Subscription;

  codeCountry = this.countries[0].calling_code;

  phone = '';

  passengEmail = '';

  hideDelay = new FormControl(2000);

  // isBackWay: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private store: Store,
    private router: Router,
    private stepper: StepperService,
  ) {
    this.subscripeStore$ = this.store
      .select(selectUserBooking)
    // eslint-disable-next-line @ngrx/no-store-subscription
      .subscribe((bookingData) => {
        if (bookingData.passengersCount) {
          this.passengersCount$ = bookingData.passengersCount;
        }
        // this.isBackWay = bookingData.responseAir?.way === 'round';
      });
  }

  ngAfterViewInit(): void {}

  ngOnDestroy(): void {
    this.subscripePas$?.unsubscribe();
    this.subscripeStore$?.unsubscribe();
  }

  ngOnInit() {
    this.subscripePas$ = this.passengerInfo$.subscribe((res) => {
      if (res) {
        this.phone = res.contactsDetail.phoneNumber;
        this.codeCountry = res.contactsDetail.countryCode;
        this.passengEmail = res.contactsDetail.email;
      }

      this.formPassengers = this.formBuilder.group({
        passengers: this.formBuilder.array([]),
        contact: this.formBuilder.group({
          countryCode: [this.codeCountry, [Validators.required]],
          phoneNumber: [
            this.phone,
            [Validators.required, Validators.pattern('[0-9]{5,13}')],
          ],
          email: [
            this.passengEmail,
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
        const passengersOfType = res?.passengers.filter((p) => p.type === type);

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

          if (passengersOfType) {
            const passenger = passengersOfType[i];
            if (passenger) {
              passengerFormGroup.patchValue({
                firstName: passenger.firstName,
                lastName: passenger.lastName,
                gender: passenger.gender,
                birthDay: passenger.birthDay,
                seat: passenger.seat,
                cabinLuggage: passenger.cabinLuggage,
                commonLuggage: passenger.commonLuggage,
                specialAssistance: passenger.specialAssistance,
              });
            }
          }

          (this.formPassengers.get('passengers') as FormArray).push(
            passengerFormGroup,
          );
        }
      });
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
