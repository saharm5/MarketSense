import { Component, Inject, OnInit, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID } from '@angular/core';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { PieChartComponent } from '../../core/shared/pie-chart/pie-chart.component';

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

@Component({
  selector: 'app-fund-detail',
  standalone: true,
  imports: [CommonModule, PieChartComponent],
  templateUrl: './fund-detail.component.html',
  styleUrls: ['./fund-detail.component.css']
})
export class FundDetailComponent implements OnInit, OnDestroy {
  pieData: { name: string, percentage: number }[] = [];
  assetData: { name: string; percentage: number }[] = [];
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
            { name: 'واحد صندوق', percentage: latest.fundUnit },
            { name: 'گواهی سپرده کالایی', percentage: latest.commodity },
            { name: 'سایر سهام', percentage: latest.stock },
            { name: 'سایر دارایی ها', percentage: latest.other },
            { name: 'اوراق مشارکت', percentage: latest.bond },
            { name: 'وجه نقد', percentage: latest.cash },
            { name: 'سپرده بانکی', percentage: latest.deposit },
            { name: 'پنج سهم با بیشترین سهم', percentage: latest.fiveBest },
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
