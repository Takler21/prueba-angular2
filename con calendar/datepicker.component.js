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
    var DateComponent = (function () {
        function DateComponent() {
            this.dt = new Date();
            this.minDate = null;
            this.formats = ['DD-MM-YYYY', 'YYYY/MM/DD', 'DD.MM.YYYY', 'shortDate'];
            this.format = this.formats[0];
            this.mandar = new core_1.EventEmitter();
            this.dateOptions = {
                formatYear: 'YY',
                startingDay: 1
            };
            this.opened = false;
        }
        DateComponent.prototype.ngOnInit = function () {
            if (this.dat)
                this.dt.setDate(this.dat);
        };
        DateComponent.prototype.ngOnChanges = function () {
            this.man = String(this.dt.getFullYear() + "-" + this.dt.getMonth() + "-" + this.dt.getDate());
            this.mandar.emit(this.man);
        };
        DateComponent.prototype.getDate = function () {
            return this.dt && this.dt.getTime() || new Date().getTime();
        };
        __decorate([
            core_1.Input(), 
            __metadata('design:type', Object)
        ], DateComponent.prototype, "dat", void 0);
        __decorate([
            core_1.Output(), 
            __metadata('design:type', Object)
        ], DateComponent.prototype, "mandar", void 0);
        DateComponent = __decorate([
            core_1.Component({
                selector: 'date-p',
                template: "\n          \n                <datepicker style=\"display:inline-block; min-height:290px;\" [(ngModel)]=\"dt\" [minDate]=\"minDate\" [showWeeks]=\"false\" [startingDay]=\"1\"></datepicker>\n\n  ",
            }), 
            __metadata('design:paramtypes', [])
        ], DateComponent);
        return DateComponent;
    }());
    exports.DateComponent = DateComponent;
});
//# sourceMappingURL=datepicker.component.js.map