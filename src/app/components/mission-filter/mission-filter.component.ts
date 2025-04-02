import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-mission-filter',
  standalone: true,
  imports: [CommonModule, FormsModule, MatFormFieldModule, MatSelectModule],
  template: `
    <mat-form-field>
      <mat-label>Filter by Launch Year</mat-label>
      <mat-select (selectionChange)="onYearChange($event.value)">
        <mat-option *ngFor="let year of years" [value]="year">
          {{ year }}
        </mat-option>
      </mat-select>
    </mat-form-field>
  `,
  styles: [`
    mat-form-field {
      width: 200px;
      margin: 20px 0;
    }
  `]
})
export class MissionFilterComponent {
  @Output() yearSelected = new EventEmitter<string>();
  
  years: string[] = Array.from(
    { length: new Date().getFullYear() - 2005 + 1 },
    (_, i) => (2005 + i).toString()
  );

  onYearChange(year: string) {
    this.yearSelected.emit(year);
  }
}