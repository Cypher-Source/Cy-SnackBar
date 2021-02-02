import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CySnackbar } from './cy-snackbar.service';

@Component({
  selector: 'cy-snackbar',
  template: ``,
  styles: [],
})
export class CySnackbarComponent implements OnInit {
  constructor(private snackbarService: CySnackbar) {}

  ngOnInit() {
    
  }
}
