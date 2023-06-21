import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntryWithSocialComponent } from './entry-with-social.component';

describe('EntryWithSocialComponent', () => {
  let component: EntryWithSocialComponent;
  let fixture: ComponentFixture<EntryWithSocialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EntryWithSocialComponent],
    })
      .compileComponents();

    fixture = TestBed.createComponent(EntryWithSocialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
