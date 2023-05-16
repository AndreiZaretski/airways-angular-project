import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { SharedModule } from '../shared/shared.module';
import { BookingPageComponent } from './pages/booking-page/booking-page.component';
import BookingRoutingModule from './booking-routing.module';
import { FlightsSelectionComponent } from './components/flights-selection/flights-selection.component';
import { PassengersComponent } from './components/passengers/passengers.component';
import { Path } from '../shared/enums/router.enum';
import { BookingHeaderComponent } from './components/booking-header/booking-header.component';
import { TotalPassengersPipe } from './pipes/total-passengers.pipe';
import { FlightsSelectionItemComponent } from './components/flights-selection-item/flights-selection-item.component';
import { FloatingPanelComponent } from './components/floating-panel/floating-panel.component';
import { SummaryPageComponent } from './pages/summary-page/summary-page.component';
import { FlightCardComponent } from './components/flight-card/flight-card.component';
import { PassengerLuggageComponent } from './components/passenger-luggage/passenger-luggage.component';
import { TotalSumComponent } from './components/total-sum/total-sum.component';
import { ConvertDurationPipe } from './pipes/convert-duration.pipe';

const routes: Routes = [
  {
    path: Path.Empty,
    component: BookingPageComponent,
    children: [
      { path: Path.Flights, component: FlightsSelectionComponent },
      { path: Path.Passengers, component: PassengersComponent },
      { path: Path.Summary, component: SummaryPageComponent },
      { path: Path.Empty, redirectTo: Path.Flights, pathMatch: 'full' },
    ],
  },
];

@NgModule({
  declarations: [
    BookingPageComponent,
    FlightsSelectionComponent,
    PassengersComponent,
    SummaryPageComponent,
    BookingHeaderComponent,
    TotalPassengersPipe,
    FlightsSelectionItemComponent,
    FloatingPanelComponent,
    FlightCardComponent,
    PassengerLuggageComponent,
    TotalSumComponent,
    ConvertDurationPipe
  ],
  imports: [
    CommonModule,
    SharedModule,
    BookingRoutingModule,
    RouterModule.forChild(routes),
    SlickCarouselModule,
  ],
})
export class BookingModule {}
