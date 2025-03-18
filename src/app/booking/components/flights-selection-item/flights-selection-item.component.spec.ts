import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlightsSelectionItemComponent } from './flights-selection-item.component';

describe('FlightsSelectionItemComponent', () => {
  let component: FlightsSelectionItemComponent;
  let fixture: ComponentFixture<FlightsSelectionItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FlightsSelectionItemComponent],
    })
      .compileComponents();

    fixture = TestBed.createComponent(FlightsSelectionItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
