import { Component } from '@angular/core';

@Component({
    selector: 'my-app2',
    templateUrl: 'app/app.component.html'
})
export class App2Component {

    logs: string[] = [];

    log(message) {
        this.logs.push(message);
    }
}

/*
Copyright 2016 thoughtram GmbH. All Rights Reserved.
Use of this source code is governed by an TTML-style license that
can be found in the license.txt file at http://thoughtram.io/license.txt
*/