import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import {
  AfterContentChecked,
  Component,
  ElementRef,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import * as EventEmitter from 'events';

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

@Component({
  selector: 'cy-snackbar',
  template: `
    <div #snackbarC class="c-wrapper center">
      <p>{{ message }}</p>
    </div>
    <div #snackbarTR class="c-wrapper top-right">
      <p>{{ message }}</p>
    </div>
    <div #snackbarTL class="c-wrapper top-left">
      <p>{{ message }}</p>
    </div>
    <div #snackbarTC class="c-wrapper top-center">
      <p>{{ message }}</p>
    </div>
    <div #snackbarBR class="c-wrapper bottom-right">
      <p>{{ message }}</p>
    </div>
    <div #snackbarBC class="c-wrapper bottom-center">
      <p>{{ message }}</p>
    </div>
    <div #snackbarBL class="c-wrapper bottom-left">
      <p>{{ message }}</p>
    </div>
  `,
  styles: ['cy-snackbar.component.css'],
})
export class CySnackbar implements OnInit, AfterContentChecked {
  /**
   * To Get the message of the snack-bar
   * @property
   */
  @Input() message: string = 'Hello Buddy';

  /**
   * To Get the options of snack-bar message
   * @property
   */
  @Input() options: CySnackBarOptions = {
    duration: 5,
    position: 'top-right',
    status: '',
  };

  /**
   * To Get the show status of snack-bar message
   * @property
   */
  @Input() isShowing: boolean = false;

  /**
   * To Notify when the snack-bar starts to show
   * @event
   */
  @Output() snackbarInit = new EventEmitter();

  /**
   * To Notify when the snack-bar ends to show
   * @event
   */
  @Output() snackbarDestroy = new EventEmitter();

  /**
   * To Callback event to show snack bar
   * @event
   */
  @Output() showSnackBar = new EventEmitter();

  /**
   * @variables
   */
  @ViewChild('snackbarC', { static: true })
  snackBarCenter: ElementRef<HTMLElement>;
  @ViewChild('snackbarTR', { static: true })
  snackBarTopRight: ElementRef<HTMLElement>;
  @ViewChild('snackbarTL', { static: true })
  snackBarTopLeft: ElementRef<HTMLElement>;
  @ViewChild('snackbarTC', { static: true })
  snackBarTopCenter: ElementRef<HTMLElement>;
  @ViewChild('snackbarBR', { static: true })
  snackBarBottomRight: ElementRef<HTMLElement>;
  @ViewChild('snackbarBC', { static: true })
  snackBarBottomCenter: ElementRef<HTMLElement>;
  @ViewChild('snackbarBL', { static: true })
  snackBarBottomLeft: ElementRef<HTMLElement>;
  private className: string;
  private colorClassNames: Array<string> = ['red', 'green', 'grey', 'yellow'];
  private positionClassNames: Array<string> = [
    'top-right',
    'top-left',
    'top-center',
    'center',
    'bottom-right',
    'bottom-left',
    'bottom-center',
  ];

  private activeSnackBar: ElementRef<HTMLElement>;

  constructor() {}

  ngOnInit() {
    // // Assign the position
    // this.assignPosition(this.options.position);
    // // Get the message status color class
    // this.className = this.getMessageStatusColor(this.options.status);
    // // Assign the background color class
    // this.assignBackgroundColorClass(this.className);

    this.changeDisplayPropertyofSnackBar();
  }

  ngAfterContentChecked() {
    console.log('Status Changed as ' + this.isShowing);
    if (this.isShowing) {
      // Assign the position
      this.assignPosition(this.options.position);

      // Check if custom background color is given
      if (this.options.bgColor) {
        this.assignBackgroundColor(this.options.bgColor);
      } else {
        // Get the message status color class
        this.className = this.getMessageStatusColor(this.options.status);

        // Assign the background color class
        this.assignBackgroundColorClass(this.className);
      }

      // Display the snackbar
      this.displaySnackBar(this.options.duration);
    }
  }

  // Change the display property
  changeDisplayPropertyofSnackBar() {
    this.snackBarBottomCenter.nativeElement.style.display = 'none';
    this.snackBarBottomLeft.nativeElement.style.display = 'none';
    this.snackBarBottomRight.nativeElement.style.display = 'none';
    this.snackBarCenter.nativeElement.style.display = 'none';
    this.snackBarTopCenter.nativeElement.style.display = 'none';
    this.snackBarTopLeft.nativeElement.style.display = 'none';
    this.snackBarTopRight.nativeElement.style.display = 'none';
  }

  // To find the message status color
  private getMessageStatusColor(status: string) {
    var messageColor;

    switch (status) {
      case 'success':
        messageColor = 'green';
        break;

      case 'failed':
        messageColor = 'red';
        break;

      case 'warning':
        messageColor = 'yellow';
        break;

      default:
        messageColor = 'grey';
        break;
    }

    return messageColor;
  }

  // To assign the background color class to the snackbar
  private assignBackgroundColorClass(className: string) {
    // Remove the background color property
    this.activeSnackBar.nativeElement.style.backgroundColor = '';

    this.activeSnackBar.nativeElement.classList.forEach((element) => {
      if (this.colorClassNames.includes(element)) {
        this.activeSnackBar.nativeElement.classList.remove(element);
      }
    });

    this.activeSnackBar.nativeElement.classList.add(className);
  }

  // To assign the position of the snack-bar
  private assignPosition(positionClass: string) {
    if (positionClass.trim() == '') {
      if (window.screen.width <= 670) {
        this.activeSnackBar = this.snackBarBottomCenter;
      } else {
        this.activeSnackBar = this.snackBarTopRight;
      }
    } else {
      switch (positionClass) {
        case 'top-center':
          this.activeSnackBar = this.snackBarTopCenter;
          break;
        case 'top-left':
          this.activeSnackBar = this.snackBarTopLeft;
          break;
        case 'top-right':
          this.activeSnackBar = this.snackBarTopRight;
          break;
        case 'center':
          this.activeSnackBar = this.snackBarCenter;
          break;
        case 'bottom-right':
          this.activeSnackBar = this.snackBarBottomRight;
          break;
        case 'bottom-left':
          this.activeSnackBar = this.snackBarBottomLeft;
          break;
        case 'bottom-center':
          this.activeSnackBar = this.snackBarBottomCenter;
          break;
        default:
          this.activeSnackBar = this.snackBarTopRight;
          break;
      }
    }
  }

  // To assign the background color to the snackbar
  private assignBackgroundColor(color: string) {
    this.activeSnackBar.nativeElement.style.backgroundColor = color;
  }

  // Show the snackbar
  private displaySnackBar(duration: number) {
    this.activeSnackBar.nativeElement.style.display = 'block';
    setTimeout(() => {
      this.activeSnackBar.nativeElement.classList.add('active');
      setTimeout(() => {
        this.activeSnackBar.nativeElement.classList.remove('active');
        this.isShowing = false;
        setTimeout(() => {
          this.activeSnackBar.nativeElement.style.display = 'none';
        }, 300);
      }, duration * 1000);
    }, 100);
  }
}
