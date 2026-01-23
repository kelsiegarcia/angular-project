import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'cms-header',
  standalone: false,
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  // Define the output event emitter
  @Output () selectedFeatureEvent = new EventEmitter<string>();
  // Emit the selected feature event to the parent component
  onSelected(selectedEvent: string) {
    this.selectedFeatureEvent.emit(selectedEvent);
  }
}
