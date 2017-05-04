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
        this.t = true;
        this.f = false;
    }
    AppComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.appservice.getJSON().subscribe(function (res) {
            return _this.datos = res;
        }).closed;
        this.datos.forEach(function (res) {
        });
    };
    AppComponent.prototype.ngOnchange = function (changes) {
        var _this = this;
        //if (changes['datos'])
        this.appservice.getJSON().subscribe(function (res) {
            return _this.datos = res;
        });
    };
    AppComponent.prototype.onCheck = function (v) {
        if (v == 0)
            this.estado = true;
        else
            this.estado = false;
    };
    AppComponent.prototype.addb = function () {
        var _this = this;
        var obj;
        var idp = 1;
        var cont = true;
        this.datos.forEach(function (post) {
            if (cont) {
                if (post.id == idp)
                    idp = idp + 1;
                else
                    cont = false;
            }
        });
        obj = { id: idp, datos: { title: this.title, category: this.category }, varios: { estado: this.estado } };
        this.appservice.add(obj).subscribe(function (per) { return _this.datos.push(per); }, function (error) { return _this.errorMessage = error; });
        this.datos.sort;
        this.appservice.getJSON().subscribe(function (res) {
            return _this.datos = res;
        });
    };
    AppComponent.prototype.alform = function (post) {
        this.title = post.datos.title;
        this.category = post.datos.category;
        this.id = post.id;
        this.estado = post.varios.estado;
    };
    AppComponent.prototype.modificar = function (post) {
        var _this = this;
        var obj;
        obj = { id: this.id, datos: { title: this.title, category: this.category }, varios: { estado: this.estado } };
        this.appservice.update(obj).subscribe();
        this.appservice.getJSON().subscribe(function (res) {
            return _this.datos = res;
        });
    };
    AppComponent.prototype.delet = function (post) {
        var _this = this;
        this.appservice.delete(post.id).subscribe().closed;
        this.appservice.getJSON().subscribe(function (res) {
            return _this.datos = res;
        });
        this.appservice.getJSON().subscribe(function (res) {
            return _this.datos = res;
        });
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array)
    ], AppComponent.prototype, "datos", void 0);
    AppComponent = __decorate([
        core_1.Component({
            selector: 'my-app',
            template: "\n            \n          <div class=\"container\" id=\"main\">\n           <div class=\"center-block\">    \n               <div id = \"header\"></div>\n               <div id = \"content\">\n               \n                 <h1>Gestor JSON Angular 2</h1>\n                <label for=\"sel\">Seleccione un titulo</label>\n                <table class=\"table table-striped\">\n                    <thead><tr><th>id</th><th>Nombre</th><th>Categoria</th><th>Opciones</th></tr></thead>\n                    <tbody>\n                    <tr *ngFor=\"let post of datos\">\n                        <td>{{post.id}}</td>\n                        <td>{{post.datos?.title}}</td>\n                        <td>{{post.datos?.category}}</td>\n                        <td><button type=\"button\" class=\"btn btn-warning\" (click)=\"alform(post)\" >A\u00F1adir</button>\n                            \n                            <button type=\"button\" class=\"btn btn-warning\" (click)=\"delet(post)\">Eliminar</button></td></tr>\n                    </tbody>\n                </table>\n\n                <hr>\n                <div class=\"panel-group\">\n                <div class=\"panel panel-default\">\n                <my-collap nombre=\"Articulos\">\n\n                    <div class=\"panel-body\">\n                    <div class=\"panel panel-default\">\n\n                    <my-collap nombre=\"datos\">\n\n                        <div class=\"panel-body\">\n                        <div class=\"form-group row\"> \n                        <label class=\"col-sm-1 col-form-label\">Titulo: </label>     \n                        <div class=\"col-sm-3\"><input class=\"form-control\" [(ngModel)]=\"title\" /></div>\n                        </div>\n                        <div class=\"form-group row\"> \n                        <label class=\"col-sm-1 col-form-label\">Categoria: </label>  \n                        <div class=\"col-sm-3\"><input class=\"form-control\" [(ngModel)]=\"category\" /></div>\n                        </div>\n                        </div>\n                    </my-collap>\n                    </div>\n\n                    <div class=\"panel panel-default\">\n\n                    <my-collap nombre=\"varios\">\n                            \n                        <div class=\"panel-body\">\n                        <div class=\"form-group row\"> \n                        <label class=\"col-sm-1 col-form-label\">Estado: </label>   \n                        <div class=\"col-sm-3\">\n                            <label class=\"radio-inline\"><input type=\"radio\" name=\"disponibilidad\" (change)=\"onCheck($event.target.value)\" [checked]=\"estado\" value=0 />Disponible</label>\n                            <label class=\"radio-inline\"><input type=\"radio\" name=\"disponibilidad\" (change)=\"onCheck($event.target.value)\" [checked]=\"!estado\" value=1 />agotado</label>\n                        </div>\n                        </div>\n                        </div>\n                    </my-collap>\n                    </div>\n                    </div>\n                </my-collap>\n               \n               <button type=\"button\" class=\"btn btn-warning\" (click)=\"addb()\">A\u00F1adir</button>\n               <button type=\"button\" class=\"btn btn-warning\" (click)=\"modificar(post)\">Modificar</button>\n            </div>\n            </div>\n            </div>\n            </div>\n          </div>\n  \t\t ",
            providers: [search_service_1.AppServices]
        }), 
        __metadata('design:paramtypes', [search_service_1.AppServices])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map