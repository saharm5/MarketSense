import {
    Component,
    Input,
    OnChanges,
    SimpleChanges,
    Inject,
    PLATFORM_ID
} from '@angular/core';
import { isPlatformBrowser, DOCUMENT, CommonModule } from '@angular/common';
import * as Highcharts from 'highcharts';
import { HighchartsChartModule } from 'highcharts-angular';

@Component({
    selector: 'app-pie-chart',
    standalone: true,
    templateUrl: './pie-chart.component.html',
    imports: [HighchartsChartModule, CommonModule]
})
export class PieChartComponent implements OnChanges {
    @Input() data!: { name: string; percentage: number; color: string }[];
    @Input() isDarkMode = false;
    @Input() title = '';

    Highcharts: typeof Highcharts = Highcharts;
    chartOptions: Highcharts.Options = {};
    chartRef: Highcharts.Chart | null = null;

    constructor(
        @Inject(DOCUMENT) private document: Document,
        @Inject(PLATFORM_ID) private platformId: object
    ) { }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['data']) this.setChartOptions();
        if (changes['isDarkMode'] && !changes['isDarkMode'].firstChange) {
            this.setChartOptions();
            this.chartRef?.update(this.chartOptions);
        }
    }

    setChartOptions(): void {
        const root = isPlatformBrowser(this.platformId)
            ? getComputedStyle(this.document.documentElement)
            : ({} as CSSStyleDeclaration);

        const textColor =
            root.getPropertyValue('--text-color') || (this.isDarkMode ? '#fff' : '#000');
        const bgColor = this.isDarkMode ? '#081122' : '#ffffff';
        const isSmallScreen = isPlatformBrowser(this.platformId) && window.innerWidth < 400;
        this.chartOptions = {
            credits: {
                enabled: false
            }
            ,
            chart: {
                type: 'pie',
                backgroundColor: bgColor
            },
            title: {
                text: this.title,
                style: { color: textColor }
            },
            tooltip: {
                pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>',
                backgroundColor: bgColor,
                style: { color: textColor }
            },
            accessibility: {
                point: { valueSuffix: '%' }
            },
            legend: {
                layout: 'horizontal',      
                align: 'center',            
                verticalAlign: 'bottom',       
                itemMarginTop: 4,
                itemMarginBottom: 4,
                symbolHeight: 10,
                symbolWidth: 10,
                itemStyle: {
                    color: textColor,
                    fontSize: isSmallScreen ? '10px' : '12px',
                    whiteSpace: 'nowrap'  
                }
            },
            plotOptions: {
                pie: {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    showInLegend: true,
                    size: '180px', 
                    dataLabels: {
                        enabled: true,
                        format: '{point.percentage:.1f}%',
                        style: { color: textColor }
                    }
                }
            }
            ,
            series: [
                {
                    name: 'درصد',
                    type: 'pie',
                    colorByPoint: false,
                    data: this.data?.map(item => ({
                        name: item.name,
                        // eslint-disable-next-line id-length
                        y: item.percentage,
                        color: item.color
                    })) || []
                } as Highcharts.SeriesPieOptions
            ]
        };

    }


    saveInstance(chart: Highcharts.Chart): void {
        this.chartRef = chart;
    }
}
