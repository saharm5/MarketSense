// src/app/pages/fund-detail/fund-performance/net-asset-value-chart/net-asset-value-chart.component.ts

import { Component } from '@angular/core';
import { ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-net-asset-value-chart',
  standalone: true,
  imports: [BaseChartDirective],
  templateUrl: './net-asset-value-chart.component.html',
  styleUrls: ['./net-asset-value-chart.component.css']
})
export class NetAssetValueChartComponent {
  chartOptions = {
    responsive: true,
  };
  chartData = {
    labels: ['فروردین', 'اردیبهشت', 'خرداد', 'تیر', 'مرداد'],
    datasets: [
      { label: 'ارزش خالص دارایی', data: [100, 110, 120, 115, 125], backgroundColor: '#60A5FA', fill: true },
    ],
  };
  chartType: ChartType = 'line';
}
