import { Component, EventEmitter, Output, Input } from '@angular/core';
import { NgFor, NgIf }         from '@angular/common';
@Component({
  selector: 'my-collap',
  templateUrl: 'app/collapse.component.html'
})
export class CollapseComponent {
  @Input() nombre: string;
  @Input() isOpen = true;
  @Output() opened = new EventEmitter();
  @Output() closed = new EventEmitter();
  
  toggle() {
    this.isOpen = !this.isOpen;
    this.isOpen ? this.opened.emit() : this.closed.emit();
  }
}
