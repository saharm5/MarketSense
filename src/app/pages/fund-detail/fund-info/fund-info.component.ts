// C: \Users\Sanay\MarketSense\src\app\pages\fund - detail\fund - info\fund - info.component.ts
import { Component, OnInit, inject, Inject } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { InfoTableComponent } from '../../../core/shared/info-table/info-table.component';
import { PLATFORM_ID } from '@angular/core';
import { FundDetailService, FundPerformanceSection } from '../../../services/fund.detail.service';

@Component({
  selector: 'app-fund-info',
  standalone: true,
  imports: [CommonModule, InfoTableComponent],
  templateUrl: './fund-info.component.html',
})
export class FundInfoComponent implements OnInit {
  fundPerformanceData: FundPerformanceSection[] = [];

  private fundService = inject(FundDetailService);

  constructor(@Inject(PLATFORM_ID) private platformId: object) { }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.fundService.getFundPerformanceData().subscribe({
        next: (data) => (this.fundPerformanceData = data),
        error: (err) => console.error('Error loading fund performance data:', err),
      });
    }
  }
}
