import { Component, OnInit, Input, OnChanges, Output, EventEmitter } from '@angular/core';
import * as moment from 'moment';

@Component({
    selector: 'date-p',
    template: `
          
                <datepicker style="display:inline-block; min-height:290px;" [(ngModel)]="dt" [minDate]="minDate" [showWeeks]="false" [startingDay]="1"></datepicker>

  `,
})
export class DateComponent implements OnInit, OnChanges {
    @Input() dat: any;
    public dt: Date = new Date();
    private minDate: Date = null;
    private events: Array<any>;
    private tomorrow: Date;
    private afterTomorrow: Date;
    private formats: Array<string> = ['DD-MM-YYYY', 'YYYY/MM/DD', 'DD.MM.YYYY', 'shortDate'];
    private format = this.formats[0];
    @Output() mandar = new EventEmitter()
    man: any;

    private dateOptions: any = {
        formatYear: 'YY',
        startingDay: 1
    };

    ngOnInit() {
        if(this.dat)
        this.dt.setDate(this.dat);
    }

    ngOnChanges() {
        
        this.man = String(this.dt.getFullYear() + "-" + this.dt.getMonth() + "-" + this.dt.getDate());
        this.mandar.emit(this.man);
    }

    private opened: boolean = false;

    public getDate(): number {
        return this.dt && this.dt.getTime() || new Date().getTime();

    }
}

