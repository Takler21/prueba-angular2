import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'my-app',
  template: `
        <alert type="info">ngx-bootstrap hello world!</alert>
        <pre>Selected date is: <em *ngIf="dt">{{ getDate() | date:'fullDate'}}</em></pre>
        <h4>JoJoJo</h4>
        <div style="display:inline-block;">
        <input type="text">
            <div style="min-height:290px;">
                <datepicker [(ngModel)]="dt" [minDate]="minDate" [showWeeks]="false" [startingDay]="1"></datepicker>
            </div>
        </div>
    <h1>
        Hola mundo1!
    </h1>
    <button (click)="onClick()">Numero aleatorio</button>
    <input #username [value]="name" (keyup)="onChange()">
    {{ranNum}}  
    <br />
    {{username.value}}
    <br />
    {{username.value}}
    <hr />
    
  `,
})
export class AppComponent implements OnInit {
  public dt:Date = new Date();
  private minDate:Date = null;
  private events:Array<any>;
  private tomorrow:Date;
  private afterTomorrow:Date;
  private formats:Array<string> = ['DD-MM-YYYY', 'YYYY/MM/DD', 'DD.MM.YYYY', 'shortDate'];
  private format = this.formats[0];

  private dateOptions:any = {
    formatYear: 'YY',
    startingDay: 1
  };

  ngOnInit() {
      moment.locale('es');
  }

  private opened:boolean = false;

  public getDate():number {
      return this.dt && this.dt.getTime() || new Date().getTime();
      
  }
  name = 'Jesse';
  ranNum = 3;

  onClick(event: any) {
      this.ranNum = Math.random() * 10;
  } 
}

