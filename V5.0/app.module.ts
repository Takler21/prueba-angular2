import { NgModule }      from '@angular/core';
import { RouterModule }  from '@angular/router'
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { HttpModule, JsonpModule }    from '@angular/http';

import { AppComponent }  from './app.component';
import { CollapseComponent } from './collapse.component';
import {FormReq} from './formR.component';
import {FormNoReq} from './formNoR.component';
import {SortPipe} from './sort.pipe'

@NgModule({
    imports: [BrowserModule, RouterModule, FormsModule, HttpModule, JsonpModule],
    declarations: [AppComponent, CollapseComponent, SortPipe, FormReq, FormNoReq],
    providers: [SortPipe],
    bootstrap: [AppComponent ]
})
export class AppModule { }
