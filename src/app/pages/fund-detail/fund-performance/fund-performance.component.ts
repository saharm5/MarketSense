import { Component } from '@angular/core';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration } from 'chart.js';

@Component({
  selector: 'app-fund-performance',
  standalone: true,
  imports: [BaseChartDirective],
  templateUrl: './fund-performance.component.html',
  styleUrls: ['./fund-performance.component.css']
})
export class FundPerformanceComponent {
  pieChartData: ChartConfiguration<'pie'>['data'] = {
    labels: ['سهام', 'اوراق بدهی', 'سپرده بانکی'],
    datasets: [{
      data: [40, 35, 25],
      backgroundColor: ['#4ade80', '#60a5fa', '#facc15']
    }]
  };

  lineChartData: ChartConfiguration<'line'>['data'] = {
    labels: ['فروردین', 'اردیبهشت', 'خرداد', 'تیر'],
    datasets: [
      {
        data: [10, 20, 30, 40],
        label: 'ارزش خالص دارایی',
        fill: false,
        tension: 0.4,
        borderColor: '#60a5fa'
      }
    ]
  };
}
