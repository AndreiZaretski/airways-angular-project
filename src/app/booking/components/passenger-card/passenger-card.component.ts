import { Component, DoCheck, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Store, select } from '@ngrx/store';
import { selectUserBooking } from 'src/app/redux/selectors/state.selector';
import { IPassengersCount } from 'src/app/shared/models/interface-user-booking';
import { ValidatedForms } from 'src/app/shared/validators/custom-validate-forms';
import { country } from 'src/app/shared/data/country';
import { Path } from 'src/app/shared/enums/router.enum';
import { Router } from '@angular/router';
import { updatePassengersInfo } from 'src/app/redux/actions/state.actions';

interface Country {
  country: string;
  calling_code: number;
}

@Component({
  selector: 'app-passenger-card',
  templateUrl: './passenger-card.component.html',
  styleUrls: ['./passenger-card.component.scss'],
})
export class PassengerCardComponent {
  passengersCount$: IPassengersCount = {
    adult: 1,
    child: 0,
    infant: 0,
  };

  formPassengers: FormGroup;

  countries: Country[] = country;

  takenSeatsThere: string[] = [];

  takenSeatsBack: string[] = [];

  // isBackWay: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private store: Store,
    private router: Router
  ) {
    this.store.pipe(select(selectUserBooking)).subscribe((bookingData) => {
      if (bookingData.passengersCount)
        this.passengersCount$ = bookingData.passengersCount;
      // this.isBackWay = bookingData.responseAir?.way === 'round';
    });
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
              '^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$'
            ),
          ],
        ],
      }),
    });

    Object.entries(this.passengersCount$).forEach(([type, count]) => {
      for (let i = 0; i < count; i += 1) {
        const randomSeats =
          type === 'infant'
            ? []
            : [
                this.generateRandomSeat(this.takenSeatsThere),
                this.generateRandomSeat(this.takenSeatsBack),
              ];
        console.log(randomSeats);
        const passengerFormGroup: FormGroup = this.formBuilder.group({
          type: type,
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
          passengerFormGroup
        );
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
    return this.router.navigateByUrl(`/${Path.Booking}/${Path.Flights}`);
  }

  submitForm() {
    if (this.formPassengers.valid) {
      console.log(this.formPassengers.value);
      this.store.dispatch(
        updatePassengersInfo({
          newPassengersInfo: {
            passengers: this.formPassengers.value.passengers,
            contactsDetail: this.formPassengers.value.contact,
          },
        })
      );
    }
    this.router.navigateByUrl(`/${Path.Booking}/${Path.Summary}`);
  }
}
