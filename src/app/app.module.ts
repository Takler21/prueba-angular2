import { NgModule }      from '@angular/core';
import { RouterModule }  from '@angular/router'
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms'
import { HttpModule, JsonpModule }    from '@angular/http'
import {} from ''

import { AppComponent }  from './app.component';

@NgModule({
    imports: [BrowserModule, RouterModule, FormsModule, HttpModule, JsonpModule],
    declarations: [AppComponent],
    bootstrap: [AppComponent ]
})
export class AppModule { }
