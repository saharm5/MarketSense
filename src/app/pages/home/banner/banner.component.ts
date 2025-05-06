import {
  Component,
  OnInit,
  OnDestroy,
  Inject,
  PLATFORM_ID,
} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterModule, UrlTree } from '@angular/router';

interface BannerItem {
  image: string; // از any به string تغییر یافت
  buttonLink: string | string[] | UrlTree | null | undefined;
  buttonText: string; // از any به string تغییر یافت
  imageUrl: string;
  title?: string;
  description?: string;
  link?: string;
}

@Component({
  imports: [CommonModule, RouterModule],
  selector: 'app-banner',
  standalone: true,
  templateUrl: './banner.component.html',
})
export class BannerComponent implements OnInit, OnDestroy {
  currentBannerIndex = 0;
  intervalId: ReturnType<typeof setInterval> | null = null;
  bannerData: BannerItem[] = [];

  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: object
  ) { }

  
  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.http.get<BannerItem[]>('assets/json/banner-data.json').subscribe(
        (data) => {
          this.bannerData = data;
          this.startBannerRotation();
        },
        (error) => {
          console.error('Failed to load banner data:', error);
        }
      );
    }
  }

  startBannerRotation(): void {
    this.intervalId = setInterval(() => {
      this.currentBannerIndex =
        (this.currentBannerIndex + 1) % this.bannerData.length;
    }, 10000);
  }

  ngOnDestroy(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }
}
