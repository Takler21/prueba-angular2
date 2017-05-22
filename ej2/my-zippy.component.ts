import { Component, EventEmitter, Output, Input } from '@angular/core';

@Component({
  selector: 'my-zippy',
  templateUrl: 'app/my-zippy.component.html'
})
export class ZippyComponent {
  
  @Input() isOpen = true;
  @Output() opened = new EventEmitter();
  @Output() closed = new EventEmitter();
  
  toggle() {
    this.isOpen = !this.isOpen;
    this.isOpen ? this.opened.emit() : this.closed.emit();
  }
}

/*
Copyright 2016 thoughtram GmbH. All Rights Reserved.
Use of this source code is governed by an TTML-style license that
can be found in the license.txt file at http://thoughtram.io/license.txt
*/