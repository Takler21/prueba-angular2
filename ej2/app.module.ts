import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { DatepickerModule, AlertModule } from 'ng2-bootstrap';

import { AppComponent } from './app.component';
import { App2Component } from './app2.component';
import { MyInputComponent } from './input.component';
import { CityComponent } from './input.component';
import { ZippyComponent } from './my-zippy.component';

@NgModule({
    declarations: [AppComponent, MyInputComponent, CityComponent, ZippyComponent],
  imports: [
    BrowserModule,
    FormsModule,
    AlertModule.forRoot(),
    DatepickerModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule {
}