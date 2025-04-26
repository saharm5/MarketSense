// src/app/pages/fund-detail/fund-performance/ownership-composition-chart/ownership-composition-chart.component.ts

import { Component } from '@angular/core';
import { ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-ownership-composition-chart',
  standalone: true,
  imports: [BaseChartDirective],
  templateUrl: './ownership-composition-chart.component.html',
  styleUrls: ['./ownership-composition-chart.component.css']
})
export class OwnershipCompositionChartComponent {
  chartOptions = {
    responsive: true,
  };
  chartData = {
    labels: ['حقوقی', 'حقیقی'],
    datasets: [
      { data: [70, 30], backgroundColor: ['#4ADE80', '#F87171'] },
    ],
  };
  chartType: ChartType = 'pie';
}
