import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-top-funds',
  imports: [CommonModule],
  standalone: true,
  templateUrl: './top-funds.component.html',
  styleUrl: './top-funds.component.css'
})
export class TopFundsComponent {
  private http = inject(HttpClient);
  topfunds: any[] = [];
  currentBannerIndex = 0;
  intervalId: any;

  ngOnInit(): void {
    this.http.get<any[]>('assets/json/top-fund-data.json').subscribe((data) => {
      this.topfunds = data;
    });
  }

}
