// /* eslint-disable id-length */
// import { Routes } from '@angular/router';
// import { HomeComponent } from './pages/home/home.component';
// import { FundDetailComponent } from './pages/fund-detail/fund-detail.component';
// // import { TreeMapPageComponent } from './pages/tree-map-page/tree-map-page.component';
// // import { NotFoundComponent } from './features/not-found/not-found.component';

// export const routes: Routes = [
//   { path: '', component: HomeComponent },
//   { path: 'fund/:id', component: FundDetailComponent },
//   {
//     path: 'treemap',
//     loadChildren: () => import('./pages/tree-map-page/tree-map.routes').then(m => m.routes)
//   }
  
//   // { path: '**', component: NotFoundComponent }
// ];
import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { TreeMapComponent } from './core/shared/tree-map/tree-map.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'treemap', component: TreeMapComponent },
];
