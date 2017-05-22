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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var core_1 = require('@angular/core');
var per_service_1 = require('./per.service');
require('rxjs/add/observable/of');
// Observable operators
require('rxjs/add/operator/catch');
require('rxjs/add/operator/debounceTime');
require('rxjs/add/operator/distinctUntilChanged');
var FriendComponent = (function () {
    function FriendComponent(perService) {
        var _this = this;
        this.perService = perService;
        this.people = perService.getPeople().subscribe(function (data) { _this.people = data; });
    }
    FriendComponent = __decorate([
        core_1.Component({
            selector: 'my-person',
            providers: [per_service_1.PerService],
            template: "\n         <h1>Hello from the {{ componentName }}!</h1>\n    <div *ngFor=\"let p of people | async\">\n        <h3>Name: {{ p.name }}</h3> \n        <h4>Age: {{ p.age }}</h4> \n    </div>\n    "
        }),
        __param(0, core_1.Inject(core_1.forwardRef(function () { return per_service_1.PerService; }))), 
        __metadata('design:paramtypes', [per_service_1.PerService])
    ], FriendComponent);
    return FriendComponent;
}());
exports.FriendComponent = FriendComponent;
var MyInputComponent = (function () {
    function MyInputComponent() {
        this.perCh = new core_1.EventEmitter();
    }
    MyInputComponent.prototype.onChange = function (ind) {
        this.perCh.emit(ind);
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], MyInputComponent.prototype, "ind", void 0);
    __decorate([
        //creo que aqui es input porque  el valor vendra del otro componente
        core_1.Output(), 
        __metadata('design:type', Object)
    ], MyInputComponent.prototype, "perCh", void 0);
    MyInputComponent = __decorate([
        core_1.Component({
            selector: 'my-input',
            template: "\n    <select (change)=\"onChange($event.target.value)\" [value]=\"ind\">\n        <option value=0> Persona 1</option>\n        <option value=1> Persona 2</option>\n    </select>\n    <my-person></my-person>\n",
        }), 
        __metadata('design:paramtypes', [])
    ], MyInputComponent);
    return MyInputComponent;
}());
exports.MyInputComponent = MyInputComponent;
var AppComponent = (function () {
    function AppComponent() {
        this.obj = JSON.parse('{	"persona": [{ "valores": { "name": "John", "age": 30, "city": "New York" },  "varios": { "gender": "1" } }, { "valores": { "name": "pepa", "age": 20, "city": "Cadiz" }, "varios": { "gender": "0" }}]}');
        this.nom1 = "Nombre";
        this.nom2 = "Edad";
        this.nom3 = "Ciudad";
        this.nom4 = "Genero";
        this.ind = 1;
        this.nombre1 = 'propiedades';
        this.nombre2 = 'valores';
        this.nombre3 = 'varios';
        this.logs = [];
    }
    AppComponent.prototype.log = function (message) {
        this.logs.push(message);
    };
    AppComponent = __decorate([
        core_1.Component({
            selector: 'my-app',
            templateUrl: 'app/app.component.html'
        }), 
        __metadata('design:paramtypes', [])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map