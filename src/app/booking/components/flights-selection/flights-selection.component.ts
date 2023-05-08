import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectAirResponse } from 'src/app/redux/selectors/state.selector';
import { EditPanelService } from '../../services/edit-panel.service';

@Component({
  selector: 'app-flights-selection',
  templateUrl: './flights-selection.component.html',
  styleUrls: ['./flights-selection.component.scss'],
})
export class FlightsSelectionComponent implements OnInit {
  index = 0;

  responseDetails$ = this.store.select(selectAirResponse);

  constructor(private store: Store, public editPanelService: EditPanelService) {}

  ngOnInit() {
    console.log('response', this.responseDetails$);

    this.responseDetails$.subscribe((res) => console.log(res));
  }
}
