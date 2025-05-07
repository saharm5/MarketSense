import { Routes } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';
import { FundDetailComponent } from './pages/fund-detail/fund-detail.component';
// import { NotFoundComponent } from './features/not-found/not-found.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'fund/:id', component: FundDetailComponent },
  // { path: '**', component: NotFoundComponent } // صفحه 404
];