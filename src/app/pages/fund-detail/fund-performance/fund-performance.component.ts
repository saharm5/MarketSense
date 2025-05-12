// fund-performance.component.ts
import { Component, OnInit, OnDestroy, inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, DOCUMENT, isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Subscription } from 'rxjs';
import * as Highcharts from 'highcharts';
import { CombinedChartComponent } from './combined-chart/combined-chart.component';
import { LineChartComponent } from '../../../core/shared/line-chart/line-chart.component';

interface NetAssetData {
    date: string;
    netAsset: number;
    unitsSubDAY: number;
    unitsRedDAY: number;
}

interface FundReturn {
    date: string;
    netAsset: number;
    unitsSubDAY: number;
    unitsRedDAY: number;
}

interface MarketLineData {
    date: string;
    issueNav: number;
    cancelNav: number;
    statisticalNav: number;
}

interface MarketData {
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

interface OwnershipData {
    date: string;
    insInvPercent: number;
    retInvPercent: number;
}

interface PieChartData {
    name: string;
    percentage: number;
    color: string;
}

@Component({
    selector: 'app-fund-performance',
    standalone: true,
    imports: [CommonModule, CombinedChartComponent, LineChartComponent],
    templateUrl: './fund-performance.component.html',
    styleUrls: ['./fund-performance.component.css']
})
export class FundPerformanceComponent implements OnInit, OnDestroy {
    isDarkMode = false;
    allSeries: Highcharts.SeriesLineOptions[] = [];
    netLineData: Highcharts.SeriesLineOptions[] = [];
    fundReturnSeries: Highcharts.SeriesLineOptions[] = [];

    private observer?: MutationObserver;
    private subscriptions: Subscription[] = [];

    marketData: MarketData[] = [];
    ownershipData: OwnershipData[] = [];

    AssetPieData: PieChartData[] = [];
    AssetAreaData: Highcharts.SeriesAreaOptions[] = [];

    OwnershipPieData: PieChartData[] = [];
    OwnershipAreaData: Highcharts.SeriesAreaOptions[] = [];

    combinedChart: { title: string; pieData: PieChartData[]; areaData: Highcharts.SeriesAreaOptions[] }[] = [];
    marketChart: { title: string; lineData: Highcharts.SeriesLineOptions[] }[] = [];

    readonly assetConfigs = [
        { name: 'واحد صندوق', key: 'fundUnit', color: '#8B5CF6' },
        { name: 'گواهی سپرده کالایی', key: 'commodity', color: '#6366F1' },
        { name: 'سایر سهام', key: 'stock', color: '#00C8B5' },
        { name: 'سایر دارایی ها', key: 'other', color: '#22C55E' },
        { name: 'اوراق مشارکت', key: 'bond', color: '#F26827' },
        { name: 'وجه نقد', key: 'cash', color: '#14B8A6' },
        { name: 'سپرده بانکی', key: 'deposit', color: '#0EA5E9' },
        { name: 'پنج سهم با بیشترین سهم', key: 'fiveBest', color: '#A855F7' }
    ];

    readonly ownershipConfigs = [
        { name: 'سرمایه‌گذاران حقوقی', key: 'insInvPercent', color: '#71d2e4' },
        { name: 'سرمایه‌گذاران حقیقی', key: 'retInvPercent', color: '#f26827' }
    ];

    private readonly document = inject(DOCUMENT);
    private readonly platformId = inject(PLATFORM_ID);
    private readonly http = inject(HttpClient);

    ngOnInit(): void {
        if (isPlatformBrowser(this.platformId)) {
            this.updateTheme();
            this.observer = new MutationObserver(() => this.updateTheme());
            this.observer.observe(this.document.documentElement, {
                attributes: true,
                attributeFilter: ['class']
            });

            this.loadLineChartData();
        }

        this.http.get<MarketData[]>('/assets/json/Asset-data.json').subscribe(data => {
            this.marketData = data;
            this.generateAssetData();
        });

        this.http.get<OwnershipData[]>('/assets/json/Ownership-data.json').subscribe(data => {
            this.ownershipData = data;
            this.generateOwnershipData();
        });

        this.combinedChart = [
            { title: 'ترکیب دارایی‌ها', pieData: this.AssetPieData, areaData: this.AssetAreaData },
            { title: 'میزان تملک سرمایه‌گذاران حقیقی و حقوقی', pieData: this.OwnershipPieData, areaData: this.OwnershipAreaData }
        ];
    }

    loadLineChartData(): void {
        this.http.get<NetAssetData[]>('/assets/json/asset-comparison-value-data.json').subscribe(data => {
            this.netLineData = [
                this.mapToLineSeries('ارزش خالص دارایی‌ها', '#F87171', data, dataItem => dataItem.netAsset),
                this.mapToLineSeries('ارزش صدور', '#ffffff00', data, dataItem => dataItem.unitsRedDAY),
                this.mapToLineSeries('NAV آماری', '#ffffff00', data, dataItem => dataItem.unitsSubDAY),
            ];

            this.marketChart.push({ title: 'نمودار ارزش خالص دارایی‌ها', lineData: this.netLineData });
        });

        this.http.get<FundReturn[]>('/assets/json/return-fund-data.json').subscribe(data => {
            this.fundReturnSeries = [
                this.mapToLineSeries('ارزش خالص دارایی‌ها', '#F87171', data, dataItem => dataItem.netAsset),
                this.mapToLineSeries('ارزش صدور', '#ffffff00', data, dataItem => dataItem.unitsRedDAY),
                this.mapToLineSeries('NAV آماری', '#ffffff00', data, dataItem => dataItem.unitsSubDAY),
            ];

            this.marketChart.push({ title: 'نمودار بازدهی صندوق', lineData: this.fundReturnSeries });
        });

        this.http.get<MarketLineData[]>('/assets/json/nav-comparison-data.json').subscribe(data => {
            this.allSeries = [
                this.mapToLineSeries('ارزش ابطال', '#F87171', data, dataItem => dataItem.cancelNav),
                this.mapToLineSeries('ارزش صدور', '#60A5FA', data, dataItem => dataItem.issueNav),
                this.mapToLineSeries('NAV آماری', '#34D399', data, dataItem => dataItem.statisticalNav),
            ];

            this.marketChart.unshift({ title: 'نمودار مقایسه قیمت صدور، ابطال و آماری واحدهای سرمایه‌گذاری', lineData: this.allSeries });
        });
    }

    mapToLineSeries<T extends { date: string }>(
        name: string,
        color: string,
        data: T[],
        extractor: (item: T) => number
    ): Highcharts.SeriesLineOptions {
        return {
            type: 'line',
            name,
            color,
            data: data.map(item => [new Date(item.date).getTime(), extractor(item)]),
        };
    }


    generateAssetData(): void {
        if (!this.marketData.length) return;

        const latest = this.marketData[this.marketData.length - 1];

        this.AssetPieData = this.assetConfigs.map(cfg => ({
            name: cfg.name,
            percentage: Number(latest[cfg.key as keyof MarketData]),
            color: cfg.color
        }));

        this.AssetAreaData = this.assetConfigs.map(cfg => ({
            type: 'area',
            name: cfg.name,
            data: this.marketData.map(item => [new Date(item.date).getTime(), Number(item[cfg.key as keyof MarketData])]),
            color: cfg.color,
            fillOpacity: 0.3
        }));
    }

    generateOwnershipData(): void {
        if (!this.ownershipData.length) return;

        const latest = this.ownershipData[this.ownershipData.length - 1];

        this.OwnershipPieData = this.ownershipConfigs.map(cfg => ({
            name: cfg.name,
            percentage: Number(latest[cfg.key as keyof OwnershipData]),
            color: cfg.color
        }));

        this.OwnershipAreaData = this.ownershipConfigs.map(cfg => ({
            type: 'area',
            name: cfg.name,
            data: this.ownershipData.map(item => [new Date(item.date).getTime(), Number(item[cfg.key as keyof OwnershipData])]),
            color: cfg.color,
            fillOpacity: 0.3
        }));
    }

    updateTheme(): void {
        this.isDarkMode = this.document.documentElement.classList.contains('dark');
    }

    ngOnDestroy(): void {
        this.observer?.disconnect();
        this.subscriptions.forEach(sub => sub.unsubscribe());
    }
}