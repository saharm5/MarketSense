/* eslint-disable func-names */
/* eslint-disable id-length */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Component,
  Inject,
  PLATFORM_ID,
  Input,
  OnInit,
} from '@angular/core';
import { isPlatformBrowser, CommonModule } from '@angular/common';
import { HighchartsChartModule } from 'highcharts-angular';
import * as Highcharts from 'highcharts';
import { FormsModule } from '@angular/forms';

export interface ParentCategory {
  fundType: number;
  name: string;
  isActive: boolean;
}

export interface FundItem {
  id: string;
  name: string;
  fundType: number;
  value: number;
  custom: {
    fundType?: number;
    typeOfInvest?: string;
    issueNav?: number;
    cancelNav?: number;
    dailyEfficiency?: number;
    weeklyEfficiency?: number;
    monthlyEfficiency?: number;
    quarterlyEfficiency?: number;
    sixMonthEfficiency?: number;
    annualEfficiency?: number;
    manager?: string;
  };
}

@Component({
  selector: 'app-tree-map',
  standalone: true,
  imports: [CommonModule, FormsModule, HighchartsChartModule],
  templateUrl: './tree-map.component.html',
  styleUrls: ['./tree-map.component.css'],
})
export class TreeMapComponent implements OnInit {
  @Input() parentCategories: ParentCategory[] = [];
  @Input() items: FundItem[] = [];

  Highcharts: typeof Highcharts | null = null;
  chartOptions: Highcharts.Options = {};
  allCategories: ParentCategory[] = [];
  selectedFundTypes: number[] = [4, 6, 7];

  constructor(@Inject(PLATFORM_ID) private platformId: object) { }

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      import('highcharts/modules/treemap').then(() => {
        this.Highcharts = Highcharts;

        this.allCategories = [...this.parentCategories];

        this.filterData();
      });
    }
  }


  onToggleFundType(fundType: number, checked: boolean) {
    this.selectedFundTypes = checked
      ? [...this.selectedFundTypes, fundType]
      : this.selectedFundTypes.filter((ft) => ft !== fundType);
  }

  filterData() {
    if (!isPlatformBrowser(this.platformId) || !this.Highcharts) return;

    const parentNodes = this.allCategories.map((cat) => ({
      id: `parent-${cat.fundType}`,
      name: cat.name,
    }));

    const fundNodes = this.items
      .filter((item) => this.selectedFundTypes.includes(item.fundType))
      .map((item) => ({
        id: item.id,
        name: item.name,
        value: item.value,
        parent: `parent-${item.fundType}`,
        custom: item.custom,
        colorValue: item.custom?.dailyEfficiency ?? 0,
        color:
          item.custom?.dailyEfficiency != null
            ? item.custom.dailyEfficiency >= 0
              ? '#00c853'
              : '#d32f2f'
            : '#9e9e9e',
      }));

    const allData = [...parentNodes, ...fundNodes];
    const colorValues = fundNodes.map((n) => n.colorValue).filter((v) => !isNaN(v));
    const min = colorValues.length ? Math.min(...colorValues) : 0;
    const max = colorValues.length ? Math.max(...colorValues) : 100;

    this.chartOptions = {
      chart: {
        backgroundColor: '#1e1e2f',
      },
      title: {
        text: 'نقشه درختی بازدهی صندوق‌ها',
        style: {
          color: '#fff',
          fontSize: '20px',
        },
      },
      tooltip: {
        useHTML: true,
        backgroundColor: '#fff',
        borderColor: '#ddd',
        borderRadius: 8,
        shadow: true,
        style: {
          fontSize: '13px',
          color: '#000',
          direction: 'rtl',
        },
        formatter: function (this: any) {
          const c = this.point.custom || {};
          const format = (n: number | undefined | null) =>
            typeof n === 'number' ? n.toLocaleString('fa-IR') : '---';
          const percent = (n: number | undefined | null) =>
            typeof n === 'number' ? n.toFixed(2) + '%' : '---';

          if (this.point.parent) {
            return `
              <div>
                <b>📌 ${this.point.name}</b><hr/>
                <div><b>مدیر:</b> ${c.manager || '---'}</div>
                <div><b>نوع سرمایه‌گذاری:</b> ${c.typeOfInvest || '---'}</div>
                <div><b>قیمت صدور:</b> ${format(c.issueNav)}</div>
                <div><b>قیمت ابطال:</b> ${format(c.cancelNav)}</div>
                <div><b>بازده روزانه:</b> ${percent(c.dailyEfficiency)}</div>
                <div><b>بازده هفتگی:</b> ${percent(c.weeklyEfficiency)}</div>
                <div><b>بازده ماهانه:</b> ${percent(c.monthlyEfficiency)}</div>
                <div><b>بازده سه‌ماهه:</b> ${percent(c.quarterlyEfficiency)}</div>
                <div><b>بازده شش‌ماهه:</b> ${percent(c.sixMonthEfficiency)}</div>
                <div><b>بازده یک‌ساله:</b> ${percent(c.annualEfficiency)}</div>
              </div>
            `;
          }

          return `<b>${this.point.name}</b>`;
        },
      },
      series: [
        {
          type: 'treemap',
          layoutAlgorithm: 'squarified',
          allowDrillToNode: true,
          dataLabels: {
            enabled: true,
            style: {
              color: '#fff',
              fontSize: '12px',
              textOutline: 'none',
            },
          },
          levels: [
            {
              level: 1,
              layoutAlgorithm: 'squarified',
              dataLabels: {
                enabled: true,
                style: {
                  fontWeight: 'bold',
                  fontSize: '14px',
                  color: '#fff',
                  textOutline: 'none',
                },
              },
              borderColor: '#444',
              borderWidth: 2,
            },
          ],
          data: allData,
          colorKey: 'colorValue',
        } as Highcharts.SeriesTreemapOptions,
      ],
      colorAxis: {
        min,
        max,
        minColor: '#ffcdd2',
        maxColor: '#388e3c',
        labels: {
          style: {
            color: '#fff',
          },
        },
      },
      legend: {
        enabled: true,
        itemStyle: {
          color: '#fff',
          fontSize: '13px',
        },
        title: {
          text: 'بازده روزانه',
          style: {
            color: '#fff',
          },
        },
      },
      credits: { enabled: false },
      exporting: {
        enabled: true,
        buttons: {
          contextButton: {
            symbol: 'menu',
            theme: {
              fill: '#333',
              stroke: '#aaa',
            },
            menuItems: ['downloadPNG', 'downloadJPEG', 'downloadPDF', 'downloadSVG'],
          },
        },
      },
    };
  }
}
