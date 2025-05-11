import { Component, OnInit, OnDestroy, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';
import { DOCUMENT } from '@angular/common';
import { CombinedChartComponent } from './combined-chart/combined-chart.component';
import { MarketChartComponent } from '../../../core/shared/market-chart/market-chart.component';
import * as Highcharts from 'highcharts';

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
    imports: [CommonModule, CombinedChartComponent, MarketChartComponent],
    templateUrl: './fund-performance.component.html',
    styleUrls: ['./fund-performance.component.css']
})
export class FundPerformanceComponent implements OnInit, OnDestroy {
    isDarkMode = false;
    allSeries: Highcharts.SeriesSplineOptions[] = [];
    netAssetSeries: Highcharts.SeriesSplineOptions[] = [];
    fundReturnSeries: Highcharts.SeriesSplineOptions[] = [];

    private observer?: MutationObserver;
    private dataSubscription?: Subscription;

    marketData: MarketData[] = [];
    ownershipData: OwnershipData[] = [];

    AssetPieData: PieChartData[] = [];
    AssetAreaData: Highcharts.SeriesAreaOptions[] = [];

    OwnershipPieData: PieChartData[] = [];
    OwnershipAreaData: Highcharts.SeriesAreaOptions[] = [];

    combinedChart: { title: string, pieData: PieChartData[], areaData: Highcharts.SeriesAreaOptions[] }[] = [];
    marketChart: { title: string, series: Highcharts.SeriesSplineOptions[] }[] = [];

    readonly assetConfigs: {
        name: string;
        key: keyof MarketData;
        color: string;
    }[] = [
            { name: 'واحد صندوق', key: 'fundUnit', color: '#8B5CF6' },
            { name: 'گواهی سپرده کالایی', key: 'commodity', color: '#6366F1' },
            { name: 'سایر سهام', key: 'stock', color: '#00C8B5' },
            { name: 'سایر دارایی ها', key: 'other', color: '#22C55E' },
            { name: 'اوراق مشارکت', key: 'bond', color: '#F26827' },
            { name: 'وجه نقد', key: 'cash', color: '#14B8A6' },
            { name: 'سپرده بانکی', key: 'deposit', color: '#0EA5E9' },
            { name: 'پنج سهم با بیشترین سهم', key: 'fiveBest', color: '#A855F7' }
        ];

    readonly ownershipConfigs: {
        name: string;
        key: keyof OwnershipData;
        color: string;
    }[] = [
            { name: 'سرمایه‌گذاران حقوقی', key: 'insInvPercent', color: '#71d2e4' },
            { name: 'سرمایه‌گذاران حقیقی', key: 'retInvPercent', color: '#f26827' }
        ];

    constructor(
        private http: HttpClient,
        @Inject(DOCUMENT) private document: Document,
        @Inject(PLATFORM_ID) private platformId: object
    ) { }

    ngOnInit(): void {
        if (isPlatformBrowser(this.platformId)) {
            this.updateTheme();

            this.observer = new MutationObserver(() => this.updateTheme());
            this.observer.observe(this.document.documentElement, {
                attributes: true,
                attributeFilter: ['class']
            });

            this.dataSubscription = this.http.get<NetAssetData[]>('/assets/json/asset-comparison-value-data.json')
                .subscribe((data) => {
                    const getNetAsset = (
                        name: string,
                        color: string,
                        extract: (item: NetAssetData) => number
                    ): Highcharts.SeriesSplineOptions => ({
                        type: 'spline',
                        name,
                        color,
                        data: data.map(item => [new Date(item.date).getTime(), extract(item)]),
                    });

                    this.netAssetSeries = [
                        getNetAsset('ارزش خالص دارایی‌ها', '#F87171', item => item.netAsset),
                        getNetAsset('ارزش صدور', '##ffffff00', item => item.unitsRedDAY),
                        getNetAsset('NAV آماری', '##ffffff00', item => item.unitsSubDAY),
                    ];
                });

            this.dataSubscription = this.http.get<FundReturn[]>('/assets/json/return-fund-data.json')
                .subscribe((data) => {
                    const getFundReturn = (
                        name: string,
                        color: string,
                        extract: (item: FundReturn) => number
                    ): Highcharts.SeriesSplineOptions => ({
                        type: 'spline',
                        name,
                        color,
                        data: data.map(item => [new Date(item.date).getTime(), extract(item)]),
                    });

                    this.fundReturnSeries = [
                        getFundReturn('ارزش خالص دارایی‌ها', '#F87171', item => item.netAsset),
                        getFundReturn('ارزش صدور', '##ffffff00', item => item.unitsRedDAY),
                        getFundReturn('NAV آماری', '##ffffff00', item => item.unitsSubDAY),
                    ];
                });

            this.dataSubscription = this.http.get<MarketLineData[]>('/assets/json/nav-comparison-data.json')
                .subscribe((data) => {
                    const getSeries = (
                        name: string,
                        color: string,
                        extract: (item: MarketLineData) => number
                    ): Highcharts.SeriesSplineOptions => ({
                        type: 'spline',
                        name,
                        color,
                        data: data.map(item => [new Date(item.date).getTime(), extract(item)]),
                    });

                    this.allSeries = [
                        getSeries('ارزش ابطال', '#F87171', item => item.cancelNav),
                        getSeries('ارزش صدور', '#60A5FA', item => item.issueNav),
                        getSeries('NAV آماری', '#34D399', item => item.statisticalNav),
                    ];
                });
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

        this.marketChart = [
            { title: 'نمودار مقایسه قیمت صدور، ابطال و آماری واحدهای سرمایه‌گذاری', series: this.allSeries },
            { title: 'نمودار ارزش خالص دارایی‌ها', series: this.netAssetSeries },
            { title: 'نمودار بازدهی صندوق', series: this.fundReturnSeries }
        ];
    }

    updateTheme(): void {
        this.isDarkMode = this.document.documentElement.classList.contains('dark');
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
            data: this.marketData.map(item => [
                new Date(item.date).getTime(),
                Number(item[cfg.key as keyof MarketData])
            ]),
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
            data: this.ownershipData.map(item => [
                new Date(item.date).getTime(),
                Number(item[cfg.key as keyof OwnershipData])
            ]),
            color: cfg.color,
            fillOpacity: 0.3
        }));
    }

    ngOnDestroy(): void {
        this.observer?.disconnect();
        this.dataSubscription?.unsubscribe();
    }
}
