import { Component, Inject, OnInit, OnDestroy, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule, DOCUMENT, isPlatformBrowser } from '@angular/common';
import { forkJoin, Subscription } from 'rxjs';
import { TopFundsComponent } from "./top-funds/top-funds.component";
import { BannerComponent } from "./banner/banner.component";
import { SearchBarComponent } from "../../core/shared/search-bar/search-bar.component";
import { InvestmentFundsComponent } from "./investment-funds/investment-funds.component";
import { LineChartComponent } from "../../core/shared/line-chart/line-chart.component";
import * as Highcharts from 'highcharts';

interface MarketData {
  time: number;
  volume: number;
}

interface MarketLineData {
  date: string;
  issueNav: number;
  cancelNav: number;
  statisticalNav: number;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    TopFundsComponent,
    BannerComponent,
    SearchBarComponent,
    InvestmentFundsComponent,
    LineChartComponent
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  volumeData: [number, number][] = [];
  priceData: [number, number][] = [];
  isDarkMode = false;
  allSeries: Highcharts.SeriesLineOptions[] = [];

  private observer?: MutationObserver;
  private dataSubscription?: Subscription;
  private chartSubscription?: Subscription;

  constructor(
    private http: HttpClient,
    @Inject(DOCUMENT) private document: Document,
    @Inject(PLATFORM_ID) private platformId: object
  ) { }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.observeThemeChanges();
      this.loadChartData();
      this.loadVolumePriceData();
    }
  }

  observeThemeChanges(): void {
    this.updateTheme();
    this.observer = new MutationObserver(() => this.updateTheme());
    this.observer.observe(this.document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    });
  }

  updateTheme(): void {
    this.isDarkMode = this.document.documentElement.classList.contains('dark');
  }

  toggleTheme(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.document.documentElement.classList.toggle('dark');
      this.updateTheme();
    }
  }

  loadChartData(): void {
    this.chartSubscription = this.http.get<MarketLineData[]>('/assets/json/nav-comparison-data.json')
      .subscribe(data => {
        this.allSeries = [
          this.mapToLineSeries('ارزش ابطال', '#F87171', data, dataItem => dataItem.cancelNav),
          this.mapToLineSeries('ارزش صدور', '#60A5FA', data, dataItem => dataItem.issueNav),
          this.mapToLineSeries('NAV آماری', '#34D399', data, dataItem => dataItem.statisticalNav)
        ];
      });
  }

  mapToLineSeries(
    name: string,
    color: string,
    data: MarketLineData[],
    extractor: (item: MarketLineData) => number
  ): Highcharts.SeriesLineOptions {
    return {
      type: 'line',
      name,
      color,
      data: data.map(item => [new Date(item.date).getTime(), extractor(item)])
    };
  }

  loadVolumePriceData(): void {
    this.dataSubscription = forkJoin({
      volume: this.http.get<MarketData[]>('/assets/json/volume-data.json'),
      price: this.http.get<MarketData[]>('/assets/json/volume-data.json') 
    }).subscribe(({ volume, price }) => {
      this.volumeData = volume.map(item => [item.time, item.volume]);
      this.priceData = price.map(item => [item.time, item.volume]);
    });
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
    this.dataSubscription?.unsubscribe();
    this.chartSubscription?.unsubscribe();
  }
}
