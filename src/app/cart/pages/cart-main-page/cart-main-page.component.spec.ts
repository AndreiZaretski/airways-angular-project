import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartMainPageComponent } from './cart-main-page.component';

describe('CartMainPageComponent', () => {
  let component: CartMainPageComponent;
  let fixture: ComponentFixture<CartMainPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CartMainPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CartMainPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
