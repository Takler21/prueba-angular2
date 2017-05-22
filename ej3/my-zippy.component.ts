import { Component, EventEmitter, Output, Input } from '@angular/core';

@Component({
  selector: 'my-zippy',
  templateUrl: 'app/my-zippy.component.html'
})
export class ZippyComponent {
  @Input() nombre: string;
  @Input() isOpen = true;
  @Output() opened = new EventEmitter();
  @Output() closed = new EventEmitter();
  
  toggle() {
    this.isOpen = !this.isOpen;
    this.isOpen ? this.opened.emit() : this.closed.emit();
  }
}
