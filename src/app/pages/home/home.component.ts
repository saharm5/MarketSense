import { Component, Inject, OnInit, PLATFORM_ID, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule, DOCUMENT, isPlatformBrowser } from '@angular/common';
import { MarketChartComponent } from "../../core/shared/market-chart/market-chart.component";
import { TopFundsComponent } from "./top-funds/top-funds.component";
import { BannerComponent } from "./banner/banner.component";
import { SearchBarComponent } from "../../core/shared/search-bar/search-bar.component";
import { forkJoin, Subscription } from 'rxjs';
import { InvestmentFundsComponent } from "./investment-funds/investment-funds.component";

interface MarketData {
  time: number;
  volume: number;
}

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  imports: [MarketChartComponent, TopFundsComponent, BannerComponent, SearchBarComponent, CommonModule, InvestmentFundsComponent]
})
export class HomeComponent implements OnInit, OnDestroy {
  volumeData: [number, number][] = [];
  priceData: [number, number][] = [];
  isDarkMode = false;

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

      this.observer = new MutationObserver(() => {
        this.updateTheme();
      });

      this.observer.observe(this.document.documentElement, {
        attributes: true,
        attributeFilter: ['class']
      });

      this.dataSubscription = forkJoin({
        volume: this.http.get<MarketData[]>('/assets/json/volume-data.json'),
        price: this.http.get<MarketData[]>('/assets/json/volume-data.json')
      }).subscribe(({ volume, price }) => {
        this.volumeData = volume.map(item => [item.time, item.volume]);
        this.priceData = price.map(item => [item.time, item.volume]);
      });
    }
  }

  updateTheme(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.isDarkMode = this.document.documentElement.classList.contains('dark');
    }
  }

  toggleTheme(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.document.documentElement.classList.toggle('dark');
      this.updateTheme();
    }
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
    this.dataSubscription?.unsubscribe();
  }
}
