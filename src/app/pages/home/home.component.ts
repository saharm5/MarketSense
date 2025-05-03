import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BannerComponent } from './banner/banner.component';
import { SearchBarComponent } from "../../core/shared/search-bar/search-bar.component";
import { TopFundsComponent } from "./top-funds/top-funds.component";
import { MarketChartComponent } from './market-chart/market-chart.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, BannerComponent, SearchBarComponent, TopFundsComponent, MarketChartComponent, HttpClientModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  volumeData: any[] = [];
  priceData: any[] = [];
  isDarkMode: boolean = false;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.updateTheme();

    const observer = new MutationObserver(() => {
      this.updateTheme();
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    });

    this.http.get<any[]>('assets/volume-data.json').subscribe(data => {
      this.volumeData = data.map(d => [d.time, d.volume]);
    });

    this.http.get<any[]>('assets/volume-data.json').subscribe(data => {
      this.priceData = data.map(d => [d.time, d.volume]);
    });
  }

  updateTheme(): void {
    this.isDarkMode = document.documentElement.classList.contains('dark');
  }

  toggleTheme(): void {
    document.documentElement.classList.toggle('dark');
    this.updateTheme();
  }
}
