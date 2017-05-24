import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { DatepickerModule, AlertModule } from 'ng2-bootstrap';

import { AppComponent } from './app.component';
import { MyInputComponent } from './input.component';
import { CityComponent } from './input.component';

@NgModule({
    declarations: [AppComponent, MyInputComponent, CityComponent],
  imports: [
    BrowserModule,
    FormsModule,
    AlertModule.forRoot(),
    DatepickerModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent, MyInputComponent]
})

export class AppModule {
}