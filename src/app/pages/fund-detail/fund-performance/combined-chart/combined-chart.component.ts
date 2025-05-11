// src/app/pages/fund-detail/fund-performance/combined-chart/combined-chart.component.ts

import {
  Component,
  Input,
  OnDestroy,
  OnInit,
  inject
} from '@angular/core';
import { CommonModule, isPlatformBrowser, DOCUMENT } from '@angular/common';
import { AreaChartComponent } from '../../../../core/shared/area-chart/area-chart.component';
import { PieChartComponent } from '../../../../core/shared/pie-chart/pie-chart.component';
import { PLATFORM_ID } from '@angular/core';
import { Subscription } from 'rxjs';

interface PieChartData {
  name: string;
  percentage: number;
  color: string;
}

@Component({
  standalone: true,
  selector: 'app-combined-chart',
  imports: [CommonModule, AreaChartComponent, PieChartComponent],
  templateUrl: './combined-chart.component.html',
  styleUrls: ['./combined-chart.component.css']
})
export class CombinedChartComponent implements OnInit, OnDestroy {
  @Input() pieData: PieChartData[] = [];

  @Input() AreaData: Highcharts.SeriesAreaOptions[] = [];

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
