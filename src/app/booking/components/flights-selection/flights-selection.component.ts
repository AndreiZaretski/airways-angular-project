import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectUserBoking } from 'src/app/redux/selectors/state.selector';
import { EditPanelService } from '../../services/edit-panel.service';

@Component({
  selector: 'app-flights-selection',
  templateUrl: './flights-selection.component.html',
  styleUrls: ['./flights-selection.component.scss'],
})
export class FlightsSelectionComponent implements OnInit {
  responseDetails$ = this.store.select(selectUserBoking);

  constructor(private store: Store, public editPanelService: EditPanelService) {}

  ngOnInit() {
    console.log(this.responseDetails$);
  }
}
