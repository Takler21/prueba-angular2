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
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
require("rxjs/add/operator/map");
require("rxjs/add/operator/catch");
var AppServices = (function () {
    function AppServices(http) {
        this.http = http;
        this.headers = new http_1.Headers({
            'Content-Type': 'application/json',
        });
    }
    AppServices.prototype.getJSON = function () {
        return this.http.get("data.json")
            .map(function (res) { return res.json(); })
            .catch(function (error) { return console.log(error); });
    };
    AppServices.prototype.add = function (body) {
        // let bodyString = JSON.stringify(body); // Stringify payload
        //let headers = new Headers({ 'Content-Type': 'application/json' });
        var options = new http_1.RequestOptions({
            method: http_1.RequestMethod.Post,
            url: 'data.json',
            headers: this.headers
        });
        //return this.http.post("data.json", JSON.stringify(body), { headers: { 'Content-Type': 'application/json' } })
        //  .map((res: Response) => res.json())
        //  .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
        return this.http.post("data.json", JSON.stringify(body), options);
    };
    return AppServices;
}());
AppServices = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], AppServices);
exports.AppServices = AppServices;
//# sourceMappingURL=search.service.js.map