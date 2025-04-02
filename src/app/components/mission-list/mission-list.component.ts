import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { SpaceXService } from '../../services/spacex.service';
import { Mission } from '../../interfaces/mission.interface';
import { MissionFilterComponent } from '../mission-filter/mission-filter.component';
import { MissionDetailsComponent } from '../mission-details/mission-details.component';

@Component({
  selector: 'app-mission-list',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MissionFilterComponent, MissionDetailsComponent],
  template: `
    <div class="mission-list">
      <app-mission-filter (yearSelected)="filterByYear($event)"></app-mission-filter>
      
      <div class="missions-grid">
        <mat-card *ngFor="let mission of missions">
          <mat-card-header>
            <mat-card-title>{{ mission.mission_name }}</mat-card-title>
            <mat-card-subtitle>Flight #{{ mission.flight_number }} - {{ mission.launch_year }}</mat-card-subtitle>
          </mat-card-header>
          
          <img mat-card-image [src]="mission.links.mission_patch_small" [alt]="mission.mission_name">
          
          <mat-card-content>
            <p>{{ mission.details }}</p>
            <p>Rocket: {{ mission.rocket.rocket_name }} ({{ mission.rocket.rocket_type }})</p>
          </mat-card-content>
          
          <mat-card-actions>
            <button mat-button (click)="selectMission(mission)">View Details</button>
            <a mat-button [href]="mission.links.article_link" target="_blank">Article</a>
            <a mat-button [href]="mission.links.wikipedia" target="_blank">Wikipedia</a>
            <a mat-button [href]="mission.links.video_link" target="_blank">Video</a>
          </mat-card-actions>
        </mat-card>
      </div>

      <app-mission-details 
        *ngIf="selectedMission"
        [mission]="selectedMission"
        (close)="selectedMission = null">
      </app-mission-details>
    </div>
  `,
  styles: [`
    .mission-list {
      padding: 20px;
    }
    .missions-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 20px;
      margin-top: 20px;
    }
    mat-card {
      margin-bottom: 20px;
    }
    mat-card-content {
      margin: 16px 0;
    }
    img {
      max-height: 200px;
      object-fit: contain;
    }
  `]
})
export class MissionListComponent implements OnInit {
  missions: Mission[] = [];
  selectedMission: Mission | null = null;

  constructor(private spaceXService: SpaceXService) {}

  ngOnInit() {
    this.loadMissions();
  }

  loadMissions() {
    this.spaceXService.getAllMissions().subscribe(
      missions => this.missions = missions
    );
  }

  filterByYear(year: string) {
    this.spaceXService.getMissionByYear(year).subscribe(
      missions => this.missions = missions
    );
  }

  selectMission(mission: Mission) {
    this.selectedMission = mission;
  }
}