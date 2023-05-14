import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectUserBooking } from 'src/app/redux/selectors/state.selector';
import { EditPanelService } from '../../services/edit-panel.service';

@Component({
  selector: 'app-flights-selection',
  templateUrl: './flights-selection.component.html',
  styleUrls: ['./flights-selection.component.scss'],
})
export class FlightsSelectionComponent implements OnInit {
  bookingDetails$ = this.store.select(selectUserBooking);

  // responseDetails$ = this.store.select(selectAirResponse);

  constructor(private store: Store, public editPanelService: EditPanelService) {}

  ngOnInit() {
    // console.log('response', this.responseDetails$);
    console.log('booking', this.bookingDetails$);

    this.bookingDetails$.subscribe((res) => console.log(res));
  }
}
