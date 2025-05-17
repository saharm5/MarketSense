/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { TreeMapComponent, ParentCategory, FundItem } from '../../core/shared/tree-map/tree-map.component';

@Component({
  selector: 'app-tree-map-page',
  standalone: true,
  imports: [CommonModule, TreeMapComponent],
  templateUrl: './tree-map-page.component.html',
})
export class TreeMapPageComponent implements OnInit {
  parentCategories: ParentCategory[] = [];
  items: FundItem[] = [];

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.loadData();
  }

  private loadData() {
    import('rxjs').then(({ forkJoin }) => {
      forkJoin({
        fundTypes: this.http.get<ParentCategory[]>('assets/json/fundtype.json'),
        funds: this.http.get<any[]>('assets/json/fund-treemap.json'),
      }).subscribe(({ fundTypes, funds }) => {
        this.prepareTreeMapData(fundTypes, funds);
      });
    });
  }

  private prepareTreeMapData(fundTypes: ParentCategory[], funds: any[]) {
    this.parentCategories = fundTypes.filter((ft) => ft.isActive);

    this.items = funds.map((item) => ({
      id: item.regNo ?? Math.random().toString(36).slice(2),
      name: item.name ?? 'نام ندارد',
      fundType: item.fundType ?? 0,
      value: typeof item.fundSize === 'number' ? item.fundSize : 1,
      custom: { ...item },
    }));
  }
}
