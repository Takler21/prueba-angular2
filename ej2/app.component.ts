import { Component } from '@angular/core';

@Component({
  selector: 'my-app',
  template: `
    <alert type="info">ng2-bootstrap hello world!</alert>
      <pre>Selected date is: <em *ngIf="dt">{{ getDate() | date:'fullDate'}}</em></pre>
      <h4>JoJoJo</h4>
      <div style="display:inline-block; min-height:290px;">
        <datepicker [(ngModel)]="dt" [minDate]="minDate" [showWeeks]="true"></datepicker>
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

    <hr />
    
  `,
})
export class AppComponent {
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
  private opened:boolean = false;

  public getDate():number {
      return this.dt && this.dt.getTime() || new Date().getTime();
      
  }
  name = 'Jesse';
  ranNum = 3;


}

