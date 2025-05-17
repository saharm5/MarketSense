
import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { TreeMapComponent } from './core/shared/tree-map/tree-map.component';
import { FundDetailComponent } from './pages/fund-detail/fund-detail.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'treemap', component: TreeMapComponent },
  { path: 'fund/:id', component: FundDetailComponent },

];
