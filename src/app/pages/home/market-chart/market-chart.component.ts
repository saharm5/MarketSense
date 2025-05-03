import { Component, Input, OnInit, OnChanges, SimpleChanges, AfterViewInit, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as Highcharts from 'highcharts/highstock';
import { HighchartsChartModule } from 'highcharts-angular';

@Component({
  selector: 'app-market-chart',
  standalone: true,
  imports: [CommonModule, HighchartsChartModule],
  templateUrl: './market-chart.component.html',
  styleUrls: ['./market-chart.component.css']
})
export class MarketChartComponent implements OnInit, OnChanges, AfterViewInit {
  Highcharts: typeof Highcharts = Highcharts;
  chartConstructor = 'stockChart';
  chartOptions!: Highcharts.Options;

  @Input() title: string = 'چارت پیش‌فرض';
  @Input() seriesData: any[] = [];
  @Input() seriesName: string = 'داده‌ها';
  @Input() color: string = '#00C8B5';
  @Input() isDarkMode: boolean = false;

  private chartRef?: Highcharts.Chart;

  constructor(private el: ElementRef) { }

  ngOnInit(): void {
    this.setChartOptions();
  }

  ngAfterViewInit(): void {
    // ذخیره رفرنس چارت برای رفرش در آینده
    setTimeout(() => {
      this.chartRef = this.el.nativeElement.querySelector('highcharts-chart')?.chart;
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['isDarkMode'] && !changes['isDarkMode'].firstChange) {
      this.setChartOptions();

      // رفرش دستی چارت (در صورت موجود بودن رفرنس)
      if (this.chartRef) {
        this.chartRef.update(this.chartOptions as any);
      }
    }
  }

  setChartOptions(): void {
    const textColor = getComputedStyle(document.documentElement).getPropertyValue('--text-color').trim() || (this.isDarkMode ? '#fff' : '#000');
    const bgColor = getComputedStyle(document.documentElement).getPropertyValue('--chart-bg').trim() || (this.isDarkMode ? '#264553' : '#ffffff');
    const gridColor = this.isDarkMode ? '#444' : '#e6e6e6';

    this.chartOptions = {
      chart: {
        backgroundColor: bgColor,
        styledMode: false // اگر از styledMode استفاده نمی‌کنی
      },
      title: {
        text: this.title,
        align: 'right',
        style: {
          color: textColor
        }
      },
      xAxis: {
        labels: {
          style: {
            color: textColor
          }
        }
      },
      yAxis: {
        labels: {
          style: {
            color: textColor
          }
        },
        gridLineColor: gridColor
      },
      legend: {
        itemStyle: {
          color: textColor
        }
      },
      credits: { enabled: false },
      series: [{
        type: 'line',
        name: this.seriesName,
        data: this.seriesData,
        color: this.color
      }]
    };
  }
}
