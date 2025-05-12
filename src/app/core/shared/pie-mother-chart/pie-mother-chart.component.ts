
import { Component, Inject, OnInit, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule, DOCUMENT, isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID } from '@angular/core';
import { Subscription } from 'rxjs';
import { PieChartComponent } from '../pie-chart/pie-chart.component';

interface MarketData {
  date: string;
  volume: number;
  stock: number;
  bond: number;
  other: number;
  cash: number;
  deposit: number;
  fiveBest: number;
  fundUnit: number;
  commodity: number;
}
interface PieChartData {
  name: string;
  percentage: number;
  color: string;
}

@Component({
  selector: 'app-pie-mother-chart',
  standalone: true,
  imports: [CommonModule, PieChartComponent],
  templateUrl: './pie-mother-chart.component.html',
  styleUrl: './pie-mother-chart.component.css'
})
export class PieMotherChartComponent implements OnInit, OnDestroy {
  pieData: PieChartData[] = [];
  assetData: PieChartData[] = [];
  isDarkMode = false;
  private observer?: MutationObserver;
  private dataSub?: Subscription;

  constructor(
    private http: HttpClient,
    @Inject(DOCUMENT) private document: Document,
    @Inject(PLATFORM_ID) private platformId: object
  ) { }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.updateTheme();
      this.observeTheme();

      this.dataSub = this.http.get<MarketData[]>('/assets/json/volume-data.json')
        .subscribe(data => {
          const latest = data[data.length - 1];
          this.pieData = [
            { name: 'واحد صندوق', percentage: latest.fundUnit, color: '#8B5CF6' },
            { name: 'گواهی سپرده کالایی', percentage: latest.commodity, color: '#6366F1' },
            { name: 'سایر سهام', percentage: latest.stock, color: '#00C8B5' },
            { name: 'سایر دارایی ها', percentage: latest.other, color: '#22C55E' },
            { name: 'اوراق مشارکت', percentage: latest.bond, color: '#F26827' },
            { name: 'وجه نقد', percentage: latest.cash, color: '#14B8A6' },
            { name: 'سپرده بانکی', percentage: latest.deposit, color: '#0EA5E9' },
            { name: 'پنج سهم با بیشترین سهم', percentage: latest.fiveBest, color: '#A855F7' },
          ];
          this.assetData = [...this.pieData];
        });
    }
  }

  observeTheme(): void {
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
    this.document.documentElement.classList.toggle('dark');
    this.updateTheme();
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
    this.dataSub?.unsubscribe();
  }
}
