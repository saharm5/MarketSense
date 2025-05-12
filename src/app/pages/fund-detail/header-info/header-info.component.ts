// C: \Users\Sanay\MarketSense\src\app\pages\fund - detail\header - info\header - info.component.ts
import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header-info',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header-info.component.html',
  styleUrls: ['./header-info.component.css']
})
export class HeaderInfoComponent {
  leftWidth = 30;
  rightWidth = 70;

  selectedView: 'performance' | 'info' = 'performance';  // مقدار اولیه

  @Output() toggleViewEvent = new EventEmitter<'performance' | 'info'>();

  expand(side: 'left' | 'right') {
    if (side === 'left') {
      this.leftWidth = 70;
      this.rightWidth = 30;
      this.selectedView = 'info';
      this.toggleViewEvent.emit('info');
    } else {
      this.leftWidth = 30;
      this.rightWidth = 70;
      this.selectedView = 'performance';
      this.toggleViewEvent.emit('performance');
    }
  }
}
