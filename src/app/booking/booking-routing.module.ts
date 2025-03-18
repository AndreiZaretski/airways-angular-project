import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookingPageComponent } from './pages/booking-page/booking-page.component';
import { Path } from '../shared/enums/router.enum';
import { SummaryPageComponent } from './pages/summary-page/summary-page.component';
import { FlightsSelectionComponent } from './components/flights-selection/flights-selection.component';
import { PassengersPageComponent } from './pages/passengers-page/passengers-page.component';
import { PassengersGuard } from '../core/guards/passengers-guard.guard';
import { SummaryGuard } from '../core/guards/summary-guard.guard';

const routes: Routes = [
  {
    path: '',
    component: BookingPageComponent,
    children: [
      { path: Path.Flights, component: FlightsSelectionComponent },
      {
        path: Path.Passengers,
        component: PassengersPageComponent,
        canActivate: [PassengersGuard],
        canLoad: [PassengersGuard],
      },
      {
        path: Path.Summary,
        component: SummaryPageComponent,
        canActivate: [SummaryGuard],
        canLoad: [SummaryGuard],
      },
      { path: '**', redirectTo: Path.Flights, pathMatch: 'full' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export default class BookingRoutingModule {}
