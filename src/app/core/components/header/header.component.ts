import { Component, OnDestroy, OnInit } from '@angular/core';
import { Date } from 'src/app/shared/enums/date.enum';
import { Currency } from 'src/app/shared/enums/currency.enum';
import { MatDialog } from '@angular/material/dialog';
import { ModalComponent } from 'src/app/auth/pages/modal/modal.component';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Subscription } from 'rxjs';
import { AuthResponse } from '../../models/interface';
// import { Path } from 'src/app/shared/enums/router.enum';
// import { AuthModule } from 'src/app/auth/auth.module';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  // Date: Date;

  mdy = Date.MDY;

  dmy = Date.DMY;

  ymd = Date.YMD;

  ydm = Date.YDM;

  euro = Currency.EUR;

  usa = Currency.USA;

  rub = Currency.RUB;

  pln = Currency.PLN;

  showButton = true;

  user?: AuthResponse;

  private subscription?: Subscription;

  constructor(
    public dialog: MatDialog,
    private router: Router,
    public authService: AuthService,
  ) {}

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  ngOnInit(): void {
    // console.log(this.authService.user$);

    this.subscription = this.authService.getUser().subscribe((res) => console.log(!!res));
  }

  openDialog() {
    // const dialogRef =
    this.dialog.open(ModalComponent);
    // this.router.navigate([Path.Login]);

    // dialogRef.afterClosed().subscribe((result) => {
    //   console.log(`Dialog result: ${result}`);
    // });
  }
}
