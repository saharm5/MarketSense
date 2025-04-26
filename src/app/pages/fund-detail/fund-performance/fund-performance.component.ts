// src/app/pages/fund-detail/fund-performance/fund-performance.component.ts

import { Component } from '@angular/core';
import { AssetCompositionChartComponent } from './asset-composition-chart/asset-composition-chart.component';
import { OwnershipCompositionChartComponent } from './ownership-composition-chart/ownership-composition-chart.component';
import { RealizedProfitChartComponent } from './realized-profit-chart/realized-profit-chart.component';
import { FundReturnChartComponent } from './fund-return-chart/fund-return-chart.component';
import { NetAssetValueChartComponent } from './net-asset-value-chart/net-asset-value-chart.component';

@Component({
  selector: 'app-fund-performance',
  standalone: true,
  imports: [
    AssetCompositionChartComponent,
    OwnershipCompositionChartComponent,
    RealizedProfitChartComponent,
    FundReturnChartComponent,
    NetAssetValueChartComponent
  ],
  templateUrl: './fund-performance.component.html',
  styleUrls: ['./fund-performance.component.css']
})
export class FundPerformanceComponent { }
