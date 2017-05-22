"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
var core_1 = require("@angular/core");
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
    return ZippyComponent;
}());
__decorate([
    core_1.Input()
], ZippyComponent.prototype, "isOpen");
__decorate([
    core_1.Output()
], ZippyComponent.prototype, "opened");
__decorate([
    core_1.Output()
], ZippyComponent.prototype, "closed");
ZippyComponent = __decorate([
    core_1.Component({
        selector: 'my-zippy',
        templateUrl: 'app/my-zippy.component.html'
    })
], ZippyComponent);
exports.ZippyComponent = ZippyComponent;
/*
Copyright 2016 thoughtram GmbH. All Rights Reserved.
Use of this source code is governed by an TTML-style license that
can be found in the license.txt file at http://thoughtram.io/license.txt
*/ 
