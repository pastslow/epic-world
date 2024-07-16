import { Component, computed, input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
   selector: 'app-progress-bar',
   standalone: true,
   imports: [CommonModule],
   templateUrl: './progress-bar.component.html',
   styleUrl: './progress-bar.component.scss',
})
export class ProgressBarComponent {
   currentValue = input(0);
   totalValue = input(0);
   barWidthPercent = computed(() => (this.currentValue() * 100) / this.totalValue());
}
