import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BannerComponent } from './banner/banner.component';
import { SearchBarComponent } from "../../core/shared/search-bar/search-bar.component";
import { TopFundsComponent } from "./top-funds/top-funds.component";
import { MarketCandlestickComponent } from "./market-candlestick/market-candlestick.component";
import { MarketChartComponent } from './market-chart/market-chart.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, BannerComponent, SearchBarComponent, TopFundsComponent, MarketChartComponent, MarketCandlestickComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent { }
