// src/app/pages/fund-detail/fund-performance/fund-return-chart/fund-return-chart.component.ts

import { Component } from '@angular/core';
import { ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-fund-return-chart',
  standalone: true,
  imports: [BaseChartDirective],
  templateUrl: './fund-return-chart.component.html',
  styleUrls: ['./fund-return-chart.component.css']
})
export class FundReturnChartComponent {
  chartOptions = {
    responsive: true,
  };
  chartData = {
    labels: ['فروردین', 'اردیبهشت', 'خرداد', 'تیر', 'مرداد'],
    datasets: [
      { label: 'بازده صندوق', data: [5, 10, 15, 8, 12], borderColor: '#4ADE80', fill: false },
    ],
  };
  chartType: ChartType = 'line';
}
