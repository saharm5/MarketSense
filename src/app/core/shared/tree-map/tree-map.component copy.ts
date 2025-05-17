// import { Component, Inject, PLATFORM_ID } from '@angular/core';
// import { isPlatformBrowser, CommonModule } from '@angular/common';
// import { HighchartsChartModule } from 'highcharts-angular';
// import * as Highcharts from 'highcharts';

// @Component({
//   selector: 'app-tree-map',
//   standalone: true,
//   imports: [CommonModule, HighchartsChartModule],
//   templateUrl: './tree-map.component.html',
//   styleUrls: ['./tree-map.component.css'],
// })
// export class TreeMapComponent {
//   Highcharts: typeof Highcharts | null = null;
//   chartOptions: Highcharts.Options = {};

//   constructor(@Inject(PLATFORM_ID) private platformId: object) {
//     if (isPlatformBrowser(this.platformId)) {
//       import('highcharts/modules/treemap').then(() => {
//         this.Highcharts = Highcharts;

//         const dataSet = this.getLargeDataSet();
//         const leafData = dataSet.filter(item => item.parent);
//         const minValue = Math.min(...leafData.map(item => Number(item.value)));
//         const maxValue = Math.max(...leafData.map(item => Number(item.value)));
//         const range = maxValue - minValue;
//         const zeroPosition = (0 - minValue) / range;

//         this.chartOptions = {
//           chart: {
//             backgroundColor: '#1a1d23',
//             style: {
//               fontFamily: 'Arial, sans-serif',
//             },
//           },
//           title: {
//             text: 'S&P 500 Companies',
//             align: 'left',
//             style: {
//               color: 'white',
//               fontSize: '20px',
//               fontWeight: 'bold',
//             },
//           },
//           subtitle: {
//             text: 'Click points to drill down. Source: <a href="http://okfn.org/">okfn.org</a>.',
//             align: 'left',
//             style: {
//               color: '#b0b0b0',
//               fontSize: '12px',
//             },
//           },
//           tooltip: {
//             followPointer: true,
//             outside: true,
//             headerFormat: '<span style="font-size: 1em; color: #f1f1f1;">{point.name}</span><br/>',
//             pointFormat: '<b style="color: #f73539;">Market Cap:</b> USD {point.value} Bln',
//             style: {
//               color: '#f1f1f1',
//               fontSize: '14px',
//             },
//             borderWidth: 1,
//             borderColor: '#444',
//             backgroundColor: '#333',
//           },
//           series: [
//             {
//               name: 'All',
//               colorByPoint: false,
//               colorKey: 'colorValue',
//               type: 'treemap',
//               layoutAlgorithm: 'squarified',
//               allowDrillToNode: true,
//               animationLimit: 1000,
//               borderColor: '#444',
//               opacity: 0.8,
//               nodeSizeBy: 'leaf',
//               dataLabels: {
//                 enabled: true,
//                 allowOverlap: true,
//                 format: '{point.name}<br>{point.value}%',
//                 style: {
//                   fontSize: '11px',
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
//                       fontSize: '14px',
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
//                 {
//                   level: 3,
//                   dataLabels: {
//                     enabled: true,
//                     align: 'center',
//                     format: '{point.name}<br><span style="font-size: 0.8em;color: #f1f1f1;">{point.value}</span>',
//                     style: {
//                       color: '#f1f1f1',
//                     },
//                   },
//                 },
//               ],
//               data: dataSet.map(item => ({
//                 ...item,
//                 value: item.value,
//                 weight: item.custom?.['size'] || 1,
//                 colorValue: typeof item.value === 'number' ? item.value : 0,
//               })),
//             } as Highcharts.SeriesTreemapOptions,
//           ],
//           colorAxis: {
//             min: minValue,
//             max: maxValue,
//             stops: [
//               [0, '#f73539'],               // منفی (قرمز)
//               [zeroPosition, '#999999'],    // صفر (خاکستری)
//               [1, '#2ecc59'],               // مثبت (سبز)
//             ],
//             labels: {
//               style: {
//                 color: 'white',
//               },
//             },
//           },
//           legend: {
//             itemStyle: {
//               color: 'white',
//               fontSize: '13px',
//             },
//             title: {
//               text: 'Market Performance',
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
//                 menuItems: [
//                   'downloadPNG',
//                   'downloadJPEG',
//                   'downloadPDF',
//                   'downloadSVG',
//                 ],
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
//               // eslint-disable-next-line id-length
//               y: -2,
//             },
//           },
//         };
//       });
//     }
//   }

//   getLargeDataSet(): Highcharts.PointOptionsObject[] {
//     return [
//       { id: 'tech', name: 'تکنولوژی', value: 20 },
//       { name: 'اپل', parent: 'tech', value: 10 },
//       { name: 'گوگل', parent: 'tech', value: 100 },
//       { name: 'مایکروسافت', parent: 'tech', value: 80 },
//       { name: 'فیسبوک', parent: 'tech', value: 70 },
//       { name: 'آمازون', parent: 'tech', value: 130 },
//       { name: 'تسلا', parent: 'tech', value: 110 },
//       { name: 'اینستاگرام', parent: 'tech', value: 60 },
//       { name: 'توئیتر', parent: 'tech', value: 55 },
//       { id: 'finance', name: 'مالی', value: 5 },
//       { name: 'JPMorgan', parent: 'finance', value: 90 },
//       { name: 'Goldman Sachs', parent: 'finance', value: 70 },
//       { name: 'Citigroup', parent: 'finance', value: 60 },
//       { name: 'Bank of America', parent: 'finance', value: 85 },
//       { name: 'Morgan Stanley', parent: 'finance', value: 75 },
//       { name: 'Wells Fargo', parent: 'finance', value: 80 },
//       { name: 'Barclays', parent: 'finance', value: 65 },
//       { id: 'health', name: 'سلامت', value: 15 },
//       { name: 'Pfizer', parent: 'health', value: 75 },
//       { name: 'Moderna', parent: 'health', value: 65 },
//       { name: 'Johnson & Johnson', parent: 'health', value: 85 },
//       { name: 'Novartis', parent: 'health', value: 95 },
//       { name: 'GSK', parent: 'health', value: 90 },
//       { name: 'Roche', parent: 'health', value: 70 },
//       { name: 'AstraZeneca', parent: 'health', value: 80 },
//       { id: 'energy', name: 'انرژی', value: 10 },
//       { name: 'ExxonMobil', parent: 'energy', value: 100 },
//       { name: 'Chevron', parent: 'energy', value: 90 },
//       { name: 'Shell', parent: 'energy', value: 85 },
//       { name: 'BP', parent: 'energy', value: 80 },
//       { id: 'consumer', name: 'مصرفی', value: 40 },
//       { name: 'Coca Cola', parent: 'consumer', value: -70 },
//       { name: 'PepsiCo', parent: 'consumer', value: 75 },
//       { name: 'Unilever', parent: 'consumer', value: 85 },
//       { name: 'Procter & Gamble', parent: 'consumer', value: 80 },
//       { id: 'services', name: 'خدمات', value: 10 },
//       { name: 'McDonald\'s', parent: 'services', value: 50 },
//       { name: 'Starbucks', parent: 'services', value: 60 },
//       { name: 'Walmart', parent: 'services', value: 100 },
//       { name: 'Costco', parent: 'services', value: 80 },
//       { name: 'Disney', parent: 'services', value: 90 },
//     ];
//   }
// }
