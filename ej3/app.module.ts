import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { MyInputComponent } from './app.component';
import { FriendComponent } from './app.component';
import { PerService } from './per.service';

import { ZippyComponent } from './my-zippy.component';

@NgModule({
    imports: [BrowserModule, FormsModule, HttpModule],
    providers: [PerService],
    declarations: [AppComponent, ZippyComponent, MyInputComponent, FriendComponent],
    bootstrap: [AppComponent]
})
export class AppModule { }

