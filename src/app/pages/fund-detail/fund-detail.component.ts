import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FundPerformanceComponent } from "./fund-performance/fund-performance.component";
import { FundInfoComponent } from "./fund-info/fund-info.component";
import { AssetCompositionComponent } from "./fund-performance/asset-composition/asset-composition.component";
import { OwnershipCompositionComponent } from "./fund-performance/ownership-composition/ownership-composition.component";


@Component({
  selector: 'app-fund-detail',
  standalone: true,
  imports: [CommonModule, FundPerformanceComponent, FundInfoComponent, AssetCompositionComponent, OwnershipCompositionComponent],
  templateUrl: './fund-detail.component.html',
  styleUrls: ['./fund-detail.component.css']
})
export class FundDetailComponent {
 

}
