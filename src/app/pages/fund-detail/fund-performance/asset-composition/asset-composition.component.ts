import { Component, OnInit, OnDestroy, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser, DOCUMENT } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { MarketChartComponent } from "../../../../core/shared/market-chart/market-chart.component";
import * as Highcharts from 'highcharts';

interface MarketLineData {
  date: string;
  netAsset: number;
  unitsSubDAY: number;
  unitsRedDAY: number;
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

      this.dataSubscription = this.http.get<MarketLineData[]>('/assets/json/asset-comparison-value-data.json')
        .subscribe((data) => {
          const getSeries = (
            name: string,
            color: string,
            extract: (item: MarketLineData) => number
          ): Highcharts.SeriesLineOptions => ({
            type: 'line',
            name,
            color,
            data: data.map(item => [new Date(item.date).getTime(), extract(item)])
          });

          this.allSeries = [
            getSeries('ارزش ابطال', '#F87171', item => item.unitsSubDAY),
            getSeries('ارزش صدور', '#60A5FA', item => item.netAsset),
            getSeries('NAV آماری', '#34D399', item => item.unitsRedDAY),
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
