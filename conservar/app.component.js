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
var DATA2 = "http://localhost:3000/art/";
var AppComponent = (function () {
    function AppComponent(appservice) {
        this.appservice = appservice;
        this.estado = true;
        this.keys = [];
    }
    AppComponent.prototype.isObject = function (val) { return typeof val === 'object'; };
    //Lo principal es asignar los elementos de la estructura de datos a un objeto, actualmente usamos un post, 
    //pero es posible que en el futuro usemos solo obj para permitir una mayor diversidad de EEDD
    AppComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.appservice.getJSON(DATA2).subscribe(function (res) {
            return _this.datos = res;
        }, function (error) { return _this.errorMessage = error; }, function () { return _this.sacar(); });
    };
    AppComponent.prototype.sacar = function () {
        var _this = this;
        this.datos.forEach(function (post) {
            _this.keys2 = Object.keys(post);
            var t3 = [];
            if (_this.keys) {
                _this.keys2.forEach(function (key) {
                    t3 = t3.concat(Object.keys(post[key]));
                });
            }
            _this.keys = t3;
        });
    };
    ;
    //Metodo para guardar el cambio del elemento booleano de la estructura de datos el cual es gestionado en un Radio Button
    AppComponent.prototype.onCheck = function (v) {
        this.estado = v;
    };
    //haber si podemos eliminar la dependencia en variables locales, El id lo presupondremos como clave primaria de los elementos.
    AppComponent.prototype.addb = function () {
        var _this = this;
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
        var obj = { id: idp, datos: { title: this.title, category: this.category }, varios: { estado: this.estado } };
        this.appservice.add(DATA2, obj).subscribe(function (data) { return null; }, function (error) { return _this.errorMessage = error; }, function () { return _this.appservice.getJSON(DATA2).subscribe(function (res) {
            return _this.datos = res;
        }); });
        this.datos.sort;
    };
    //tal vez mejor llevarlo a otro componente si es que acabo haciendo la tabla y el formulario en otro componente
    AppComponent.prototype.alform = function (post) {
        this.title = post.datos.title;
        this.category = post.datos.category;
        this.id = post.id;
        this.estado = post.varios.estado;
    };
    //haber si podemos eliminar completamente la dependencia en variables locales.
    AppComponent.prototype.modificar = function (post) {
        var _this = this;
        var obj;
        obj = { id: this.id, datos: { title: this.title, category: this.category }, varios: { estado: this.estado } };
        this.appservice.update(DATA2, obj).subscribe(function (data) { return null; }, function (error) { return _this.errorMessage = error; }, function () { return _this.appservice.getJSON(DATA2).subscribe(function (res) {
            return _this.datos = res;
        }); });
    };
    AppComponent.prototype.delet = function (post) {
        var _this = this;
        this.appservice.delete(DATA2, post.id).subscribe(function (data) { return null; }, function (error) { return _this.errorMessage = error; }, function () { return _this.appservice.getJSON(DATA2).subscribe(function (res) {
            return _this.datos = res;
        }); });
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array)
    ], AppComponent.prototype, "datos", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array)
    ], AppComponent.prototype, "keys2", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array)
    ], AppComponent.prototype, "keys", void 0);
    AppComponent = __decorate([
        core_1.Component({
            selector: 'my-app',
            template: "\n            \n          <div class=\"container\" id=\"main\">\n           <div class=\"center-block\">    \n               <div id = \"header\"></div>\n               <div id = \"content\">\n               \n              <h1>Gestor JSON Angular 2</h1>\n               \n                <table class=\"table table-striped\">\n                    <thead>\n                    <tr *ngIf=\"datos\">\n                        <template ngFor let-key2 [ngForOf]=\"keys2\" let-key2Index=\"index\">\n                            <th *ngIf=\"!isObject(datos[0][key2])\" ngDefaultControl >{{key2}}</th> \n                        <template ngFor let-key [ngForOf]=\"keys\" let-keyIndex=\"index\">\n                            <th *ngIf=\"datos[0][key2][key] !== empty\" ngDefaultControl >{{key}}</th> \n                    </template>\n                    </template>\n                        <th>Opciones</th>   \n                    </tr>\n                    </thead>\n                    <tbody>\n                    \n                    <tr *ngFor=\"let post of datos | sortBy : 'id'\">\n                        \n                        \n                        <template ngFor let-key2 [ngForOf]=\"keys2\" let-key2Index=\"index\">\n                            <td *ngIf=\"!isObject(post[key2])\" ngDefaultControl >{{post[key2]}}</td> \n                        <template ngFor let-key [ngForOf]=\"keys\" let-keyIndex=\"index\">\n                            <td *ngIf=\"post[key2][key] !== empty\" ngDefaultControl >{{post[key2][key]}}</td> \n                        </template>\n                        </template>\n                        <td><button type=\"button\" class=\"btn btn-warning\" (click)=\"alform(post)\" >A\u00F1adir</button>\n                        <button type=\"button\" class=\"btn btn-warning\" (click)=\"delet(post)\">Eliminar</button></td>\n                        \n                    </tr>\n                    </tbody>\n                </table>\n\n                <hr>\n               \n                <div class=\"panel-group\">\n                <div class=\"panel panel-default\">\n                <my-collap nombre=\"Articulos\">\n\n                    <div class=\"panel-body\">\n                    <div class=\"panel panel-default\">\n\n                    <my-collap nombre=\"datos\">\n\n                        <div class=\"panel-body\">\n                        <div class=\"form-group row\"> \n                        <label class=\"col-sm-1 col-form-label\">Titulo: </label>     \n                        <div class=\"col-sm-3\"><input class=\"form-control\" [(ngModel)]=\"title\" /></div>\n                        </div>\n                        <div class=\"form-group row\"> \n                        <label class=\"col-sm-1 col-form-label\">Categoria: </label>  \n                        <div class=\"col-sm-3\"><input class=\"form-control\" [(ngModel)]=\"category\" /></div>\n                        </div>\n                        </div>\n                    </my-collap>\n                    </div>\n                    {{datos}}\n                    <div class=\"panel panel-default\">\n\n                    <my-collap nombre=\"varios\">\n                            \n                        <div class=\"panel-body\">\n                        <div class=\"form-group row\"> \n                        <label class=\"col-sm-1 col-form-label\">Estado: </label>   \n                        <div class=\"col-sm-3\">\n                            <label class=\"radio-inline\"><input type=\"radio\" name=\"disponibilidad\" (change)=\"onCheck(true)\" [checked]=\"estado\" value=true />Disponible</label>\n                            <label class=\"radio-inline\"><input type=\"radio\" name=\"disponibilidad\" (change)=\"onCheck(false)\" [checked]=\"!estado\" value=false />agotado</label>\n                        </div>\n                        </div>\n                        </div>\n                        {{estado}}\n                            <div *ngIf=\"datos\">\n                        {{datos[0].datos?.title}}\n                            </div>\n                    </my-collap>\n                    </div>\n                    </div>\n                </my-collap>\n               \n               <button type=\"button\" class=\"btn btn-warning\" (click)=\"addb()\">A\u00F1adir</button>\n               <button type=\"button\" class=\"btn btn-warning\" (click)=\"modificar(post)\">Modificar</button>\n            </div>\n            </div>\n                <!--<generator [datos]=\"datos\" [url]=\"DATA2\"></generator>-->\n            </div>\n            </div>\n          </div>\n\n  \t\t ",
            providers: [search_service_1.AppServices],
        }), 
        __metadata('design:paramtypes', [search_service_1.AppServices])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map