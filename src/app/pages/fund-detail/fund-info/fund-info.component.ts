import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InfoTableComponent } from "../../../core/shared/info-table/info-table.component";

@Component({
  selector: 'app-fund-info',
  standalone: true,
  imports: [CommonModule, InfoTableComponent], 
  templateUrl: './fund-info.component.html',
  styleUrls: ['./fund-info.component.css']
})
export class FundInfoComponent {
}
