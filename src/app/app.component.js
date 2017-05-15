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
        this.tipes = [];
        this.keys2 = [];
        this.keys = [];
    }
    //Lo principal es asignar los elementos de la estructura de datos a un objeto, actualmente usamos un post, 
    //pero es posible que en el futuro usemos solo obj para permitir una mayor diversidad de EEDD, 
    //Los metodos JSON son para que test coja el valor de test sin vincularse a post
    AppComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.appservice.getJSON(DATA2).subscribe(function (res) {
            return _this.datos = res;
        }, function (error) { return _this.errorMessage = error; }, function () {
            _this.sacar();
            _this.test = JSON.parse(JSON.stringify(_this.datos[0]));
        });
    };
    //Saca las claves y los tipos de los elementos del primer nivel
    AppComponent.prototype.sacar = function () {
        //No uso datos[0] debido a habra que considear los valores opcionales, el proceso para obtener todas las llaves esta hecho, falta el confirmar opcionales
        var _this = this;
        this.datos.forEach(function (post) {
            if (_this.keys2 != Object.keys(post))
                _this.keys2 = Object.keys(post);
            var t3 = [];
            var t4 = [];
            var aux;
            _this.keys2.forEach(function (key) {
                t4[key] = _this.isType(post[key]);
                _this.keys.forEach(function (k) {
                    if (post[key][k] != null)
                        t4[k] = _this.isType(post[key][k]);
                });
                if (_this.isObject(post[key]))
                    t3 = t3.concat(Object.keys(post[key]));
            });
            if (_this.keys != t3)
                _this.keys = t3;
            _this.tipes = t4;
            _this.lee = t4["datos"];
        });
        this.caca = Object.keys(this.datos);
    };
    AppComponent.prototype.isObject = function (val) { return typeof val === 'object'; };
    AppComponent.prototype.isType = function (val) { return typeof val; };
    //Metodo para guardar el cambio del elemento booleano de la estructura de datos el cual es gestionado en un Radio Button
    AppComponent.prototype.onCheck = function (v, key2, key) {
        this.test[key2][key] = v;
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
        this.test.id = idp;
        this.appservice.add(DATA2, this.test).subscribe(function (data) { return null; }, function (error) { return _this.errorMessage = error; }, function () { return _this.appservice.getJSON(DATA2).subscribe(function (res) {
            return _this.datos = res;
        }); });
        this.datos.sort;
    };
    //tal vez mejor llevarlo a otro componente si es que acabo haciendo la tabla y el formulario en otro componente
    AppComponent.prototype.alform = function (post) {
        //this.title = post.datos.title;
        //this.category = post.datos.category;
        //this.id = post.id;
        //this.estado = post.varios.estado;
        this.test = JSON.parse(JSON.stringify(post));
    };
    //haber si podemos eliminar completamente la dependencia en variables locales.
    AppComponent.prototype.modificar = function (post) {
        var _this = this;
        this.appservice.update(DATA2, this.test).subscribe(function (data) { return null; }, function (error) { return _this.errorMessage = error; }, function () { return _this.appservice.getJSON(DATA2).subscribe(function (res) {
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
    ], AppComponent.prototype, "tipes", void 0);
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
            templateUrl: 'app/app.component.html',
            providers: [search_service_1.AppServices],
        }), 
        __metadata('design:paramtypes', [search_service_1.AppServices])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map