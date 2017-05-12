import { Component, EventEmitter, Output, Input, OnInit } from '@angular/core';
import { NgFor, NgIf }         from '@angular/common';
@Component({
  selector: 'my-collap',
  templateUrl: 'app/collapse.component.html'
})
export class CollapseComponent implements OnInit {
  @Input() nombre: string;
  @Input() id: string;
  @Input() ref: string;
  @Input() isOpen = true;
  @Output() opened = new EventEmitter();
  @Output() closed = new EventEmitter();


ngOnInit() {
    if (this.id)
    {
        this.ref = "index.html#" + this.id;
    }
}

  toggle() {
    this.isOpen = !this.isOpen;
    this.isOpen ? this.opened.emit() : this.closed.emit();
  }
}
