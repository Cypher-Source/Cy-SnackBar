import { ViewChild } from '@angular/core';
import { Component } from '@angular/core';
import {
  CySnackBarOptions,
  CySnackbar,
} from 'projects/cy-snackbar/src/public-api';
interface CySnackBarArgs {
  message: string;
  duration: number;
  status: string;
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'cy-snackbar-showcase';

  // Snackbar Instance
  @ViewChild('snackbar')
  snackBar: CySnackbar;

  // Inputs
  inputs: CySnackBarArgs = {
    duration: 0,
    message: '',
    status: 'success',
  };

  // Snack Bar Options
  options: CySnackBarOptions = {
    duration: 4,
    status: '',
    position: 'top-left',
  };

  constructor() {}

  ngOnInit(): void {}

  showSnackBar(position: string) {
    // Assign the params
    this.options.duration = this.inputs.duration;
    this.options.status = this.inputs.status;
    this.options.position = position;

    // Display the snack bar
    this.snackBar.isShowing = true;
  }
}
