import { NgModule }      from '@angular/core';
import { RouterModule }  from '@angular/router'
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { HttpModule, JsonpModule }    from '@angular/http';

import { DefaultRequestOptions, requestOptionsProvider } from './default-request-options.service';
import { AppComponent }  from './app.component';
import { CollapseComponent } from './collapse.component';
import {SortPipe} from './sort.pipe'

@NgModule({
    imports: [BrowserModule, RouterModule, FormsModule, HttpModule, JsonpModule],
    declarations: [AppComponent, CollapseComponent, SortPipe],
    providers: [requestOptionsProvider, SortPipe],
    bootstrap: [AppComponent ]
})
export class AppModule { }
