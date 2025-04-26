// import { Routes } from '@angular/router';
// import { HomeComponent } from './pages/home/home.component';
// import { FundComparisonComponent } from './pages/fund-comparison/fund-comparison.component';
// import { FundListComponent } from './pages/investment-types/fund-list/fund-list.component';
// import { FundMapComponent } from './pages/investment-types/fund-map/fund-map.component';
// import { FundDetailComponent } from './pages/fund-detail/fund-detail.component';

// export const routes: Routes = [
//     { path: '', component: HomeComponent },
//     { path: 'fund-comparison', component: FundComparisonComponent },
//     { path: 'investment-types/list', component: FundListComponent },
//     { path: 'investment-types/map', component: FundMapComponent },
//     { path: 'fund-detail', component: FundDetailComponent },
//     { path: 'fund-detail/:id', loadComponent: () => import('./pages/fund-detail/fund-info/fund-info.component').then(m => m.FundInfoComponent) },
//     { path: '**', redirectTo: '' }
// ];
import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { InvestmentTypesComponent } from './pages/investment-types/investment-types.component';
import { FundDetailComponent } from './pages/fund-detail/fund-detail.component';
import { FundComparisonComponent } from './pages/fund-comparison/fund-comparison.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'investment-types', component: InvestmentTypesComponent },
    { path: 'fund/:id', component: FundDetailComponent },
    { path: 'fund-comparison', component: FundComparisonComponent },
];
