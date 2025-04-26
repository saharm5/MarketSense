// src/app/pages/fund-detail/fund-performance/realized-profit-chart/realized-profit-chart.component.ts

import { Component } from '@angular/core';
import { ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-realized-profit-chart',
  standalone: true,
  imports: [BaseChartDirective],
  templateUrl: './realized-profit-chart.component.html',
  styleUrls: ['./realized-profit-chart.component.css']
})
export class RealizedProfitChartComponent {
  chartOptions = {
    responsive: true,
  };
  chartData = {
    labels: ['فروردین', 'اردیبهشت', 'خرداد', 'تیر', 'مرداد'],
    datasets: [
      { label: 'سود محقق شده', data: [20, 30, 50, 40, 60], backgroundColor: '#60A5FA' },
    ],
  };
  chartType: ChartType = 'bar';
}
