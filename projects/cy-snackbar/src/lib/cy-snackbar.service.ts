import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface CySnackBarOptions {
  position: string;
  duration: number;
  status: string;
  bgColor?: string;
}

export interface SnackBarArgs {
  options: CySnackBarOptions;
  message: string;
}

@Injectable({
  providedIn: 'root',
})
export class CySnackbar {
  private _snackbar = new BehaviorSubject({
    message: '',
    options: {
      position: '',
      duration: 0,
      status: '',
    },
  });

  private transitionTime: number = 200;

  public readonly snackbar: Observable<SnackBarArgs> = this._snackbar.asObservable();

  constructor() {}

  // Display the Snackbar
  show(message: string, options: CySnackBarOptions) {
    // Construct the snackbar args
    const snackbarArgs: SnackBarArgs = {
      message: message,
      options: options,
    };

    // Snack Bar Generation
    const snackbarElement = document.createElement('div');
    const snackbarStyles = snackbarElement.style;
    snackbarStyles.width = '400px';
    snackbarStyles.minHeight = "80px"
    snackbarStyles.position = 'absolute';
    snackbarStyles.top = '10px';
    snackbarStyles.left = '-400px';
    snackbarStyles.display = "flex";
    snackbarStyles.alignItems = "center"
    snackbarStyles.backgroundColor = 'rgb(230, 0, 0)';
    snackbarStyles.transition = `${this.transitionTime}ms all ease-out`;
    snackbarStyles.boxShadow = "0px 0px 15px 0px #00000070";
    snackbarStyles.borderRadius = "5px";

    // Message Generation
    const messageElement = document.createElement("p");
    const messageStyles = messageElement.style;
    messageStyles.fontSize = "24px";
    messageStyles.color = "#fff";
    messageStyles.margin = "0px 15px";
    messageStyles.padding = "0px";
    messageElement.innerHTML = "Demo Snackbar"
    snackbarElement.appendChild(messageElement);

    document.body.appendChild(snackbarElement);
    setTimeout(() => {
      snackbarStyles.left = '10px';

      setTimeout(() => {
        snackbarStyles.left = '-500px';
      }, 4000);

      setTimeout(() => {
        document.body.removeChild(snackbarElement);
      }, 4000+this.transitionTime+100);

    }, 100);
  }
}
