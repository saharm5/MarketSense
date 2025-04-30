import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as Highcharts from 'highcharts/highstock';
import { HighchartsChartModule } from 'highcharts-angular';
import { HttpClientModule, HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-market-chart',
  standalone: true,
  imports: [CommonModule, HighchartsChartModule, HttpClientModule],
  templateUrl: './market-chart.component.html',
  styleUrls: ['./market-chart.component.css']
})
export class MarketChartComponent implements OnInit {
  Highcharts: typeof Highcharts = Highcharts;
  chartConstructor = 'stockChart';
  chartOptions: Highcharts.Options = {
    title: { text: 'نمودار حجم معاملات بورس', align: 'right' },
    series: [{ type: 'line', name: 'حجم', data: [] }]
  };

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.http.get<any[]>('assets/volume-data.json').subscribe(data => {
      const parsed = data.map(d => [new Date(d.date).getTime(), d.volume]);
      this.chartOptions = {
        ...this.chartOptions,
        series: [{
          type: 'line',
          name: 'حجم',
          color: '#00C8B5',
          data: parsed
        }]
      };
    });
  }
}
