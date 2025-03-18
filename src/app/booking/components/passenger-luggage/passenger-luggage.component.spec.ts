import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PassengerLuggageComponent } from './passenger-luggage.component';

describe('PassengerLuggageComponent', () => {
  let component: PassengerLuggageComponent;
  let fixture: ComponentFixture<PassengerLuggageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PassengerLuggageComponent],
    })
      .compileComponents();

    fixture = TestBed.createComponent(PassengerLuggageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
