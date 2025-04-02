import { Component } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { MissionListComponent } from './app/components/mission-list/mission-list.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [MissionListComponent],
  template: `
    <h1>SpaceX Launches</h1>
    <app-mission-list></app-mission-list>
  `,
  styles: [`
    h1 {
      text-align: center;
      margin: 20px 0;
    }
  `]
})
export class App {}

bootstrapApplication(App, {
  providers: [
    provideHttpClient(),
    provideAnimations()
  ]
});