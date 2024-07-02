import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
   selector: 'app-progress-bar',
   standalone: true,
   imports: [CommonModule],
   templateUrl: './progress-bar.component.html',
   styleUrl: './progress-bar.component.scss',
})
export class ProgressBarComponent {
   initialValue = input<number>();
}
