import { Component, OnInit, OnDestroy, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser, DOCUMENT } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { MarketChartComponent } from "../../../../core/shared/market-chart/market-chart.component";
import * as Highcharts from 'highcharts';

interface MarketData {
  date: string;
  fiveBest: number;
  stock: number;
  bond: number;
  other: number;
  cash: number;
  deposit: number;
  fundUnit: number;
  commodity: number;
}

@Component({
  selector: 'app-asset-composition',
  standalone: true,
  imports: [CommonModule, HttpClientModule, MarketChartComponent],
  templateUrl: './asset-composition.component.html',
  styleUrls: ['./asset-composition.component.css']
})
export class AssetCompositionComponent implements OnInit, OnDestroy {
  isDarkMode = false;
  allSeries: Highcharts.SeriesLineOptions[] = [];

  private observer?: MutationObserver;
  private dataSubscription?: Subscription;

  constructor(
    private http: HttpClient,
    @Inject(DOCUMENT) private document: Document,
    @Inject(PLATFORM_ID) private platformId: object
  ) { }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.updateTheme();

      this.observer = new MutationObserver(() => this.updateTheme());
      this.observer.observe(this.document.documentElement, {
        attributes: true,
        attributeFilter: ['class']
      });

      this.dataSubscription = this.http.get<MarketData[]>('/assets/json/volume-data.json')
        .subscribe((data) => {
          const getSeries = (
            name: string,
            color: string,
            extract: (item: MarketData) => number
          ): Highcharts.SeriesLineOptions => ({
            type: 'line',
            name,
            color,
            data: data.map(item => [new Date(item.date).getTime(), extract(item)])
          });

          this.allSeries = [
            getSeries('واحد صندوق', '#8B5CF6', item => item.fundUnit),
            getSeries('گواهی سپرده کالایی', '#6366F1', item => item.commodity),
            getSeries('سایر سهام', '#00C8B5', item => item.stock),
            getSeries('سایر دارایی ها', '#22C55E', item => item.other),
            getSeries('اوراق مشارکت', '#F26827', item => item.bond),
            getSeries('وجه نقد', '#14B8A6', item => item.cash),
            getSeries('سپرده بانکی', '#0EA5E9', item => item.deposit),
            getSeries('پنج سهم با بیشترین سهم', '#A855F7', item => item.fiveBest),
          ];
        });
    }
  }

  updateTheme(): void {
    this.isDarkMode = this.document.documentElement.classList.contains('dark');
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
    this.dataSubscription?.unsubscribe();
  }
}
