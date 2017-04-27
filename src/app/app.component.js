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
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var search_service_1 = require("./search.service");
var AppComponent = (function () {
    function AppComponent(appservice) {
        this.appservice = appservice;
        this.verd = true;
    }
    AppComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.appservice.getJSON().subscribe(function (res) {
            return _this.datos = res;
        });
        if (this.test) {
            this.id = this.test.id;
            this.title = this.test.title;
            this.category = this.test.category;
        }
    };
    AppComponent.prototype.onChange = function ($event) {
        if (this.test) {
            this.id = this.test.id;
            this.title = this.test.title;
            this.category = this.test.category;
        }
    };
    AppComponent.prototype.addb = function ($event) {
        var obj;
        var idp = this.datos.length + 1;
        if (this.test) {
            obj = { id: idp, title: this.title, category: this.category };
            this.appservice.add(obj).subscribe();
        }
    };
    return AppComponent;
}());
AppComponent = __decorate([
    core_1.Component({
        selector: 'my-app',
        template: "\n          <div id=\"main\">\n          \n               <div id = \"header\"></div>\n               <div id = \"content\">\n                 <h1>Gestor JSON Angular 2</h1>\n                <label for=\"sel\">Seleccione un titulo</label>\n                <select #sel [(ngModel)]=\"test\" (change)=\"onChange($event)\" >\n                    <option selected></option>\n                    <option *ngFor=\"let post of datos\" [ngValue]=\"post\">{{post.title}}</option>\n                </select>\n\n                <hr>\n               <p>Titulo:   <input [(ngModel)]=\"title\" /> <br /><br />\n               Categoria:   <input [(ngModel)]=\"category\" /></p>\n               </div>\n               <button #btn1 (click)=\"addb($event)\">A\u00F1adir</button>\n          </div>\n  \t\t ",
        providers: [search_service_1.AppServices]
    })
    //En lugar de cargar en el select podriamos cargar en eun array y de este mostar en el select.
    ,
    __metadata("design:paramtypes", [search_service_1.AppServices])
], AppComponent);
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map