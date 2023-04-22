import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Path } from './shared/enums/router.enum';

const routes: Routes = [

  {
    path: Path.Main,
    loadChildren: () => import('./main/main.module').then((m) => m.MainModule),
  },
  {
    path: Path.Login,
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: Path.Booking,
    loadChildren: () => import('./booking/booking.module').then((m) => m.BookingModule),
  },
  {
    path: Path.Empty,
    redirectTo: Path.Main,
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: Path.Main,
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
