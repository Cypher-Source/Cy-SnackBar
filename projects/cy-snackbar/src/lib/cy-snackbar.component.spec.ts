import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CySnackbarComponent } from './cy-snackbar.component';

describe('CySnackbarComponent', () => {
  let component: CySnackbarComponent;
  let fixture: ComponentFixture<CySnackbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CySnackbarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CySnackbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
