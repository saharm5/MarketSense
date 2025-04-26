// src/app/pages/fund-detail/fund-performance/asset-composition-chart/asset-composition-chart.component.ts

import { Component } from '@angular/core';
import { ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-asset-composition-chart',
  standalone: true,
  imports: [BaseChartDirective],
  templateUrl: './asset-composition-chart.component.html',
  styleUrls: ['./asset-composition-chart.component.css']
})
export class AssetCompositionChartComponent {
  chartOptions = {
    responsive: true,
  };
  chartData = {
    labels: ['سهام', 'اوراق قرضه', 'نقدینگی'],
    datasets: [
      { data: [55, 25, 20], backgroundColor: ['#34D399', '#60A5FA', '#FBBF24'] },
    ],
  };
  chartType: ChartType = 'doughnut';
}
