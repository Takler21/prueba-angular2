"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
var core_1 = require("@angular/core");
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
    AppComponent.prototype.getDate = function () {
        return this.dt && this.dt.getTime() || new Date().getTime();
    };
    return AppComponent;
}());
AppComponent = __decorate([
    core_1.Component({
        selector: 'my-app',
        template: "\n    <alert type=\"info\">ng2-bootstrap hello world!</alert>\n      <pre>Selected date is: <em *ngIf=\"dt\">{{ getDate() | date:'fullDate'}}</em></pre>\n      <h4>JoJoJo</h4>\n      <div style=\"display:inline-block; min-height:290px;\">\n        <datepicker [(ngModel)]=\"dt\" [minDate]=\"minDate\" [showWeeks]=\"true\"></datepicker>\n      </div>\n    <h1>\n        Hola mundo1!\n    </h1>\n    <button (click)=\"onClick()\">Numero aleatorio</button>\n    <input #username [value]=\"name\" (keyup)=\"onChange()\">\n    {{ranNum}}  \n    <br />\n    {{username.value}}\n    <br />\n    {{username.value}}\n    <hr />\n\n    <hr />\n    \n  "
    })
], AppComponent);
exports.AppComponent = AppComponent;
