import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookingPageComponent } from './pages/booking-page/booking-page.component';
import { Path } from '../shared/enums/router.enum';
import { PassengersComponent } from './components/passengers/passengers.component';
import { SummaryPageComponent } from './pages/summary-page/summary-page.component';
import { FlightsSelectionComponent } from './components/flights-selection/flights-selection.component';
import { PassengersPageComponent } from './pages/passengers-page/passengers-page.component';

const routes: Routes = [
  {
    path: '',
    component: BookingPageComponent,
    children: [
      { path: Path.Flights, component: FlightsSelectionComponent },
      { path: Path.Passengers, component: PassengersPageComponent },
      { path: Path.Summary, component: SummaryPageComponent },
      { path: '**', redirectTo: Path.Flights, pathMatch: 'full' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export default class BookingRoutingModule {}
