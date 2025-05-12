import {
  Component,
  Input,
  OnInit,
  OnChanges,
  SimpleChanges,
  AfterViewInit,
  ElementRef,
  Inject,
  PLATFORM_ID
} from '@angular/core';
import { CommonModule, DOCUMENT, isPlatformBrowser } from '@angular/common';
import * as Highcharts from 'highcharts/highstock';
import { HighchartsChartModule } from 'highcharts-angular';

@Component({
  selector: 'app-area-chart',
  standalone: true,
  imports: [CommonModule, HighchartsChartModule],
  templateUrl: './area-chart.component.html',
  styleUrls: ['./area-chart.component.css'],
})
export class AreaChartComponent implements OnInit, OnChanges, AfterViewInit {
  Highcharts: typeof Highcharts = Highcharts;
  chartConstructor = 'stockChart';
  chartOptions!: Highcharts.Options;

  @Input() seriesData: Highcharts.SeriesAreaOptions['data'] = [];
  @Input() seriesName = 'داده‌ها';
  @Input() color = '#00C8B5';
  @Input() isDarkMode = false;
  @Input() customSeries: Highcharts.SeriesAreaOptions[] = [];

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
      this.chartRef?.update(this.chartOptions);
    }
  }

  setChartOptions(): void {
    let textColor = '#000';
    let bgColor = '#ffffff';
    let gridColor = '#e6e6e6';

    if (isPlatformBrowser(this.platformId)) {
      const root = this.document.documentElement;
      textColor = getComputedStyle(root).getPropertyValue('--text-color').trim() || (this.isDarkMode ? '#fff' : '#000');
      bgColor = getComputedStyle(root).getPropertyValue('--chart-bg').trim() || (this.isDarkMode ? '#264553' : '#ffffff');
      gridColor = this.isDarkMode ? '#444' : '#e6e6e6';
    }

    this.chartOptions = {
      chart: {
        backgroundColor: bgColor,
        styledMode: false,
      },
      rangeSelector: {
        selected: 0,
        inputEnabled: true,
        buttons: [
          { type: 'month', count: 1, text: '1m' },
          { type: 'month', count: 3, text: '3m' },
          { type: 'month', count: 6, text: '6m' },
          { type: 'year', count: 1, text: '1y' },
          { type: 'all', text: 'همه' }
        ]
      },
      xAxis: {
        labels: { style: { color: textColor } },
        type: 'datetime'
      },
      yAxis: {
        labels: { style: { color: textColor } },
        gridLineColor: gridColor
      },
      legend: {
        itemStyle: { color: textColor },
      },
      tooltip: {
        shared: true,
        backgroundColor: bgColor,
        style: { color: textColor }
      },
      credits: { enabled: false },
      series: this.customSeries.length ? this.customSeries : [
        {
          type: 'area',
          name: this.seriesName,
          data: this.seriesData,
          color: this.color,
          fillOpacity: 0.9,
        },
      ],
    };
  }
}
