var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define(["require", "exports", '@angular/core'], function (require, exports, core_1) {
    "use strict";
    var FormNoReq = (function () {
        function FormNoReq() {
            this.inputCreate = new core_1.EventEmitter();
        }
        FormNoReq.prototype.ngOnChanges = function (changes) {
            this.inputCreate.emit(this.obj);
        };
        FormNoReq.prototype.clRadio = function (check, key, val) {
            if (check == false && val == this.obj[key]) {
                this.obj[key] = null;
            }
            else {
                this.obj[key] = val;
            }
        };
        __decorate([
            core_1.Input(), 
            __metadata('design:type', String)
        ], FormNoReq.prototype, "key", void 0);
        __decorate([
            //creo que aqui es input porque  el valor vendra del otro componente
            core_1.Input(), 
            __metadata('design:type', Array)
        ], FormNoReq.prototype, "tipes", void 0);
        __decorate([
            core_1.Input(), 
            __metadata('design:type', Object)
        ], FormNoReq.prototype, "obj", void 0);
        __decorate([
            core_1.Output(), 
            __metadata('design:type', Object)
        ], FormNoReq.prototype, "inputCreate", void 0);
        FormNoReq = __decorate([
            core_1.Component({
                selector: 'form-noReq',
                templateUrl: 'app/formNoR.component.html',
            }), 
            __metadata('design:paramtypes', [])
        ], FormNoReq);
        return FormNoReq;
    }());
    exports.FormNoReq = FormNoReq;
});
//# sourceMappingURL=formNoR.component.js.map