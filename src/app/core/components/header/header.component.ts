import { Component, OnDestroy, OnInit } from '@angular/core';
import { DateFormat } from 'src/app/shared/enums/date.enum';
import { Currency } from 'src/app/shared/enums/currency.enum';
import { MatDialog } from '@angular/material/dialog';
import { ModalComponent } from 'src/app/auth/pages/modal/modal.component';
import { NavigationEnd, Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import {
  Observable, Subscription, filter, map, startWith,
} from 'rxjs';
import { Store } from '@ngrx/store';
import {
  selectAuthCards, selectCartPageLength, selectUserSettingsCurrency, selectUserSettingsDateFormat,
} from 'src/app/redux/selectors/state.selector';
import { Path } from 'src/app/shared/enums/router.enum';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { checkCart, updateUserSettingCurrency, updateUserSettingDateFormat } from 'src/app/redux/actions/state.actions';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthResponseLight } from '../../../shared/models/interface-users';
import { StepperService } from '../../services/stepper-service.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  // Date: Date;

  // Path: Path;

  main = `/${Path.Main}`;

  empty = `/${Path.Empty}`;

  str: string;

  mdy = DateFormat.MDY;

  dmy = DateFormat.DMY;

  ymd = DateFormat.YMD;

  ydm = DateFormat.YDM;

  euro = Currency.EUR;

  usa = Currency.USD;

  rub = Currency.RUB;

  pln = Currency.PLN;

  private currentCurrency$: Subscription;

  private currentDateFormat$: Subscription;

  currentDateFormat: DateFormat;

  currentCurrency: Currency;

  private subscription: Subscription;

  user: AuthResponseLight;

  user$: Observable<AuthResponseLight | null>;

  checkId$: Observable<string | null>;

  formCurrency: FormGroup;

  formDateFormat: FormGroup;

  orderLength$ = this.store.select(selectCartPageLength);

  constructor(
    public dialog: MatDialog,
    public router: Router,
    public authService: AuthService,
    private store: Store,
    private formBuilder: FormBuilder,
    private stepperService: StepperService,
  ) { }

  readonly showContainer$ = this.router.events.pipe(
    filter((event) => event instanceof NavigationEnd),
    map((event) => this.canShowContainer((event as NavigationEnd).urlAfterRedirects)),
    startWith(this.canShowContainer(this.router.url)),
  );

  canShowContainer(url: string): boolean {
    return [`/${Path.Booking}/${Path.Flights}`, `/${Path.Booking}/${Path.Passengers}`, `/${Path.Booking}/${Path.Summary}`, `/${Path.Booking}`].some(
      (path) => url.startsWith(path),
    );
  }

  // onNext() {
  //   this.stepperService.nextStep();
  // }

  // onPrevious() {
  //   // if (this.stepperService.hasPrevious()) {
  //   this.stepperService.previousStep();
  //   // }
  // }

  ngOnInit() {
    this.user$ = this.store.select(selectAuthCards);

    this.formCurrency = this.formBuilder.group({
      currency: [''],
    });

    this.formDateFormat = this.formBuilder.group({
      dateFormat: [''],
    });

    // eslint-disable-next-line @ngrx/no-store-subscription
    this.currentDateFormat$ = this.store.select(selectUserSettingsDateFormat).subscribe(
      (res) => {
        this.currentDateFormat = res;
        this.formDateFormat.controls['dateFormat'].setValue(this.currentDateFormat);
      },
    );
    // eslint-disable-next-line @ngrx/no-store-subscription
    this.currentCurrency$ = this.store.select(selectUserSettingsCurrency).subscribe(
      (res) => {
        const copyRes = res;
        this.currentCurrency = copyRes;
        this.formCurrency.controls['currency'].setValue(this.currentCurrency);
      },
    );
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
    this.currentCurrency$?.unsubscribe();
    this.currentDateFormat$?.unsubscribe();
  }

  sendCurrencyValue(value: Currency) {
    this.store.dispatch(updateUserSettingCurrency({ newCurrency: value }));
  }

  sendDateFormatValue(value: DateFormat) {
    this.store.dispatch(updateUserSettingDateFormat({ newDateFormat: value }));
  }

  goToMainPage() {
    // this.store.dispatch(checkCart());
    this.router.navigate([Path.Main]);
  }

  goToCartPage() {
    this.router.navigate([Path.Cart]);
  }

  goToCartPageHistory() {
    this.router.navigate([Path.Cart, Path.FlightsHistory]);
    // this.router.navigate([`${Path.Cart}/${Path.FlightsHistory}`]);
  }

  openDialog() {
    this.dialog.open(ModalComponent);
  }
}
