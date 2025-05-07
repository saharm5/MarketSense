import { Component, Inject, OnInit, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID } from '@angular/core';
import { Subscription, forkJoin } from 'rxjs';
import { CommonModule } from '@angular/common';
import {  PieChartComponent } from "../../core/shared/pie-chart/pie-chart.component";

interface MarketData {
  time: number;
  date: string;
  volume: number;
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
  selector: 'app-fund-detail',
  standalone: true,
  imports: [ CommonModule, PieChartComponent],
  templateUrl: './fund-detail.component.html',
  styleUrls: ['./fund-detail.component.css']
})
export class FundDetailComponent implements OnInit, OnDestroy {

  volumeData: [number, number][] = [];
  pieData: { name: string, percentage: number }[] = [];
  latestData!: MarketData;
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
      }).subscribe(({ volume }) => {
        // ۳. داده آخر برای نمودار ترکیب دارایی
        this.latestData = volume[volume.length - 1];

        // ۱. دیتا برای نمودار خطی
        this.volumeData = volume.map((item: MarketData) => [item.time, item.volume]);

        // ۲. دیتا برای نمودار pie ساده
        const totalVolume = volume.reduce((acc, curr) => acc + curr.volume, 0);
        this.pieData = volume.map(item => ({
          name: item.date,
          percentage: Number(((item.volume / totalVolume) * 100).toFixed(2)),
        }));

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
    if (this.observer) {
      this.observer.disconnect();
    }
    if (this.dataSubscription) {
      this.dataSubscription.unsubscribe();
    }
  }
}
