import { ElementRef, Injectable } from '@angular/core';
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

  /**
   * Style Variables
   */
  // Transitions
  private transitionTime: number = 200;

  // Dimentions
  private width: number = 250;
  private minHeight: number = 50;

  // Positions
  private top: number = 20;
  private left: number = 20;
  private right: number = 20;
  private bottom: number = 20;
  private topHidden: number = -90;
  private leftHidden: number = -400;
  private rightHidden: number = -400;
  private bottomHidden: number = -90;

  // Font Styles
  private fontSize: number = 16;
  private fontColor: string = '#fff';

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
    var snackbarElement = document.createElement('div');

    // Apply Message status color
    snackbarElement = this.applyMessageStatusColor(
      snackbarElement,
      snackbarArgs.options.status
    );

    const snackbarStyles = snackbarElement.style;
    snackbarStyles.width = `${this.width}px`;
    snackbarStyles.minHeight = `${this.minHeight}px`;
    snackbarStyles.position = 'absolute';
    snackbarStyles.display = 'flex';
    snackbarStyles.alignItems = 'center';
    snackbarStyles.transition = `${this.transitionTime}ms all ease-out`;
    snackbarStyles.boxShadow = '0px 0px 15px 0px #00000044';
    snackbarStyles.borderRadius = '5px';

    // Message Generation
    const messageElement = document.createElement('p');
    const messageStyles = messageElement.style;
    messageStyles.fontSize = `${this.fontSize}px`;
    messageStyles.color = this.fontColor;
    messageStyles.margin = '0px 15px';
    messageStyles.padding = '0px';
    messageElement.innerHTML = snackbarArgs.message;

    // Call the display method
    switch (snackbarArgs.options.position) {
      case 'top-right':
        this.showSnackBarTopRight(
          snackbarArgs,
          snackbarElement,
          messageElement
        );
        break;
      case 'top-left':
        this.showSnackBarTopLeft(snackbarArgs, snackbarElement, messageElement);
        break;
      case 'top-center':
        this.showSnackBarTopCenter(
          snackbarArgs,
          snackbarElement,
          messageElement
        );
        break;
      case 'bottom-right':
        this.showSnackBarBottomRight(
          snackbarArgs,
          snackbarElement,
          messageElement
        );
        break;
      case 'bottom-left':
        this.showSnackBarBottomLeft(
          snackbarArgs,
          snackbarElement,
          messageElement
        );
        break;
      case 'bottom-center':
        this.showSnackBarBottomCenter(
          snackbarArgs,
          snackbarElement,
          messageElement
        );
        break;
      case 'center':
        this.showSnackBarCenter(snackbarArgs, snackbarElement, messageElement);
        break;

      default:
        this.showSnackBarTopRight(
          snackbarArgs,
          snackbarElement,
          messageElement
        );
        break;
    }
  }

  // Apply message status color
  private applyMessageStatusColor(snackBarWrapper: any, messageStatus: string) {
    var messageColor;

    switch (messageStatus) {
      case 'success':
        messageColor = '#0ddb0d';
        this.fontColor = '#fff';
        break;

      case 'failed':
        messageColor = '#eb4034';
        this.fontColor = '#fff';
        break;

      case 'warning':
        messageColor = '#d7de16';
        this.fontColor = '#000';
        break;

      default:
        messageColor = '#dedede';
        this.fontColor = '#000';
        break;
    }

    snackBarWrapper.style.backgroundColor = messageColor;
    return snackBarWrapper;
  }

  // POSITION: Top Right
  private showSnackBarTopRight(
    args: SnackBarArgs,
    snackbarWrapper: any,
    snackBarMessage: any
  ) {
    // Instance of the styles
    const snackbarStyles = snackbarWrapper.style;
    const messageStyles = snackBarMessage.style;

    // Set the position
    snackbarStyles.top = `${this.top}px`;
    snackbarStyles.right = `${this.rightHidden}px`;

    // Add the message to the wrapper
    snackbarWrapper.appendChild(snackBarMessage);

    document.body.appendChild(snackbarWrapper);

    // Show the snackbar
    setTimeout(() => {
      snackbarStyles.right = `${this.right}px`;

      setTimeout(() => {
        snackbarStyles.right = `${this.rightHidden}px`;
      }, args.options.duration * 1000);

      setTimeout(() => {
        document.body.removeChild(snackbarWrapper);
      }, args.options.duration * 1000 + this.transitionTime + 100);
    }, 100);
  }

  // POSITION: Top Left
  private showSnackBarTopLeft(
    args: SnackBarArgs,
    snackbarWrapper: any,
    snackBarMessage: any
  ) {
    // Instance of the styles
    const snackbarStyles = snackbarWrapper.style;
    const messageStyles = snackBarMessage.style;

    // Set the position
    snackbarStyles.top = `${this.top}px`;
    snackbarStyles.left = `${this.leftHidden}px`;

    // Add the message to the wrapper
    snackbarWrapper.appendChild(snackBarMessage);

    document.body.appendChild(snackbarWrapper);

    // Show the snackbar
    setTimeout(() => {
      snackbarStyles.left = `${this.left}px`;

      setTimeout(() => {
        snackbarStyles.left = `${this.leftHidden}px`;
      }, args.options.duration * 1000);

      setTimeout(() => {
        document.body.removeChild(snackbarWrapper);
      }, args.options.duration * 1000 + this.transitionTime + 100);
    }, 100);
  }

  // POSITION: Top Center
  private showSnackBarTopCenter(
    args: SnackBarArgs,
    snackbarWrapper: any,
    snackBarMessage: any
  ) {
    // Instance of the styles
    const snackbarStyles = snackbarWrapper.style;
    const messageStyles = snackBarMessage.style;

    // Set the position
    snackbarStyles.top = `${this.topHidden}px`;
    snackbarStyles.left = '50%';
    snackbarStyles.transform = 'translateX(-50%)';

    // Add the message to the wrapper
    snackbarWrapper.appendChild(snackBarMessage);

    document.body.appendChild(snackbarWrapper);

    // Show the snackbar
    setTimeout(() => {
      snackbarStyles.top = `${this.top}px`;

      setTimeout(() => {
        snackbarStyles.top = `${this.topHidden}px`;
      }, args.options.duration * 1000);

      setTimeout(() => {
        document.body.removeChild(snackbarWrapper);
      }, args.options.duration * 1000 + this.transitionTime + 100);
    }, 100);
  }

  // POSITION: Bottom Center
  private showSnackBarBottomCenter(
    args: SnackBarArgs,
    snackbarWrapper: any,
    snackBarMessage: any
  ) {
    // Instance of the styles
    const snackbarStyles = snackbarWrapper.style;
    const messageStyles = snackBarMessage.style;

    // Set the position
    snackbarStyles.bottom = `${this.bottomHidden}px`;
    snackbarStyles.left = '50%';
    snackbarStyles.transform = 'translateX(-50%)';

    // Add the message to the wrapper
    snackbarWrapper.appendChild(snackBarMessage);

    document.body.appendChild(snackbarWrapper);

    // Show the snackbar
    setTimeout(() => {
      snackbarStyles.bottom = `${this.bottom}px`;

      setTimeout(() => {
        snackbarStyles.bottom = `${this.bottomHidden}px`;
      }, args.options.duration * 1000);

      setTimeout(() => {
        document.body.removeChild(snackbarWrapper);
      }, args.options.duration * 1000 + this.transitionTime + 100);
    }, 100);
  }

  // POSITION: Bottom Right
  private showSnackBarBottomRight(
    args: SnackBarArgs,
    snackbarWrapper: any,
    snackBarMessage: any
  ) {
    // Instance of the styles
    const snackbarStyles = snackbarWrapper.style;
    const messageStyles = snackBarMessage.style;

    // Set the position
    snackbarStyles.bottom = `${this.bottom}px`;
    snackbarStyles.right = `${this.rightHidden}px`;

    // Add the message to the wrapper
    snackbarWrapper.appendChild(snackBarMessage);

    document.body.appendChild(snackbarWrapper);

    // Show the snackbar
    setTimeout(() => {
      snackbarStyles.right = `${this.right}px`;

      setTimeout(() => {
        snackbarStyles.right = `${this.rightHidden}px`;
      }, args.options.duration * 1000);

      setTimeout(() => {
        document.body.removeChild(snackbarWrapper);
      }, args.options.duration * 1000 + this.transitionTime + 100);
    }, 100);
  }

  // POSITION: Bottom Left
  private showSnackBarBottomLeft(
    args: SnackBarArgs,
    snackbarWrapper: any,
    snackBarMessage: any
  ) {
    // Instance of the styles
    const snackbarStyles = snackbarWrapper.style;
    const messageStyles = snackBarMessage.style;

    // Set the position
    snackbarStyles.bottom = `${this.bottom}px`;
    snackbarStyles.left = `${this.leftHidden}px`;

    // Add the message to the wrapper
    snackbarWrapper.appendChild(snackBarMessage);

    document.body.appendChild(snackbarWrapper);

    // Show the snackbar
    setTimeout(() => {
      snackbarStyles.left = `${this.left}px`;

      setTimeout(() => {
        snackbarStyles.left = `${this.leftHidden}px`;
      }, args.options.duration * 1000);

      setTimeout(() => {
        document.body.removeChild(snackbarWrapper);
      }, args.options.duration * 1000 + this.transitionTime + 100);
    }, 100);
  }

  // POSITION: Center
  private showSnackBarCenter(
    args: SnackBarArgs,
    snackbarWrapper: any,
    snackBarMessage: any
  ) {
    // Instance of the styles
    const snackbarStyles = snackbarWrapper.style;
    const messageStyles = snackBarMessage.style;

    // Set the position
    snackbarStyles.top = '50%';
    snackbarStyles.left = '50%';

    snackbarStyles.transform =
      'translateX(-50%) translateY(-50%) scale3d(0, 0, 0)';

    // Add the message to the wrapper
    snackbarWrapper.appendChild(snackBarMessage);

    document.body.appendChild(snackbarWrapper);

    // Show the snackbar
    setTimeout(() => {
      snackbarStyles.transform =
        'translateX(-50%) translateY(-50%) scale3d(1, 1, 1)';

      setTimeout(() => {
        snackbarStyles.transform =
          'translateX(-50%) translateY(-50%) scale3d(0, 0, 0)';
      }, args.options.duration * 1000);

      setTimeout(() => {
        document.body.removeChild(snackbarWrapper);
      }, args.options.duration * 1000 + this.transitionTime + 100);
    }, 100);
  }
}
