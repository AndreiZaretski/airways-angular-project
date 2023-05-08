import { TestBed } from '@angular/core/testing';

import { EditPanelService } from './edit-panel.service';

describe('EditPanelService', () => {
  let service: EditPanelService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EditPanelService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
