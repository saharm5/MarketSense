import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BannerComponent } from './banner/banner.component';
import { SearchBarComponent } from "../../core/shared/search-bar/search-bar.component";
import { TopFundsComponent } from "./top-funds/top-funds.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, BannerComponent, SearchBarComponent, TopFundsComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent { }
