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
  selector: 'lib-cy-snackbar',
  template: `
    <div #snackbar class="c-wrapper">
      <p>{{ message }}</p>
    </div>

    <button (click)="show()">Show Snack</button>
  `,
  styles: ['./cy-snackbar.component.css'],
})
export class CySnackbarComponent implements OnInit {
  /**
   * To Get the message of the snack-bar
   * @property
   */
  @Input() message: string = '';

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
  @ViewChild('snackbar', { static: true }) snackBar: ElementRef<HTMLElement>;
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

  constructor() {}

  ngOnInit() {
    // Get the message status color class
    this.className = this.getMessageStatusColor(this.options.status);

    // Assign the background color class
    this.assignBackgroundColor(this.className);

    // Assign the position
    this.assignPosition(this.options.position);
  }

  ngAfterContentChecked() {
    console.log('Status Changed as ' + this.isShowing);
    if (this.isShowing) {
      // Check if custom background color is given
      if (this.options.bgColor) {
        this.assignBackgroundColor(this.options.bgColor);
      } else {
        // Get the message status color class
        this.className = this.getMessageStatusColor(this.options.status);

        // Assign the background color class
        this.assignBackgroundColorClass(this.className);
      }

      // Assign the position
      this.assignPosition(this.options.position);

      // Display the snackbar
      this.displaySnackBar(this.options.duration);
    }
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
    this.snackBar.nativeElement.classList.forEach((element) => {
      if (this.colorClassNames.includes(element)) {
        this.snackBar.nativeElement.classList.remove(element);
      }
    });

    this.snackBar.nativeElement.classList.add(className);
  }

  // To assign the position of the snack-bar
  private assignPosition(positionClass: string) {
    this.snackBar.nativeElement.classList.forEach((element) => {
      if (this.positionClassNames.includes(element)) {
        this.snackBar.nativeElement.classList.remove(element);
      }
    });

    if (positionClass.trim() == '') {
      if (window.screen.width <= 670) {
        this.snackBar.nativeElement.classList.add('bottom-center');
      } else {
        this.snackBar.nativeElement.classList.add('top-right');
      }
    } else {
      this.snackBar.nativeElement.classList.add(positionClass);
    }
  }

  // To assign the background color to the snackbar
  private assignBackgroundColor(color: string) {
    this.snackBar.nativeElement.style.backgroundColor = color;
  }

  // Show the snackbar
  private displaySnackBar(duration: number) {
    this.snackBar.nativeElement.classList.add('active');
    setTimeout(() => {
      this.snackBar.nativeElement.classList.remove('active');
      this.isShowing = false;
    }, duration * 1000);
  }

  show() {
    this.isShowing = true;
  }
}
