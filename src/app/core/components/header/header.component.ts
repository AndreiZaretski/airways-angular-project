import { Component, OnDestroy, OnInit } from '@angular/core';
import { Date } from 'src/app/shared/enums/date.enum';
import { Currency } from 'src/app/shared/enums/currency.enum';
import { MatDialog } from '@angular/material/dialog';
import { ModalComponent } from 'src/app/auth/pages/modal/modal.component';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import {
  Observable, Subscription,
} from 'rxjs';
import { Store } from '@ngrx/store';
import { selectAuthCards } from 'src/app/redux/selectors/state.selector';
import { Path } from 'src/app/shared/enums/router.enum';
import { chekCart } from 'src/app/redux/actions/state.actions';
import { AuthResponseLight } from '../../models/interface';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  // Date: Date;

  str: string;

  mdy = Date.MDY;

  dmy = Date.DMY;

  ymd = Date.YMD;

  ydm = Date.YDM;

  euro = Currency.EUR;

  usa = Currency.USA;

  rub = Currency.RUB;

  pln = Currency.PLN;

  private subscription: Subscription;

  user: AuthResponseLight;

  user$: Observable<AuthResponseLight | null>;

  checkId$: Observable<string | null>;

  constructor(
    public dialog: MatDialog,
    private router: Router,
    public authService: AuthService,
    private store: Store,
  ) { }

  ngOnInit() {
    this.user$ = this.store.select(selectAuthCards);
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  goToMainPage() {
    this.store.dispatch(chekCart());
    this.router.navigate([Path.Main]);
  }

  goToCartPage() {
    this.router.navigate([Path.Cart]);
  }

  openDialog() {
    this.dialog.open(ModalComponent);
  }
}
