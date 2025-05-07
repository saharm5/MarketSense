import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import * as Highcharts from 'highcharts';
import { CommonModule } from '@angular/common';
import { HighchartsChartModule } from 'highcharts-angular';

export interface MarketData {
    date: string;
    fiveBest: number;
    stock: number;
    bond: number;
    other: number;
    cash: number;
    deposit: number;
    fundUnit: number;
    commodity: number;
}

@Component({
    selector: 'app-pie-chart',
    standalone: true,
    imports: [CommonModule, HighchartsChartModule],
    templateUrl: './pie-chart.component.html',
})
export class PieChartComponent implements OnChanges {
    @Input() latestData!: MarketData; 

    Highcharts: typeof Highcharts = Highcharts;
    chartOptions: Highcharts.Options = {};

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['latestData'] && this.latestData) {
            this.prepareChart(this.latestData);
        }
    }
    

    private prepareChart(data: MarketData) {
        const assetMap: Record<keyof Omit<MarketData, 'date'>, string> = {
            fiveBest: 'پنج سهم برتر',
            stock: 'سهام',
            bond: 'اوراق قرضه',
            other: 'سایر',
            cash: 'نقد',
            deposit: 'سپرده',
            fundUnit: 'واحد صندوق',
            commodity: 'کالا',
        };

        const chartData: [string, number][] = [];

        for (const key in assetMap) {
            const typedKey = key as keyof Omit<MarketData, 'date'>;
            const value = data[typedKey];
            if (value > 0) {
                chartData.push([assetMap[typedKey], value]);
            }
        }

        this.chartOptions = {
            chart: {
                type: 'pie'
            },
            title: {
                text: `ترکیب دارایی - ${new Date(data.date).toLocaleDateString('fa-IR')}`
            },
            tooltip: {
                pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
            },
            plotOptions: {
                pie: {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    dataLabels: {
                        enabled: true,
                        format: '<b>{point.name}</b>: {point.percentage:.1f} %'
                    }
                }
            },
            series: [{
                type: 'pie',
                name: 'سهم',
                data: chartData,
                showInLegend: true
            }]
        };
    }
}
