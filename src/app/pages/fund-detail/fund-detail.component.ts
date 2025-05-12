import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FundPerformanceComponent } from './fund-performance/fund-performance.component';
import { FundInfoComponent } from './fund-info/fund-info.component';
import { HeaderInfoComponent } from './header-info/header-info.component';

@Component({
  selector: 'app-fund-detail',
  standalone: true,
  imports: [
    CommonModule,
    FundPerformanceComponent,
    FundInfoComponent,
    HeaderInfoComponent
  ],
  templateUrl: './fund-detail.component.html',
  styleUrls: ['./fund-detail.component.css']
})
export class FundDetailComponent {
  showPerformance = false;
  onToggleView(view: 'info' | 'performance') {
    this.showPerformance = (view === 'info');
  }
}