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
var Generator = (function () {
    function Generator() {
        this.estado = true;
        this.oForm = new core_1.EventEmitter();
        this.oDel = new core_1.EventEmitter();
        this.oAdd = new core_1.EventEmitter();
        this.oMod = new core_1.EventEmitter();
    }
    Generator.prototype.alform = function (post) {
        this.oForm.emit(post);
    };
    Generator.prototype.delet = function (post) {
        this.oDel.emit(post.id);
    };
    Generator.prototype.addb = function () {
        this.oAdd.emit();
    };
    Generator.prototype.modificar = function (post) {
        this.oMod.emit(post);
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array)
    ], Generator.prototype, "datos", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], Generator.prototype, "url", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], Generator.prototype, "id", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], Generator.prototype, "title", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], Generator.prototype, "category", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], Generator.prototype, "estado", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], Generator.prototype, "oForm", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], Generator.prototype, "oDel", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], Generator.prototype, "oAdd", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], Generator.prototype, "oMod", void 0);
    Generator = __decorate([
        core_1.Component({
            selector: 'generator',
            template: "<table class=\"table table-striped\">\n                    <thead><tr><th>id</th><th>Nombre</th><th>Categoria</th><th>Opciones</th></tr></thead>\n                    <tbody>\n                    \n                    <tr *ngFor=\"let post of datos | sortBy : 'id'\">\n                        \n                        <td>{{post.id}}</td>\n                        <td>{{post.datos?.title}}</td>\n                        <td>{{post.datos?.category}}</td>\n                        <td><button type=\"button\" class=\"btn btn-warning\" (click)=\"alform(post)\" >A\u00F1adir</button>\n                        <button type=\"button\" class=\"btn btn-warning\" (click)=\"delet(post)\">Eliminar</button></td>\n                        \n                    </tr>\n                    </tbody>\n                </table>\n                <hr>\n               \n                <div class=\"panel-group\">\n                <div class=\"panel panel-default\">\n                <my-collap nombre=\"Articulos\">\n\n                    <div class=\"panel-body\">\n                    <div class=\"panel panel-default\">\n\n                    <my-collap nombre=\"datos\">\n\n                        <div class=\"panel-body\">\n                        <div class=\"form-group row\"> \n                        <label class=\"col-sm-1 col-form-label\">Titulo: </label>     \n                        <div class=\"col-sm-3\"><input class=\"form-control\" [(ngModel)]=\"title\" /></div>\n                        </div>\n                        <div class=\"form-group row\"> \n                        <label class=\"col-sm-1 col-form-label\">Categoria: </label>  \n                        <div class=\"col-sm-3\"><input class=\"form-control\" [(ngModel)]=\"category\" /></div>\n                        </div>\n                        </div>\n                    </my-collap>\n                    </div>\n                    {{datos}}\n                    <div class=\"panel panel-default\">\n\n                    <my-collap nombre=\"varios\">\n                            \n                        <div class=\"panel-body\">\n                        <div class=\"form-group row\"> \n                        <label class=\"col-sm-1 col-form-label\">Estado: </label>   \n                        <div class=\"col-sm-3\">\n                            <label class=\"radio-inline\"><input type=\"radio\" name=\"disponibilidad\" (change)=\"onCheck(true)\" [checked]=\"estado\" value=true />Disponible</label>\n                            <label class=\"radio-inline\"><input type=\"radio\" name=\"disponibilidad\" (change)=\"onCheck(false)\" [checked]=\"!estado\" value=false />agotado</label>\n                        </div>\n                        </div>\n                        </div>\n                        {{estado}}\n                            <div *ngIf=\"datos\">\n                        {{datos[0].datos?.title}}\n                            </div>\n                        {{title}}\n                    </my-collap>\n                    </div>\n                    </div>\n                </my-collap>\n               \n               <button type=\"button\" class=\"btn btn-warning\" (click)=\"addb()\">A\u00F1adir</button>\n               <button type=\"button\" class=\"btn btn-warning\" (click)=\"modificar(post)\">Modificar</button>\n            </div>\n            </div>\n",
        }), 
        __metadata('design:paramtypes', [])
    ], Generator);
    return Generator;
}());
exports.Generator = Generator;
//# sourceMappingURL=generator.component.js.map