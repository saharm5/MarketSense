// import { Component, OnInit } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { HttpClient } from '@angular/common/http';
// import { TreeMapComponent } from '../../core/shared/tree-map/tree-map.component';

// export interface TreeMapItem {
//   id: string;
//   name: string;
//   value: number;
//   parent?: string;
//   custom?: {
//     regNo?: string;
//     fundType?: number;
//     typeOfInvest?: string;
//     fundSize?: number;
//     initiationDate?: string;
//     dailyEfficiency?: number;
//     weeklyEfficiency?: number;
//     monthlyEfficiency?: number;
//     quarterlyEfficiency?: number;
//     sixMonthEfficiency?: number;
//     annualEfficiency?: number;
//     efficiency?: number;
//     cancelNav?: number;
//     issueNav?: number;
//     statisticalNav?: number;
//     netAsset?: number;
//     manager?: string;
//     guarantor?: string;
//     date?: string;
//     alpha?: number | null;
//     beta?: number | null;
//   };
// }

// @Component({
//   selector: 'app-tree-map-page',
//   standalone: true,
//   imports: [CommonModule, TreeMapComponent],
//   templateUrl: './tree-map-page.component.html',
// })
// export class TreeMapPageComponent implements OnInit {
// [x: string]: ParentCategory[];
//   treeMapData: TreeMapItem[] = [];
// parentCategories: ParentCategory[];
// parentCategories: ParentCategory[];

//   constructor(private http: HttpClient) {}


//   ngOnInit(): void {
//     // eslint-disable-next-line @typescript-eslint/no-explicit-any
//     this.http.get<any[]>('assets/json/fund-treemap.json').subscribe((fundRawData) => {
//       const parentNodeId = 'fund-root';
//       const fundTypeParents: Record<number, string> = {};

//       const parentNode: TreeMapItem = {
//         id: parentNodeId,
//         name: 'Fund',
//         value: 0,
//       };

//       const fundTypeNodes: TreeMapItem[] = [];
//       const leafNodes: TreeMapItem[] = [];

//       fundRawData.forEach((item) => {
//         const fundType = item.fundType ?? 0;

//         if (!fundTypeParents[fundType]) {
//           const parentId = `fund-type-${fundType}`;
//           fundTypeParents[fundType] = parentId;

//           fundTypeNodes.push({
//             id: parentId,
//             name: `نوع ${fundType}`,
//             value: 0,
//             parent: parentNodeId,
//           });
//         }

//         leafNodes.push({
//           id: item.regNo ?? Math.random().toString(),
//           name: item.name ?? 'نام ندارد',
//           value: typeof item.fundSize === 'number' ? item.fundSize : 1,
//           parent: fundTypeParents[fundType],
//           custom: { ...item },
//         });
//       });

//       this.treeMapData = [parentNode, ...fundTypeNodes, ...leafNodes];
//     });
//   }

// }
