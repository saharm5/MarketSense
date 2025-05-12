import { Component, OnInit, OnDestroy, PLATFORM_ID, Input, inject } from '@angular/core';
import { CommonModule, isPlatformBrowser, DOCUMENT } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { MarketChartComponent } from "./market-chart/market-chart.component";
import * as Highcharts from 'highcharts';


@Component({
  selector: 'app-line-chart',
  standalone: true,
  imports: [CommonModule, HttpClientModule, MarketChartComponent],
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.css']
})
export class LineChartComponent implements OnInit, OnDestroy {
  
  @Input() LineData: Highcharts.SeriesLineOptions[] = [];

  isDarkMode = false;

  private readonly document = inject(DOCUMENT);
  private readonly platformId = inject(PLATFORM_ID);

  private observer?: MutationObserver;
  private dataSubscription?: Subscription;

  ngOnInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    this.updateTheme();
    this.observeTheme();
  }

  updateTheme(): void {
    this.isDarkMode = this.document.documentElement.classList.contains('dark');
  }

  observeTheme(): void {
    this.observer = new MutationObserver(() => this.updateTheme());
    this.observer.observe(this.document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    });
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
    this.dataSubscription?.unsubscribe();
  }
}
