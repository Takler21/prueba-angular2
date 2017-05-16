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
var api = "art";
var DATA2 = "http://localhost:3000/" + api + "/";
var AppComponent = (function () {
    function AppComponent(appservice) {
        this.appservice = appservice;
        this.tipes = [];
        this.keys2 = [];
        this.keys = [];
        this.optionals = [];
        this.validation = true;
    }
    //Lo principal es asignar los elementos de la estructura de datos a un objeto, actualmente usamos un post, 
    //pero es posible que en el futuro usemos solo obj para permitir una mayor diversidad de EEDD, 
    //Los metodos JSON son para que test coja el valor de test sin vincularse a post
    AppComponent.prototype.ngOnInit = function () {
        var _this = this;
        api = "art";
        this.appservice.getJSON(DATA2).subscribe(function (res) {
            return _this.datos = res;
        }, function (error) { return _this.errorMessage = error; }, function () {
            _this.sacar();
            _this.test = JSON.parse(JSON.stringify(_this.datos[0]));
        });
    };
    //Saca las claves y los tipos de los elementos, asi como los campos opcionales
    AppComponent.prototype.sacar = function () {
        var _this = this;
        this.datos.forEach(function (post) {
            var t2 = [];
            var t3 = [];
            var t4 = [];
            var aux;
            //Extraer los campos que no aparecen en todos los post
            if (_this.keys2.length == 0)
                _this.keys2 = Object.keys(post);
            if (_this.keys2 != Object.keys(post)) {
                _this.keys2.forEach(function (key) {
                    if (_this.keys2[key] == null && _this.optionals[key] == null) {
                        _this.keys2[key] = key;
                        _this.optionals[key] = _this.keys2[key];
                    }
                });
                Object.keys(post).forEach(function (key) {
                    if (Object.keys(post)[key] == null && _this.optionals[key] == null) {
                        _this.optionals[key] = key;
                    }
                });
            }
            //Extraer los campos que no aparecen en todos los post
            _this.keys2.forEach(function (key) {
                if (_this.isObject(post[key]))
                    t3 = t3.concat(Object.keys(post[key]));
                if (_this.keys != t3) {
                    //if (this.keys == null o []) ?
                    Object.keys(t3).forEach(function (a) {
                        if (_this.keys[a] != t3[a])
                            _this.keys[a] = t3[a];
                    });
                }
                _this.keys.forEach(function (k) {
                    if (post[key][k] != null) {
                        if (_this.keys[k] == null)
                            _this.tipes[k] = _this.isType(post[key][k]);
                    }
                });
                if (_this.tipes[key] == null)
                    _this.tipes[key] = _this.isType(post[key]);
            });
        });
        this.lee = Object.keys(this.optionals);
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
        if (this.validar(this.test)) {
            var idp_1 = 1;
            var cont_1 = true;
            this.datos.forEach(function (post) {
                if (cont_1) {
                    if (post.id == idp_1)
                        idp_1 = idp_1 + 1;
                    else
                        cont_1 = false;
                }
            });
            this.test.id = idp_1;
            this.appservice.add(DATA2, this.test).subscribe(function (data) { return null; }, function (error) { return _this.errorMessage = error; }, function () { return _this.appservice.getJSON(DATA2).subscribe(function (res) {
                return _this.datos = res;
            }); });
            this.datos.sort;
        }
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
        if (this.validar(this.test)) {
            this.appservice.update(DATA2, this.test).subscribe(function (data) { return null; }, function (error) { return _this.errorMessage = error; }, function () { return _this.appservice.getJSON(DATA2).subscribe(function (res) {
                return _this.datos = res;
            }); });
        }
    };
    AppComponent.prototype.delet = function (post) {
        var _this = this;
        this.appservice.delete(DATA2, post.id).subscribe(function (data) { return null; }, function (error) { return _this.errorMessage = error; }, function () { return _this.appservice.getJSON(DATA2).subscribe(function (res) {
            return _this.datos = res;
        }); });
    };
    AppComponent.prototype.validar = function (post) {
        var val = true;
        for (var _i = 0, _a = this.datos; _i < _a.length; _i++) {
            var p = _a[_i];
            if (post.datos.title == p.datos.title) {
                val = false;
            }
        }
        this.validation = val;
        return val;
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
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array)
    ], AppComponent.prototype, "optionals", void 0);
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