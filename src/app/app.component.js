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
var search_service_1 = require('./search.service');
var AppComponent = (function () {
    function AppComponent(appservice) {
        this.appservice = appservice;
        this.verd = true;
        this.logs = [];
    }
    AppComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.appservice.getJSON().subscribe(function (res) {
            return _this.datos = res;
        });
    };
    AppComponent.prototype.addb = function ($event) {
        var _this = this;
        var obj;
        var idp = this.datos.length + 1;
        obj = { id: 7, title: this.title, category: this.category };
        this.appservice.add(obj).subscribe(function (per) { return _this.datos.push(per); }, function (error) { return _this.errorMessage = error; });
    };
    AppComponent.prototype.alform = function (post) {
        this.title = post.title;
        this.category = post.category;
        this.id = post.id;
    };
    AppComponent.prototype.ngOnChanges = function (changes) {
        // only run when property "data" changed
        if (changes['datos']) {
        }
    };
    AppComponent.prototype.log = function (message) {
        this.logs.push(message);
    };
    AppComponent = __decorate([
        core_1.Component({
            selector: 'my-app',
            template: "\n          <div id=\"main\">\n          \n               <div id = \"header\"></div>\n               <div id = \"content\">\n                 <h1>Gestor JSON Angular 2</h1>\n                <label for=\"sel\">Seleccione un titulo</label>\n                <table>\n                    <tr><th>id</th><th>Nombre</th><th>Categoria</th><th>Opciones</th></tr>\n                    <tr *ngFor=\"let post of datos\">\n                        <td>{{post.id}}</td>\n                        <td><input [(ngModel)]=\"post.title\" /></td>\n                        <td><input [(ngModel)]=\"post.category\" /></td>\n                        <td><button (click)=\"alform(post)\" >A\u00F1adir</button></td>\n                    </tr>\n                    \n                </table>\n\n                <hr>\n                <my-collap nombre=\"Articulos\">\n                   <p>Titulo:   <input [(ngModel)]=\"title\" /> <br /><br />\n                   Categoria:   <input [(ngModel)]=\"category\" /></p>\n                </my-collap>\n               </div>\n               <button #btn1 (click)=\"addb($event)\">A\u00F1adir</button>\n          </div>\n  \t\t ",
            providers: [search_service_1.AppServices]
        }), 
        __metadata('design:paramtypes', [search_service_1.AppServices])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map