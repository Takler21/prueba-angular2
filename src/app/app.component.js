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
    AppComponent.prototype.redirect = function () {
    };
    AppComponent.prototype.addb = function () {
        var _this = this;
        var obj;
        //let idp = 0;
        // for (let i = 0; i < this.datos.length; i++) {
        //     if (this.datos[i].id !== (i + 1))
        //         idp = this.datos[i].id
        // }
        // if (idp === 0)
        //     idp = this.datos.length;
        obj = { title: this.title, category: this.category };
        this.appservice.add(obj).subscribe(function (per) { return _this.datos.push(per); }, function (error) { return _this.errorMessage = error; });
        this.ngOnInit();
    };
    AppComponent.prototype.alform = function (post) {
        this.title = post.title;
        this.category = post.category;
        this.id = post.id;
    };
    AppComponent.prototype.modificar = function (post) {
        var obj;
        obj = { id: post.id, title: post.title, category: post.category };
        this.appservice.update(obj).subscribe();
        this.ngOnInit();
    };
    AppComponent.prototype.delet = function (post) {
        this.appservice.delete(post.id).subscribe();
        this.ngOnInit();
    };
    AppComponent.prototype.log = function (message) {
        this.logs.push(message);
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array)
    ], AppComponent.prototype, "datos", void 0);
    AppComponent = __decorate([
        core_1.Component({
            selector: 'my-app',
            template: "\n            \n          <div class=\"container\" id=\"main\">\n           <div class=\"center-block\">    \n               <div id = \"header\"></div>\n               <div id = \"content\">\n               \n                 <h1>Gestor JSON Angular 2</h1>\n                <label for=\"sel\">Seleccione un titulo</label>\n                <table>\n                    <tr><th>id</th><th>Nombre</th><th>Categoria</th><th>Opciones</th></tr>\n                    <tr *ngFor=\"let post of datos\">\n                        <td>{{post.id}}</td>\n                        <td><input class=\"form-control form-control-lg\" [(ngModel)]=\"post.title\" /></td>\n                        <td><input class=\"form-control form-control-lg\" [(ngModel)]=\"post.category\" /></td>\n                        <td><button type=\"button\" class=\"btn btn-warning\" (click)=\"alform(post)\" >A\u00F1adir</button>\n                            <button type=\"button\" class=\"btn btn-warning\" (click)=\"modificar(post)\">Modificar</button>\n                            <button type=\"button\" class=\"btn btn-warning\" (click)=\"delet(post)\">Eliminar</button></td>\n                    </tr>\n                    \n                </table>\n\n                <hr>\n                <my-collap nombre=\"Articulos\">\n                \n                   <div class=\"form-group row\"> \n                   <label class=\"col-sm-1 col-form-label\">Titulo: </label>   <div class=\"col-sm-3\"><input class=\"form-control\" [(ngModel)]=\"title\" /></div>\n                   </div>\n                   <div class=\"form-group row\"> \n                   <label class=\"col-sm-1 col-form-label\">Categoria: </label>  <div class=\"col-sm-3\"><input class=\"form-control\" [(ngModel)]=\"category\" /></div>\n                </div>\n                </my-collap>\n               \n               <button type=\"button\" class=\"btn btn-warning\" (click)=\"addb()\">A\u00F1adir</button>\n            </div>\n            </div>\n          </div>\n  \t\t ",
            providers: [search_service_1.AppServices],
        }), 
        __metadata('design:paramtypes', [search_service_1.AppServices])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map