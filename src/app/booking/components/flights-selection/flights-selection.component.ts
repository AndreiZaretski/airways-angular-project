import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectUserBoking } from 'src/app/redux/selectors/state.selector';

@Component({
  selector: 'app-flights-selection',
  templateUrl: './flights-selection.component.html',
  styleUrls: ['./flights-selection.component.scss'],
})
export class FlightsSelectionComponent {
  responseDetails$ = this.store.select(selectUserBoking);

  constructor(private store: Store) {}

  ngOnInit() {
    console.log(this.responseDetails$);
  }
}
