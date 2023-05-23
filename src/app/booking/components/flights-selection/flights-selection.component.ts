import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { StepperService } from 'src/app/core/services/stepper-service.service';
import { selectAirResponse, selectUserBooking } from 'src/app/redux/selectors/state.selector';
import { EditPanelService } from 'src/app/shared/services/edit-panel.service';
import { Path } from 'src/app/shared/enums/router.enum';

@Component({
  selector: 'app-flights-selection',
  templateUrl: './flights-selection.component.html',
  styleUrls: ['./flights-selection.component.scss'],
})
export class FlightsSelectionComponent implements OnInit {
  checkedThereWay = false;

  checkedBackWay = false;

  index = 0;

  path = Path;

  responseDetails$ = this.store.select(selectAirResponse);

  userBooking$ = this.store.select(selectUserBooking);

  constructor(
    private store: Store,
    public editPanelService: EditPanelService,
    public stepper: StepperService,
  ) {}

  ngOnInit() {
    this.responseDetails$.subscribe((res) => console.log(res));

    this.userBooking$.subscribe((res) => {
      this.checkedThereWay = res.checkedThereWay;
      this.checkedBackWay = res.checkedBackWay;
    });
  }
}
