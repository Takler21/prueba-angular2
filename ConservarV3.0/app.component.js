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
        this.messageE = ['Criterios no cumplidos:'];
        this.tipes = [];
        this.keys2 = [];
        this.keys3 = [];
        this.keys = [];
        this.sons = [];
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
            var t3 = [];
            var aux = Object.keys(post);
            //Extraer los campos que no aparecen en todos los post
            if (_this.keys2.length == 0) {
                _this.keys2 = Object.keys(post);
                _this.keys2.forEach(function (key) {
                    _this.tipes[key] = _this.isType(post[key]);
                });
            }
            else {
                if (_this.keys2 != aux) {
                    Object.keys(_this.keys2).forEach(function (key) {
                        if (_this.keys2[key] != aux[key] && _this.optionals[_this.keys2[key]] != _this.keys2[key]) {
                            var esta_1 = false;
                            aux.forEach(function (k2) {
                                if (k2 == _this.keys2[key])
                                    esta_1 = true;
                            });
                            if (!esta_1)
                                _this.optionals[_this.keys2[key]] = _this.keys2[_this.keys2[key]];
                            else {
                                if (!_this.optionals[aux[key]] && !_this.tipes[aux[key]]) {
                                    _this.keys2.forEach(function (k2) {
                                        if (k2 == aux[key])
                                            esta_1 = false;
                                    });
                                    if (esta_1) {
                                        _this.optionals[aux[key]] = aux[key];
                                        _this.keys3.push(aux[key]);
                                    }
                                }
                            }
                        }
                    });
                }
            }
            //Extraer los campos que no aparecen en todos los post
            if (_this.keys.length == 0) {
                _this.keys2.forEach(function (key) {
                    if (_this.isObject(post[key]))
                        t3 = t3.concat(Object.keys(post[key]));
                    //if (this.keys == null o []) ?
                    Object.keys(t3).forEach(function (a) {
                        _this.keys[a] = t3[a];
                        if (!_this.sons[t3[a]])
                            _this.sons[t3[a]] = key;
                    });
                });
            }
            _this.keys2.forEach(function (key) {
                if (_this.isObject(post[key]))
                    t3 = t3.concat(Object.keys(post[key]));
                if (_this.keys != t3) {
                    //if (this.keys == null o []) ?
                    t3.forEach(function (a) {
                        var esta = false;
                        _this.keys.forEach(function (k) {
                            if (k == a) {
                                esta = true;
                            }
                        });
                        if (!esta) {
                            _this.keys.push(a);
                            if (!_this.sons[a])
                                _this.sons[a] = key;
                        }
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
            _this.keys3.forEach(function (key) {
                if (_this.tipes[key] == null)
                    _this.tipes[key] = _this.isType(post[key]);
                if (_this.tipes[key] == "object") {
                    t3 = t3.concat(Object.keys(post[key]));
                    //if (this.keys == null o []) ?
                    Object.keys(t3).forEach(function (a) {
                        _this.keys[a] = t3[a];
                        if (!_this.sons[t3[a]])
                            _this.sons[t3[a]] = key;
                    });
                }
            });
        });
        this.keys2 = this.keys2.concat(this.keys3);
        this.lee = Object.keys(this.optionals) + "   ;   " + Object.keys(this.keys2) + "   ;   " + Object.keys(this.keys) + "   ;   " + Object.keys(this.tipes) + "   ;   " + Object.keys(this.sons) + "   ;   " + this.keys2[1];
    };
    AppComponent.prototype.isObject = function (val) { return typeof val === 'object'; };
    AppComponent.prototype.isType = function (val) { return typeof val; };
    AppComponent.prototype.k2s = function (val) { return this.sons[val]; };
    //Metodo para guardar el cambio del elemento booleano de la estructura de datos el cual es gestionado en un Radio Button
    AppComponent.prototype.onCheck = function (v, key2, key) {
        this.test[key2][key] = v;
    };
    AppComponent.prototype.onCheck2 = function (v, key2) {
        this.test[key2] = v;
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
        if (this.validar(post)) {
            this.appservice.update(DATA2, post).subscribe(function (data) { return null; }, function (error) { return _this.errorMessage = error; }, function () { return _this.appservice.getJSON(DATA2).subscribe(function (res) {
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
            if (p.id !== post.id)
                if (post.data.title == p.data.title) {
                    this.messageE.push('- No repita titulos');
                    val = false;
                }
            ;
        }
        ;
        this.validation = val;
        return this.validation;
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
    ], AppComponent.prototype, "keys3", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array)
    ], AppComponent.prototype, "keys", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array)
    ], AppComponent.prototype, "sons", void 0);
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