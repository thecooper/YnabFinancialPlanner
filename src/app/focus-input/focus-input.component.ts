import { Component, OnInit, Input, Output, ViewChild, ElementRef, EventEmitter, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-focus-input',
  templateUrl: './focus-input.component.html',
  styleUrls: ['./focus-input.component.css']
})
export class FocusInputComponent implements AfterViewInit {

  @Input() value: string;
  @Input() placeholder: string;

  @Output() keyup: EventEmitter<KeyboardEvent> = new EventEmitter<KeyboardEvent>();
  @Output() valueChanged: EventEmitter<string> = new EventEmitter<string>();

  @ViewChild('allotmentUpdateField') allotmentUpdateField: ElementRef;

  constructor() { }

  ngAfterViewInit() {
    this.allotmentUpdateField.nativeElement.focus();
    this.allotmentUpdateField.nativeElement.setSelectionRange(1, this.value.length);
  }

  keyPressEvent(event: KeyboardEvent) {
    const inputValue = this.allotmentUpdateField.nativeElement.value;

    if (inputValue !== this.value) {
      this.valueChanged.emit(inputValue);
    }
    this.keyup.emit(event);
  }
}
