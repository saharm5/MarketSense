import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-banner',
  standalone: true,
  imports: [RouterModule, CommonModule, HttpClientModule],
  templateUrl: './banner.component.html',
})
export class BannerComponent implements OnInit, OnDestroy {
  private http = inject(HttpClient);
  bannerData: any[] = [];
  currentBannerIndex = 0;
  intervalId: any;

  ngOnInit(): void {
    this.http.get<any[]>('/assets/banner-data.json').subscribe((data) => {
      this.bannerData = data;
      this.startBannerRotation();
    });
  }

  startBannerRotation(): void {
    this.intervalId = setInterval(() => {
      this.currentBannerIndex = (this.currentBannerIndex + 1) % this.bannerData.length;
    }, 1000); // هر 10 ثانیه یکبار
  }

  ngOnDestroy(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }
}
