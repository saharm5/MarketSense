import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as Highcharts from 'highcharts/highstock';
import { HighchartsChartModule } from 'highcharts-angular';
import { HttpClientModule, HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-market-candlestick',
  standalone: true,
  imports: [CommonModule, HighchartsChartModule, HttpClientModule],
  templateUrl: './market-candlestick.component.html',
  styleUrls: ['./market-candlestick.component.css']
})
export class MarketCandlestickComponent implements OnInit {
  Highcharts: typeof Highcharts = Highcharts;
  chartConstructor = 'stockChart';
  chartOptions: Highcharts.Options = {
    title: { text: 'نمودار شمعی و حجم معاملات', align: 'right' },
    rangeSelector: { selected: 1 },
    tooltip: {
      split: true,
      xDateFormat: '%Y/%m/%d',
      valueDecimals: 0
    },
    series: []
  };

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.http.get<any[]>('assets/json/ohlc-data.json').subscribe(data => {
      // اطمینان از ساختار داده‌ها با استفاده از console.log
      console.log(data);  // بررسی داده‌های دریافتی

      // استخراج داده‌های OHLC برای نمودار شمعی
      const ohlc = data.map(d => [d.time, d.open, d.high, d.low, d.close]);

      // استخراج داده‌های حجم برای نمودار حجم
      const volume = data.map(d => [d.time, d.volume]);

      // تنظیمات نهایی نمودار
      this.chartOptions = {
        ...this.chartOptions,
        series: [
          {
            type: 'candlestick',
            name: 'قیمت',
            data: ohlc,
            color: '#f44336',  // رنگ کندل‌های نزولی
            upColor: '#4caf50'  // رنگ کندل‌های صعودی
          },
          {
            type: 'column',
            name: 'حجم',
            data: volume,
            yAxis: 1,  // اختصاص محور y به نمودار حجم
            color: '#2196f3'  // رنگ ستون‌های حجم
          }
        ],
        yAxis: [
          {
            labels: { align: 'right', x: -5 },
            title: { text: 'قیمت' },
            height: '70%',
            lineWidth: 2
          },
          {
            labels: { align: 'right', x: -5 },
            title: { text: 'حجم' },
            top: '75%',
            height: '25%',
            offset: 0,
            lineWidth: 2
          }
        ]
      };
    });
  }
}
