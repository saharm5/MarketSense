import { Component } from '@angular/core';
import { FundInfoComponent } from './fund-info/fund-info.component';
import { FundPerformanceComponent } from './fund-performance/fund-performance.component';

@Component({
  selector: 'app-fund-detail',
  standalone: true,
  imports: [FundInfoComponent, FundPerformanceComponent], 
  templateUrl: './fund-detail.component.html',
  styleUrls: ['./fund-detail.component.css']
})
export class FundDetailComponent { }
