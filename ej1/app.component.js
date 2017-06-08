"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var moment = require('moment');
var AppComponent = (function () {
    function AppComponent() {
        this.dt = new Date();
        this.minDate = null;
        this.formats = ['DD-MM-YYYY', 'YYYY/MM/DD', 'DD.MM.YYYY', 'shortDate'];
        this.format = this.formats[0];
        this.dateOptions = {
            formatYear: 'YY',
            startingDay: 1
        };
        this.opened = false;
        this.name = 'Jesse';
        this.ranNum = 3;
    }
    AppComponent.prototype.ngOnInit = function () {
        moment.locale('es');
    };
    AppComponent.prototype.getDate = function () {
        return this.dt && this.dt.getTime() || new Date().getTime();
    };
    AppComponent.prototype.onClick = function (event) {
        this.ranNum = Math.random() * 10;
    };
    AppComponent = __decorate([
        core_1.Component({
            selector: 'my-app',
            template: "\n        <alert type=\"info\">ngx-bootstrap hello world!</alert>\n        <pre>Selected date is: <em *ngIf=\"dt\">{{ getDate() | date:'fullDate'}}</em></pre>\n        <h4>JoJoJo</h4>\n        <div style=\"display:inline-block;\">\n        <input type=\"text\">\n            <div style=\"min-height:290px;\">\n                <datepicker [(ngModel)]=\"dt\" [minDate]=\"minDate\" [showWeeks]=\"false\" [startingDay]=\"1\"></datepicker>\n            </div>\n        </div>\n    <h1>\n        Hola mundo1!\n    </h1>\n    <button (click)=\"onClick()\">Numero aleatorio</button>\n    <input #username [value]=\"name\" (keyup)=\"onChange()\">\n    {{ranNum}}  \n    <br />\n    {{username.value}}\n    <br />\n    {{username.value}}\n    <hr />\n    \n  ",
        }), 
        __metadata('design:paramtypes', [])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map