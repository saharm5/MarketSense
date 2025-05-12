import { Component, OnInit, inject, Inject } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { InfoTableComponent } from '../../../core/shared/info-table/info-table.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { PLATFORM_ID } from '@angular/core';

interface FundPerformanceItem {
  title: string;
  value: number | string;
}

interface FundPerformanceSection {
  name: string;
  items: FundPerformanceItem[];
}

@Component({
  selector: 'app-fund-info',
  standalone: true,
  imports: [CommonModule, HttpClientModule, InfoTableComponent],
  templateUrl: './fund-info.component.html',
})
export class FundInfoComponent implements OnInit {
  fundPerformanceData: FundPerformanceSection[] = [];

  private http = inject(HttpClient);
  constructor(@Inject(PLATFORM_ID) private platformId: object) { }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.http
        .get<FundPerformanceSection[]>('/assets/json/table-data.json')
        .subscribe({
          next: (data) => (this.fundPerformanceData = data),
          error: (err) => console.error('Error loading data:', err),
        });
    }
  }
}
