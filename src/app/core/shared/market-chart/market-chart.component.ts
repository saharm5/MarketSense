// C:\Users\Sanay\market-sense-ssr\src\app\core\shared\market-chart\market-chart.component.ts
import {
  Component,
  Input,
  OnInit,
  OnChanges,
  SimpleChanges,
  AfterViewInit,
  ElementRef,
  Inject,
  PLATFORM_ID,
} from '@angular/core';
import { CommonModule, DOCUMENT, isPlatformBrowser } from '@angular/common';
import * as Highcharts from 'highcharts/highstock';
import { HighchartsChartModule } from 'highcharts-angular';

@Component({
  selector: 'app-market-chart',
  standalone: true,
  imports: [CommonModule, HighchartsChartModule],
  templateUrl: './market-chart.component.html',
  styleUrls: ['./market-chart.component.css'],
})
export class MarketChartComponent implements OnInit, OnChanges, AfterViewInit {
  Highcharts: typeof Highcharts = Highcharts;
  chartConstructor = 'stockChart';
  chartOptions!: Highcharts.Options;

  @Input() title = 'چارت پیش‌فرض';
  @Input() seriesData: Highcharts.SeriesLineOptions['data'] = [];
  @Input() seriesName = 'داده‌ها';
  @Input() color = '#00C8B5';
  @Input() isDarkMode = false;

  private chartRef?: Highcharts.Chart;

  constructor(
    private el: ElementRef,
    @Inject(DOCUMENT) private document: Document,
    @Inject(PLATFORM_ID) private platformId: object
  ) { }

  ngOnInit(): void {
    this.setChartOptions();
  }

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      setTimeout(() => {
        this.chartRef = this.el.nativeElement.querySelector('highcharts-chart')?.chart;
      });
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['isDarkMode'] && !changes['isDarkMode'].firstChange) {
      this.setChartOptions();
      this.chartRef?.update(this.chartOptions as Highcharts.Options);
    }
  }

  setChartOptions(): void {
    let textColor = '#000';
    let bgColor = '#ffffff';
    let gridColor = '#e6e6e6';

    if (isPlatformBrowser(this.platformId)) {
      const root = this.document.documentElement;
      textColor =
        getComputedStyle(root).getPropertyValue('--text-color').trim() || (this.isDarkMode ? '#fff' : '#000');
      bgColor =
        getComputedStyle(root).getPropertyValue('--chart-bg').trim() || (this.isDarkMode ? '#264553' : '#ffffff');
      gridColor = this.isDarkMode ? '#444' : '#e6e6e6';
    }

    this.chartOptions = {
      chart: {
        backgroundColor: bgColor,
        styledMode: false,
      },
      title: {
        text: this.title,
        align: 'right',
        style: {
          color: textColor,
        },
      },
      xAxis: {
        labels: {
          style: {
            color: textColor,
          },
        },
      },
      yAxis: {
        labels: {
          style: {
            color: textColor,
          },
        },
        gridLineColor: gridColor,
      },
      legend: {
        itemStyle: {
          color: textColor,
        },
      },
      credits: { enabled: false },
      series: [
        {
          type: 'line',
          name: this.seriesName,
          data: this.seriesData,
          color: this.color,
        },
      ],
    };
  }
}
