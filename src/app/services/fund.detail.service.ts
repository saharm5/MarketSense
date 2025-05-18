// C: \Users\Sanay\MarketSense\src\app\services\fund.detail.service.ts
import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';

export interface FundPerformanceItem {
    title: string;
    value: number | string;
}

export interface FundPerformanceSection {
    name: string;
    items: FundPerformanceItem[];
}

export interface NetAssetData {
    date: string;
    netAsset: number;
    unitsSubDAY: number;
    unitsRedDAY: number;
}

export interface FundReturn {
    date: string;
    netAsset: number;
    unitsSubDAY: number;
    unitsRedDAY: number;
}

export interface MarketLineData {
    date: string;
    issueNav: number;
    cancelNav: number;
    statisticalNav: number;
}

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

export interface OwnershipData {
    date: string;
    insInvPercent: number;
    retInvPercent: number;
}

export interface FundTreeMapDataItem {
    id: string;
    name: string;
    value: number;
    parent?: string;
    custom?: {
        regNo?: string;
        fundType?: number;
        typeOfInvest?: string;
        fundSize?: number;
        initiationDate?: string;
        dailyEfficiency?: number;
        weeklyEfficiency?: number;
        monthlyEfficiency?: number;
        quarterlyEfficiency?: number;
        sixMonthEfficiency?: number;
        annualEfficiency?: number;
        efficiency?: number;
        cancelNav?: number;
        issueNav?: number;
        statisticalNav?: number;
        netAsset?: number;
        manager?: string;
        guarantor?: string;
        date?: string;
        alpha?: number | null;
        beta?: number | null;
    };
}


@Injectable({
    providedIn: 'root'
})
export class FundDetailService {
    private readonly TTL = 20 * 60 * 1000;
    
    constructor(
        private http: HttpClient,
        @Inject(PLATFORM_ID) private platformId: object
    ) { }

    private getWithCache<T>(url: string, cacheKey: string): Observable<T> {

        if (!isPlatformBrowser(this.platformId)) {
            return this.http.get<T>(url);
        }

        const cached = localStorage.getItem(cacheKey);

        if (cached) {
            const { data, timestamp } = JSON.parse(cached);
            if (Date.now() - timestamp < this.TTL) {
                return new Observable(observer => {
                    observer.next(data);
                    observer.complete();
                });
            }
        }

        return new Observable(observer => {
            this.http.get<T>(url).subscribe({
                next: (data) => {
                    localStorage.setItem(cacheKey, JSON.stringify({
                        data,
                        timestamp: Date.now()
                    }));
                    observer.next(data);
                    observer.complete();
                },
                error: (err) => observer.error(err)
            });
        });
    }

    getFundPerformanceData(): Observable<FundPerformanceSection[]> {
        return this.getWithCache('/assets/json/table-data.json', 'fundPerformanceCache');
    }

    getNetAssetData(): Observable<NetAssetData[]> {
        return this.getWithCache('/assets/json/asset-comparison-value-data.json', 'netAssetCache');
    }

    getFundReturnData(): Observable<FundReturn[]> {
        return this.getWithCache('/assets/json/return-fund-data.json', 'fundReturnCache');
    }

    getMarketLineData(): Observable<MarketLineData[]> {
        return this.getWithCache('/assets/json/nav-comparison-data.json', 'marketLineCache');
    }

    getMarketData(): Observable<MarketData[]> {
        return this.getWithCache('/assets/json/Asset-data.json', 'marketDataCache');
    }

    getOwnershipData(): Observable<OwnershipData[]> {
        return this.getWithCache('/assets/json/Ownership-data.json', 'ownershipDataCache');
    }

    getFundTreeMapData(): Observable<FundTreeMapDataItem[]> {
        return new Observable(observer => {
            this.getWithCache<{ items: FundTreeMapDataItem[] }>(
                'assets/json/fund-treemap.json',
                'fundTreeMapCache'
            ).subscribe({
                next: (res) => {
                    observer.next(res.items || []);
                    observer.complete();
                },
                error: (err) => observer.error(err)
            });
        });
    }

}
