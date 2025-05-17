
import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { FundDetailComponent } from './pages/fund-detail/fund-detail.component';
import { TreeMapPageComponent } from './pages/tree-map-page/tree-map-page.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'treemap', component: TreeMapPageComponent },
  { path: 'fund/:id', component: FundDetailComponent },

];
