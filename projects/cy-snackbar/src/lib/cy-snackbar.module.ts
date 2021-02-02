import { NgModule } from '@angular/core';
import { CySnackbarComponent } from './cy-snackbar.component';
import { CySnackbar } from './cy-snackbar.service';

@NgModule({
  declarations: [CySnackbarComponent],
  imports: [],
  exports: [CySnackbarComponent],
  providers: [CySnackbar],
})
export class CySnackbarModule {}
