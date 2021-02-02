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
    var snackbarElement = document.createElement('div');

    // Apply Message status color
    snackbarElement = this.applyMessageStatusColor(
      snackbarElement,
      snackbarArgs.options.status
    );

    const snackbarStyles = snackbarElement.style;
    snackbarStyles.width = '400px';
    snackbarStyles.minHeight = '80px';
    snackbarStyles.position = 'absolute';
    snackbarStyles.display = 'flex';
    snackbarStyles.alignItems = 'center';
    snackbarStyles.transition = `${this.transitionTime}ms all ease-out`;
    snackbarStyles.boxShadow = '0px 0px 15px 0px #00000070';
    snackbarStyles.borderRadius = '5px';

    // Message Generation
    const messageElement = document.createElement('p');
    const messageStyles = messageElement.style;
    messageStyles.fontSize = '24px';
    messageStyles.color = '#fff';
    messageStyles.margin = '0px 15px';
    messageStyles.padding = '0px';
    messageElement.innerHTML = snackbarArgs.message;

    // this.showSnackBarTopLeft(snackbarArgs, snackbarElement, messageElement);

    // this.showSnackBarTopCenter(snackbarArgs, snackbarElement, messageElement);
    // this.showSnackBarBottomCenter(snackbarArgs, snackbarElement, messageElement);
    // this.showSnackBarBottomLeft(snackbarArgs, snackbarElement, messageElement);
    // this.showSnackBarBottomRight(snackbarArgs, snackbarElement, messageElement);
    // this.showSnackBarCenter(snackbarArgs, snackbarElement, messageElement);

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
        messageColor = '#0f0';
        break;

      case 'failed':
        messageColor = '#f00';
        break;

      case 'warning':
        messageColor = '#ff0';
        break;

      default:
        messageColor = '#f2f2f2';
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
    snackbarStyles.top = '10px';
    snackbarStyles.right = '-400px';

    // Add the message to the wrapper
    snackbarWrapper.appendChild(snackBarMessage);

    document.body.appendChild(snackbarWrapper);

    // Show the snackbar
    setTimeout(() => {
      snackbarStyles.right = '10px';

      setTimeout(() => {
        snackbarStyles.right = '-500px';
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
    snackbarStyles.top = '10px';
    snackbarStyles.left = '-400px';

    // Add the message to the wrapper
    snackbarWrapper.appendChild(snackBarMessage);

    document.body.appendChild(snackbarWrapper);

    // Show the snackbar
    setTimeout(() => {
      snackbarStyles.left = '10px';

      setTimeout(() => {
        snackbarStyles.left = '-500px';
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
    snackbarStyles.top = '-90px';
    snackbarStyles.left = '50%';
    snackbarStyles.transform = 'translateX(-50%)';

    // Add the message to the wrapper
    snackbarWrapper.appendChild(snackBarMessage);

    document.body.appendChild(snackbarWrapper);

    // Show the snackbar
    setTimeout(() => {
      snackbarStyles.top = '15px';

      setTimeout(() => {
        snackbarStyles.top = '-90px';
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
    snackbarStyles.bottom = '-90px';
    snackbarStyles.left = '50%';
    snackbarStyles.transform = 'translateX(-50%)';

    // Add the message to the wrapper
    snackbarWrapper.appendChild(snackBarMessage);

    document.body.appendChild(snackbarWrapper);

    // Show the snackbar
    setTimeout(() => {
      snackbarStyles.bottom = '15px';

      setTimeout(() => {
        snackbarStyles.bottom = '-90px';
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
    snackbarStyles.bottom = '10px';
    snackbarStyles.right = '-400px';

    // Add the message to the wrapper
    snackbarWrapper.appendChild(snackBarMessage);

    document.body.appendChild(snackbarWrapper);

    // Show the snackbar
    setTimeout(() => {
      snackbarStyles.right = '10px';

      setTimeout(() => {
        snackbarStyles.right = '-500px';
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
    snackbarStyles.bottom = '10px';
    snackbarStyles.left = '-400px';

    // Add the message to the wrapper
    snackbarWrapper.appendChild(snackBarMessage);

    document.body.appendChild(snackbarWrapper);

    // Show the snackbar
    setTimeout(() => {
      snackbarStyles.left = '10px';

      setTimeout(() => {
        snackbarStyles.left = '-500px';
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
