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
var ZippyComponent = (function () {
    function ZippyComponent() {
        this.isOpen = true;
        this.opened = new core_1.EventEmitter();
        this.closed = new core_1.EventEmitter();
    }
    ZippyComponent.prototype.toggle = function () {
        this.isOpen = !this.isOpen;
        this.isOpen ? this.opened.emit() : this.closed.emit();
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], ZippyComponent.prototype, "nombre", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], ZippyComponent.prototype, "isOpen", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], ZippyComponent.prototype, "opened", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], ZippyComponent.prototype, "closed", void 0);
    ZippyComponent = __decorate([
        core_1.Component({
            selector: 'my-zippy',
            templateUrl: 'app/my-zippy.component.html'
        }), 
        __metadata('design:paramtypes', [])
    ], ZippyComponent);
    return ZippyComponent;
}());
exports.ZippyComponent = ZippyComponent;
//# sourceMappingURL=my-zippy.component.js.map