import { Component, signal } from '@angular/core';

@Component({
  selector: 'cms-root',
  templateUrl: './app.html',
  standalone: false,
  styleUrls: ['./app.css'],
})
export class App {
  protected readonly title = signal('cms');
  selectFeature: string = 'documents';
}