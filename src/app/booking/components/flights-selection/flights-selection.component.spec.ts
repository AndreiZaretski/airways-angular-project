import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlightsSelectionComponent } from './flights-selection.component';

describe('FlightsSelectionComponent', () => {
  let component: FlightsSelectionComponent;
  let fixture: ComponentFixture<FlightsSelectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FlightsSelectionComponent],
    })
      .compileComponents();

    fixture = TestBed.createComponent(FlightsSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
