import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header-info',
  standalone: true,
  imports:  [CommonModule],
  templateUrl: './header-info.component.html',
  styleUrls:  ['./header-info.component.css']
})
export class HeaderInfoComponent {
  leftWidth = 30;  
  rightWidth = 70;

  @Output() toggleViewEvent = new EventEmitter<'performance' | 'info'>();

  expand(side: 'left' | 'right') {
    if (side === 'left') {
      this.leftWidth = 70;
      this.rightWidth = 30;
      this.toggleViewEvent.emit('info');
    } else {
      this.leftWidth = 30;
      this.rightWidth = 70;
      this.toggleViewEvent.emit('performance');
    }
  }
} 