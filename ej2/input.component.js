"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
var core_1 = require("@angular/core");
var CityComponent = (function () {
    function CityComponent() {
        this.cityChange = new core_1.EventEmitter();
    }
    CityComponent.prototype.onChange = function (city) {
        this.cityChange.emit(city);
    };
    return CityComponent;
}());
__decorate([
    core_1.Input()
], CityComponent.prototype, "city");
__decorate([
    core_1.Output()
], CityComponent.prototype, "cityChange");
CityComponent = __decorate([
    core_1.Component({
        selector: 'city-dropdown',
        template: "\n        <select (change)=\"onChange($event.target.value)\" [value]=\"city\">\n            <option value=\"\"></option>\n            <option value=\"Ankarsrum\">Ankarsrum</option>\n            <option value=\"V\u00E4stervik\">V\u00E4stervik</option>\n            <option value=\"Stockholm\">Stockholm</option>\n        </select>\n        \n    "
    })
], CityComponent);
exports.CityComponent = CityComponent;
var MyInputComponent = (function () {
    function MyInputComponent() {
        this.username = 'Jesse';
        this.city = 'Stockholm';
    }
    return MyInputComponent;
}());
MyInputComponent = __decorate([
    core_1.Component({
        selector: 'my-input',
        template: "\n        <input [(ngModel)]=\"username\"> \n        <city-dropdown [city]=\"city\" (cityChange)=\"city = $event\"></city-dropdown>\n        <!--\n            Same as above:\n            <city-dropdown [(city)]=\"city\"></city-dropdown>\n        -->\n        <br />\n        \n        Username: {{username}}\n        <br />\n        City: {{city}}\n        \n    "
    })
], MyInputComponent);
exports.MyInputComponent = MyInputComponent;
