import { TestBed } from '@angular/core/testing';

import { CySnackbarService } from './cy-snackbar.service';

describe('CySnackbarService', () => {
  let service: CySnackbarService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CySnackbarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
