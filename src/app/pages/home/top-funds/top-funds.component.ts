import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

interface FundItem {
  title: string;
  type: string;
  ProfitPercentage: number;
  buttonLink: string;
}

@Component({
  imports: [CommonModule],
  selector: 'app-top-funds',
  standalone: true,
  templateUrl: './top-funds.component.html',
  styleUrls: ['./top-funds.component.css']
})
export class TopFundsComponent implements OnInit {
  topfunds: FundItem[] = [];
  currentBannerIndex = 0;
  intervalId: ReturnType<typeof setInterval> | null = null;

  constructor(
    private sanitizer: DomSanitizer,
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: object
  ) { }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.http.get<FundItem[]>('assets/json/top-fund-data.json').subscribe((data) => {
        this.topfunds = data;
      });
    }
  }

  sanitizeUrl(url: string): SafeUrl {
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }
}
