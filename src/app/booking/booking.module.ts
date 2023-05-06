import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { BookingPageComponent } from './pages/booking-page/booking-page.component';
import BookingRoutingModule from './booking-routing.module';
import { FlightsSelectionComponent } from './components/flights-selection/flights-selection.component';
import { PassengersComponent } from './components/passengers/passengers.component';
import { SummaryComponent } from './components/summary/summary.component';
import { Path } from '../shared/enums/router.enum';
import { BookingHeaderComponent } from './components/booking-header/booking-header.component';

const routes: Routes = [
  {
    path: Path.Empty,
    component: BookingPageComponent,
    children: [
      { path: Path.Flights, component: FlightsSelectionComponent },
      { path: Path.Passengers, component: PassengersComponent },
      { path: Path.Summary, component: SummaryComponent },
      { path: Path.Empty, redirectTo: Path.Flights, pathMatch: 'full' },
    ],
  },
];

@NgModule({
  declarations: [
    BookingPageComponent,
    FlightsSelectionComponent,
    PassengersComponent,
    SummaryComponent,
    BookingHeaderComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    BookingRoutingModule,
    RouterModule.forChild(routes),
  ],
})
export class BookingModule { }
