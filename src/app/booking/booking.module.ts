import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { SharedModule } from '../shared/shared.module';
import { BookingPageComponent } from './pages/booking-page/booking-page.component';
import BookingRoutingModule from './booking-routing.module';
import { FlightsSelectionComponent } from './components/flights-selection/flights-selection.component';
import { BookingHeaderComponent } from './components/booking-header/booking-header.component';
import { TotalPassengersPipe } from './pipes/total-passengers.pipe';
import { FlightsSelectionItemComponent } from './components/flights-selection-item/flights-selection-item.component';
import { FloatingPanelComponent } from './components/floating-panel/floating-panel.component';
import { SummaryPageComponent } from './pages/summary-page/summary-page.component';
import { FlightCardComponent } from './components/flight-card/flight-card.component';
import { PassengerLuggageComponent } from './components/passenger-luggage/passenger-luggage.component';
import { TotalSumComponent } from './components/total-sum/total-sum.component';
import { ConvertDurationPipe } from './pipes/convert-duration.pipe';
import { ColorSeatsDirective } from './directives/color-seats.directive';
import { PassengerCardComponent } from './components/passenger-card/passenger-card.component';
import { PassengersPageComponent } from './pages/passengers-page/passengers-page.component';

@NgModule({
  declarations: [
    BookingPageComponent,
    FlightsSelectionComponent,
    SummaryPageComponent,
    BookingHeaderComponent,
    TotalPassengersPipe,
    FlightsSelectionItemComponent,
    FloatingPanelComponent,
    FlightCardComponent,
    PassengerLuggageComponent,
    TotalSumComponent,
    ConvertDurationPipe,
    ColorSeatsDirective,
    PassengerCardComponent,
    PassengersPageComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    BookingRoutingModule,
    SlickCarouselModule,
  ],
})
export class BookingModule {}
