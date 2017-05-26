var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define(["require", "exports", '@angular/core', './search.service'], function (require, exports, core_1, search_service_1) {
    "use strict";
    var api = "art";
    var DATA2 = "http://localhost:3000/" + api + "/";
    var AppComponent = (function () {
        function AppComponent(appservice) {
            this.appservice = appservice;
            this.messageE = ['Criterios no cumplidos:'];
            this.tipes = [];
            this.keys = [];
            this.keys3 = [];
            this.keysHijas = [];
            this.sons = [];
            this.optionals = [];
            this.buscado = [];
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
                _this.iniciarBuscado();
            });
        };
        //Saca las claves y los tipos de los elementos, asi como los campos opcionales
        AppComponent.prototype.iniciarBuscado = function () {
            var _this = this;
            this.keys.forEach(function (k) {
                if (_this.tipes[k] != "object")
                    _this.buscado[k] = null;
            });
            this.keysHijas.forEach(function (k) {
                if (_this.tipes[k] != "object")
                    _this.buscado[k] = null;
            });
        };
        AppComponent.prototype.buscar = function (post) {
            var _this = this;
            var vacio = true;
            this.keys.forEach(function (key) {
                if (_this.tipes[key] != "object") {
                    if (String(post[key]).toLowerCase().indexOf(String(_this.buscado[key]).trim()) == -1 && _this.buscado[key] != null)
                        vacio = false;
                }
            });
            this.keysHijas.forEach(function (keyH) {
                if (_this.tipes[keyH] != "object") {
                    if (String(post[_this.sons[keyH]][keyH]).toLowerCase().indexOf(String(_this.buscado[keyH]).trim()) == -1 && _this.buscado[keyH] != null)
                        vacio = false;
                }
            });
            this.lee = this.buscado["estado"];
            return vacio;
        };
        AppComponent.prototype.sacar = function () {
            var _this = this;
            this.datos.forEach(function (post) {
                var t3 = [];
                var aux = Object.keys(post);
                //Extraer llaves iniciales del primer nivel
                if (_this.keys.length == 0) {
                    _this.keys = Object.keys(post);
                    _this.keys.forEach(function (key) {
                        _this.tipes[key] = _this.isType(post[key]);
                    });
                }
                else {
                    //Extrae los campos opcionales del primer nivel, ademas de obtener su tipo
                    if (_this.keys != aux) {
                        Object.keys(_this.keys).forEach(function (key) {
                            if (_this.keys[key] != aux[key] && _this.optionals[_this.keys[key]] != _this.keys[key]) {
                                var esta_1 = false;
                                aux.forEach(function (k2) {
                                    if (k2 == _this.keys[key])
                                        esta_1 = true;
                                });
                                if (!esta_1)
                                    _this.optionals[_this.keys[key]] = _this.keys[_this.keys[key]];
                                else {
                                    if (!_this.optionals[aux[key]] && !_this.tipes[aux[key]]) {
                                        _this.keys.forEach(function (k2) {
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
                // //Extraer llaves iniciales del segundo nivel
                if (_this.keysHijas.length == 0) {
                    _this.keys.forEach(function (key) {
                        if (_this.isObject(post[key]))
                            t3 = t3.concat(Object.keys(post[key]));
                        Object.keys(t3).forEach(function (a) {
                            _this.keysHijas[a] = t3[a];
                            if (!_this.sons[t3[a]])
                                _this.sons[t3[a]] = key;
                        });
                    });
                }
                //Saca los elementos opcionales del segundo nivel, ademas de vincular cada elemento con su padre
                _this.keys.forEach(function (key) {
                    if (_this.isObject(post[key]))
                        t3 = t3.concat(Object.keys(post[key]));
                    if (_this.keysHijas != t3) {
                        t3.forEach(function (a) {
                            var esta = false;
                            _this.keysHijas.forEach(function (k) {
                                if (k == a) {
                                    esta = true;
                                }
                            });
                            if (!esta) {
                                _this.keysHijas.push(a);
                                if (!_this.optionals[a])
                                    _this.optionals[a] = a;
                                if (!_this.sons[a])
                                    _this.sons[a] = key;
                            }
                        });
                    }
                    if (_this.tipes[key] == null)
                        _this.tipes[key] = _this.isType(post[key]);
                });
                //Saca los tipos de los elementos opcionales de los elementos mayores, y les vincula sus respectivos elementos hijos.
                _this.keys3.forEach(function (key) {
                    if (_this.tipes[key] == null)
                        _this.tipes[key] = _this.isType(post[key]);
                    if (_this.tipes[key] == "object") {
                        t3 = t3.concat(Object.keys(post[key]));
                        Object.keys(t3).forEach(function (a) {
                            _this.keysHijas[a] = t3[a];
                            if (!_this.sons[t3[a]])
                                _this.sons[t3[a]] = key;
                        });
                    }
                });
                //Saca los tipos de los elementos menores
                _this.keysHijas.forEach(function (k) {
                    if (post[_this.sons[k]][k] != null) {
                        if (!_this.tipes[k]) {
                            _this.tipes[k] = _this.isType(post[_this.sons[k]][k]);
                        }
                    }
                });
            });
            //Añade las llaves de los elementos opcionales al conjuntos de llaves mayores.
            this.keys = this.keys.concat(this.keys3);
        };
        AppComponent.prototype.isObject = function (val) { return typeof val === 'object'; };
        AppComponent.prototype.isType = function (val) { return typeof val; };
        //Metodo para guardar el cambio del elemento booleano de la estructura de datos el cual es gestionado en un Radio Button
        AppComponent.prototype.onCheck = function (v, key) {
            if (this.sons[key])
                this.test[this.sons[key]][key] = v;
            else
                this.test[key] = v;
        };
        AppComponent.prototype.clRadio = function (obj, check, key, val) {
            if (check == false && val == this.buscado[key]) {
                obj[key] = null;
            }
            else {
                obj[key] = val;
            }
        };
        //El metodo que usaremos para añadir mediante post objetos al json, en el se le asignara un id
        //que en caso de que se borrara uno con un id inferior al ultimo el objeto ocupara el id faltante.
        AppComponent.prototype.addb = function (test) {
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
            test.id = idp;
            if (this.validar(test)) {
                this.appservice.add(DATA2, this.test).subscribe(function (data) { return null; }, function (error) { return _this.errorMessage = error; }, function () { return _this.appservice.getJSON(DATA2).subscribe(function (res) {
                    return _this.datos = res;
                }); });
                this.datos.sort;
            }
        };
        //Pasa los valores del post objetivo al formulario, en el cual se podra modificar
        AppComponent.prototype.alform = function (post) {
            this.test = JSON.parse(JSON.stringify(post));
        };
        //Modificara el valor del objeto dentro del json al que se hace referencia.
        AppComponent.prototype.modificar = function (post) {
            var _this = this;
            if (this.validar(post)) {
                this.appservice.update(DATA2, post).subscribe(function (data) { return null; }, function (error) { return _this.errorMessage = error; }, function () { return _this.appservice.getJSON(DATA2).subscribe(function (res) {
                    return _this.datos = res;
                }); });
            }
        };
        //Elimina el objeto correspondiente.
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
        ], AppComponent.prototype, "keys", void 0);
        __decorate([
            core_1.Input(), 
            __metadata('design:type', Array)
        ], AppComponent.prototype, "keys3", void 0);
        __decorate([
            core_1.Input(), 
            __metadata('design:type', Array)
        ], AppComponent.prototype, "keysHijas", void 0);
        __decorate([
            core_1.Input(), 
            __metadata('design:type', Array)
        ], AppComponent.prototype, "sons", void 0);
        __decorate([
            core_1.Input(), 
            __metadata('design:type', Array)
        ], AppComponent.prototype, "optionals", void 0);
        __decorate([
            core_1.Input(), 
            __metadata('design:type', Array)
        ], AppComponent.prototype, "buscado", void 0);
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
});
//# sourceMappingURL=app.component.js.map