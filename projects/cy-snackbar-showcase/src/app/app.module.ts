import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';

import { CySnackbarModule } from '../../../cy-snackbar/src/lib/cy-snackbar.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, CySnackbarModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
