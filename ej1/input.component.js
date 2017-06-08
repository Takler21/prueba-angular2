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
var CityComponent = (function () {
    function CityComponent() {
        this.cityChange = new core_1.EventEmitter();
    }
    CityComponent.prototype.onChange = function (city) {
        this.cityChange.emit(city);
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], CityComponent.prototype, "city", void 0);
    __decorate([
        //creo que aqui es input porque  el valor vendra del otro componente
        core_1.Output(), 
        __metadata('design:type', Object)
    ], CityComponent.prototype, "cityChange", void 0);
    CityComponent = __decorate([
        core_1.Component({
            selector: 'city-dropdown',
            template: "\n        <select (change)=\"onChange($event.target.value)\" [value]=\"city\">\n            <option value=\"\"></option>\n            <option value=\"Ankarsrum\">Ankarsrum</option>\n            <option value=\"V\u00E4stervik\">V\u00E4stervik</option>\n            <option value=\"Stockholm\">Stockholm</option>\n        </select>\n    "
        }), 
        __metadata('design:paramtypes', [])
    ], CityComponent);
    return CityComponent;
}());
exports.CityComponent = CityComponent;
var MyInputComponent = (function () {
    function MyInputComponent() {
        this.username = 'Jesse';
        this.city = 'Stockholm';
    }
    MyInputComponent = __decorate([
        core_1.Component({
            selector: 'my-input',
            template: "\n        <input [(ngModel)]=\"username\"> \n        <city-dropdown [city]=\"city\" (cityChange)=\"city = $event\"></city-dropdown>\n        <!--\n            Same as above:\n            <city-dropdown [(city)]=\"city\"></city-dropdown>\n        -->\n        <br />\n        Username: {{username}}\n        <br />\n        City: {{city}}\n    ",
        }), 
        __metadata('design:paramtypes', [])
    ], MyInputComponent);
    return MyInputComponent;
}());
exports.MyInputComponent = MyInputComponent;
//# sourceMappingURL=input.component.js.map