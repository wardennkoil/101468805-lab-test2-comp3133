import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { Mission } from '../../interfaces/mission.interface';

@Component({
  selector: 'app-mission-details',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonModule],
  template: `
    <div class="mission-details-overlay">
      <div class="mission-details-content">
        <h2>{{ mission.mission_name }} Details</h2>
        
        <div class="details-grid">
          <div class="detail-item">
            <strong>Flight Number:</strong> {{ mission.flight_number }}
          </div>
          <div class="detail-item">
            <strong>Launch Year:</strong> {{ mission.launch_year }}
          </div>
          <div class="detail-item">
            <strong>Rocket:</strong> {{ mission.rocket.rocket_name }}
          </div>
          <div class="detail-item">
            <strong>Rocket Type:</strong> {{ mission.rocket.rocket_type }}
          </div>
        </div>

        <div class="mission-patch">
          <img [src]="mission.links.mission_patch_small" [alt]="mission.mission_name">
        </div>

        <div class="mission-details">
          <h3>Mission Details</h3>
          <p>{{ mission.details }}</p>
        </div>

        <div class="mission-links">
          <h3>External Links</h3>
          <a [href]="mission.links.article_link" target="_blank" mat-button>Article</a>
          <a [href]="mission.links.wikipedia" target="_blank" mat-button>Wikipedia</a>
          <a [href]="mission.links.video_link" target="_blank" mat-button>Video</a>
        </div>

        <button mat-raised-button color="primary" (click)="close.emit()">Close</button>
      </div>
    </div>
  `,
  styles: [`
    .mission-details-overlay {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.7);
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 1000;
    }
    .mission-details-content {
      background: white;
      padding: 20px;
      border-radius: 8px;
      max-width: 600px;
      width: 90%;
      max-height: 90vh;
      overflow-y: auto;
    }
    .details-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 16px;
      margin: 20px 0;
    }
    .mission-patch {
      text-align: center;
      margin: 20px 0;
    }
    .mission-patch img {
      max-width: 200px;
    }
    .mission-links {
      margin: 20px 0;
    }
    .mission-links a {
      margin-right: 10px;
    }
  `]
})
export class MissionDetailsComponent {
  @Input() mission!: Mission;
  @Output() close = new EventEmitter<void>();
}