// /* eslint-disable @typescript-eslint/no-explicit-any */
// /* eslint-disable func-names */
// /* eslint-disable id-length */
// import { Component, Inject, PLATFORM_ID, Input, OnInit } from '@angular/core';
// import { isPlatformBrowser, CommonModule } from '@angular/common';
// import { HighchartsChartModule } from 'highcharts-angular';
// import * as Highcharts from 'highcharts';

// export interface ParentCategory {
//   fundType: number;
//   name: string;
//   isActive: boolean;
// }

// export interface FundItem {
//   id: string;
//   name: string;
//   fundType: number;
//   value: number;
//   custom: {
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
//   selector: 'app-tree-map',
//   standalone: true,
//   imports: [CommonModule, HighchartsChartModule],
//   templateUrl: './tree-map.component.html',
//   styleUrls: ['./tree-map.component.css'],
// })
// export class TreeMapComponent implements OnInit {
//   @Input() parentCategories: ParentCategory[] = [];
//   @Input() items: FundItem[] = [];

//   Highcharts: typeof Highcharts | null = null;
//   chartOptions: Highcharts.Options = {};
//   allCategories: ParentCategory[] = []; // همه دسته‌ها از جمله "سایر"
//   selectedFundTypes: number[] = [4, 6, 7]; // پیش‌فرض: فقط این ۳ تای فعال
// allCategories: (ParentCategory[]&NgIterable<ParentCategory>)|null|undefined;
// selectedFundTypes: any;

//   constructor(@Inject(PLATFORM_ID) private platformId: object) { }

//   ngOnInit() {
//     if (isPlatformBrowser(this.platformId)) {
//       import('highcharts/modules/treemap').then(() => {
//         this.Highcharts = Highcharts;

//         const parentsData = this.parentCategories
//           .filter((cat) => cat.isActive)
//           .map((cat) => ({
//             id: `parent-${cat.fundType}`,
//             name: cat.name,
//           }));

//         const childrenData = this.items.map((item) => ({
//           id: item.id,
//           name: item.name,
//           value: item.value,
//           parent: `parent-${item.fundType}`,
//           custom: item.custom,
//           colorValue: item.custom?.dailyEfficiency ?? 0,
//         }));

//         const allData = [...parentsData, ...childrenData];

//         const values = childrenData.map((c) => c.value).filter((v) => !isNaN(v));
//         const minValue = values.length ? Math.min(...values) : 0;
//         const maxValue = values.length ? Math.max(...values) : 100;
//         // if (isPlatformBrowser(this.platformId)) {
//         //   import('highcharts/modules/treemap').then(() => {
//         //     this.Highcharts = Highcharts;

//         //     // دسته "سایر"
//         //     const otherCategory = { fundType: 0, name: 'سایر', isActive: true };

//         //     // افزودن دسته سایر اگر نیست
//         //     const activeCategories = [...this.parentCategories];
//         //     if (!activeCategories.some(cat => cat.fundType === otherCategory.fundType)) {
//         //       activeCategories.push(otherCategory);
//         //     }

//         //     const parentsData = activeCategories
//         //       .filter((cat) => cat.isActive)
//         //       .map((cat) => ({
//         //         id: `parent-${cat.fundType}`,
//         //         name: cat.name,
//         //       }));

//         //     // لیست fundType های دسته‌بندی شده
//         //     const categorizedFundTypes = [4, 6, 7];

//         //     const childrenData = this.items.map((item) => {
//         //       const fundType = categorizedFundTypes.includes(item.fundType) ? item.fundType : otherCategory.fundType;

//         //       return {
//         //         id: item.id,
//         //         name: item.name,
//         //         value: item.value,
//         //         parent: `parent-${fundType}`,
//         //         custom: item.custom,
//         //         colorValue: item.custom?.dailyEfficiency ?? 0,
//         //       };
//         //     });

//         //     const allData = [...parentsData, ...childrenData];

//         //     const values = childrenData.map((c) => c.value).filter((v) => !isNaN(v));
//         //     const minValue = values.length ? Math.min(...values) : 0;
//         //     const maxValue = values.length ? Math.max(...values) : 100;

//         this.chartOptions = {
//           chart: {
//             backgroundColor: '#1a1d23',
//           },
//           title: {
//             text: 'Tree Map صندوق‌ها',
//             align: 'center',
//             style: {
//               color: 'white',
//               fontSize: '20px',
//               fontWeight: 'bold',
//             },
//           },
//           tooltip: {
//             useHTML: true,
//             backgroundColor: '#fff',
//             borderColor: '#ccc',
//             borderRadius: 8,
//             shadow: true,
//             style: {
//               fontSize: '14px',
//               color: '#000',
//               direction: 'rtl',
//               textAlign: 'right',
//             },
//             formatter: function (this: any) {
//               const custom = this.point.custom || {};

//               const formatNumber = (num: number | null | undefined) =>
//                 typeof num === 'number' ? num.toLocaleString('fa-IR') : '----';

//               const percent = (val: number | null | undefined) =>
//                 typeof val === 'number' ? `${val.toFixed(2)}٪` : '----';

//               if (this.point.parent) {
//                 return `
//                   <div> 
//                     <strong>📌 ${this.point.name}</strong><hr/>
//                     <div><b>نوع صندوق:</b> ${custom.fundType === 13 ? 'درآمد ثابت' : 'سایر'
//                   }</div>
//                     <div><b>شیوه سرمایه‌گذاری:</b> ${custom.typeOfInvest || '----'}</div>
//                     <div><b>مدیر:</b> ${custom.manager || '----'}</div>
//                     <div><b>قیمت صدور:</b> ${formatNumber(custom.issueNav)}</div>
//                     <div><b>قیمت ابطال:</b> ${formatNumber(custom.cancelNav)}</div>
//                     <div><b>بازده روزانه:</b> ${percent(custom.dailyEfficiency)}</div>
//                     <div><b>بازده هفتگی:</b> ${percent(custom.weeklyEfficiency)}</div>
//                     <div><b>بازده ماهانه:</b> ${percent(custom.monthlyEfficiency)}</div>
//                     <div><b>بازده سه‌ماهه:</b> ${percent(custom.quarterlyEfficiency)}</div>
//                     <div><b>بازده شش‌ماهه:</b> ${percent(custom.sixMonthEfficiency)}</div>
//                     <div><b>بازده یک‌ساله:</b> ${percent(custom.annualEfficiency)}</div>
//                   </div>
//                 `;
//               } else {
//                 return `<strong>${this.point.name}</strong>`;
//               }
//             },
//           },
//           series: [
//             {
//               type: 'treemap',
//               layoutAlgorithm: 'squarified',
//               allowDrillToNode: true,
//               animationLimit: 1000,
//               borderColor: '#444',
//               opacity: 0.8,
//               dataLabels: {
//                 enabled: true,
//                 allowOverlap: true,
//                 format: '{point.name}',
//                 style: {
//                   fontSize: '12px',
//                   color: 'white',
//                   textOutline: 'none',
//                 },
//               },
//               levels: [
//                 {
//                   level: 1,
//                   layoutAlgorithm: 'squarified',
//                   dataLabels: {
//                     enabled: true,
//                     align: 'left',
//                     verticalAlign: 'top',
//                     style: {
//                       fontSize: '16px',
//                       fontWeight: 'bold',
//                       color: 'white',
//                       textTransform: 'uppercase',
//                       textOutline: 'none',
//                     },
//                     padding: 3,
//                   },
//                   borderColor: '#3c4d63',
//                   borderWidth: 2,
//                 },
//                 {
//                   level: 2,
//                   dataLabels: {
//                     enabled: true,
//                     align: 'center',
//                     style: {
//                       color: 'white',
//                       fontWeight: 'normal',
//                       fontSize: '11px',
//                       textOutline: 'none',
//                     },
//                   },
//                 },
//               ],
//               data: allData,
//               colorKey: 'colorValue',
//               colorByPoint: false,
//             } as Highcharts.SeriesTreemapOptions,
//           ],
//           colorAxis: {
//             min: minValue,
//             max: maxValue,
//             minColor: '#90ee90',
//             maxColor: '#006400',
//             labels: {
//               style: {
//                 color: 'white',
//               },
//             },
//           },
//           credits: {
//             enabled: false,
//           },
//           legend: {
//             itemStyle: {
//               color: 'white',
//               fontSize: '13px',
//             },
//             title: {
//               text: 'بازده روزانه صندوق‌ها',
//               style: {
//                 fontWeight: 'bold',
//                 color: '#f1f1f1',
//               },
//             },
//           },
//           exporting: {
//             sourceWidth: 1200,
//             sourceHeight: 800,
//             buttons: {
//               contextButton: {
//                 menuItems: ['downloadPNG', 'downloadJPEG', 'downloadPDF', 'downloadSVG'],
//                 symbol: 'menu',
//                 theme: {
//                   fill: '#2f353f',
//                   stroke: '#666',
//                 },
//               },
//             },
//           },
//           navigation: {
//             buttonOptions: {
//               symbolStroke: '#aaa',
//               theme: {
//                 fill: '#3c4d63',
//               },
//               y: -2,
//             },
//           },
//         };
//       });
//     }
//   }
// }
