/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot, CanActivate, CanLoad,
  Route, Router, RouterStateSnapshot, UrlSegment, UrlTree,
} from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectUserBooking } from 'src/app/redux/selectors/state.selector';
import { MatDialog } from '@angular/material/dialog';
import { ModalComponent } from 'src/app/auth/pages/modal/modal.component';
import { Path } from 'src/app/shared/enums/router.enum';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class PassengersGuard implements CanActivate, CanLoad {
  constructor(
    private router: Router,
    private authServise: AuthService,
    private store: Store,
    public dialog: MatDialog,
  ) {
    // this.store.dispatch(checkRequestUser());
    // eslint-disable-next-line @ngrx/no-store-subscription
    this.store.select(selectUserBooking).subscribe((res) => {
      this.way = res.responseAir?.way as string;
      this.thereWay = res.checkedThereWay;
      this.backWay = res.checkedBackWay;
    });
    // this.currentUser = this.authServise.checkUser();
  }

  currentUser: boolean;

  way = '';

  thereWay = false;

  backWay = false;

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.checkActivate();
  }

  canLoad(
    route: Route,
    segments: UrlSegment[],
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.checkLoad();
  }

  private checkActivate() {
    this.currentUser = this.authServise.checkUser();
    if (this.currentUser && this.way === 'round' && this.thereWay && this.backWay) {
      return true;
    }

    if (this.currentUser && this.way === 'one-way' && this.thereWay) {
      return true;
    }
    this.router.navigate([Path.Booking, Path.Flights]);
    this.dialog.open(ModalComponent);

    return false;
  }

  private checkLoad() {
    this.currentUser = this.authServise.checkUser();
    if (this.currentUser && this.way === 'round' && this.thereWay && this.backWay) {
      return true;
    }

    if (this.currentUser && this.way === 'one-way' && this.thereWay) {
      return true;
    }

    this.router.navigate([Path.Main]);

    return false;
  }
}
