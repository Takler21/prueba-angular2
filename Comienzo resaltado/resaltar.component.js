var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define(["require", "exports", '@angular/core', './search.service', './app.settings'], function (require, exports, core_1, search_service_1, app_settings_1) {
    "use strict";
    var ResaltarComponent = (function () {
        function ResaltarComponent(service) {
            this.service = service;
            this.ids = [];
            this.esta = true;
            this.campos = [];
            this.resalf = new core_1.EventEmitter();
            this.idf = new core_1.EventEmitter();
        }
        ResaltarComponent.prototype.ngOnInit = function () {
            var _this = this;
            this.service.getJSON(app_settings_1.AppSettings.DATA3 + "db").subscribe(function (res) {
                return _this.indica = Object.keys(res);
            }, function (error) { return _this.errorMessage = error; }, function () {
                _this.camposFuncion();
            });
        };
        ResaltarComponent.prototype.camposFuncion = function () {
            var _this = this;
            var aux;
            this.iden = Object.keys(this.indica[0]);
            this.iden.forEach(function (id) {
                if (typeof _this.indica[id] != "object")
                    ;
            });
        };
        ResaltarComponent.prototype.cargar = function () {
            if (this.indica)
                this.idf.emit(this.indica[0]);
        };
        __decorate([
            core_1.Input(), 
            __metadata('design:type', Array)
        ], ResaltarComponent.prototype, "iden", void 0);
        __decorate([
            core_1.Input(), 
            __metadata('design:type', Object)
        ], ResaltarComponent.prototype, "ids", void 0);
        __decorate([
            core_1.Input(), 
            __metadata('design:type', Number)
        ], ResaltarComponent.prototype, "prueba", void 0);
        __decorate([
            core_1.Input(), 
            __metadata('design:type', Array)
        ], ResaltarComponent.prototype, "campos", void 0);
        __decorate([
            core_1.Input(), 
            __metadata('design:type', Array)
        ], ResaltarComponent.prototype, "tipes", void 0);
        __decorate([
            core_1.Output(), 
            __metadata('design:type', Object)
        ], ResaltarComponent.prototype, "resalf", void 0);
        __decorate([
            core_1.Output(), 
            __metadata('design:type', Object)
        ], ResaltarComponent.prototype, "idf", void 0);
        ResaltarComponent = __decorate([
            core_1.Component({
                selector: 'resal',
                template: " \n        <ul *ngIf=\"esta\" class=\"pull-right nav navbar-nav\">\n            <li>\n                <a (click)=\"cargar()\">Resaltar valores</a>\n            </li>\n        </ul>",
                providers: [search_service_1.AppServices],
            }), 
            __metadata('design:paramtypes', [search_service_1.AppServices])
        ], ResaltarComponent);
        return ResaltarComponent;
    }());
    exports.ResaltarComponent = ResaltarComponent;
});
//# sourceMappingURL=resaltar.component.js.map