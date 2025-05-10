import { Component, OnInit, OnDestroy, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser, DOCUMENT } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { AreaChartComponent } from "../../../../core/shared/area-chart/area-chart.component";

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
  selector: 'app-ownership-composition',
  standalone: true,
  imports: [CommonModule, HttpClientModule, AreaChartComponent],
  templateUrl: './ownership-composition.component.html',
  styleUrls: ['./ownership-composition.component.css']
})
export class OwnershipCompositionComponent implements OnInit, OnDestroy {
  fiveBestData: [number, number][] = [];
  stockData: [number, number][] = [];
  bondData: [number, number][] = [];
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

      this.dataSubscription = this.http.get<MarketData[]>('/assets/json/volume-data.json')
        .subscribe((data) => {
          this.fiveBestData = data.map(item => [new Date(item.date).getTime(), item.fiveBest]);
          this.stockData = data.map(item => [new Date(item.date).getTime(), item.stock]);
          this.bondData = data.map(item => [new Date(item.date).getTime(), item.bond]);
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
