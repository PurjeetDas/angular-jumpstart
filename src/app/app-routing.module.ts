import { NgModule } from '@angular/core';
import { RouterModule, Routes, PreloadAllModules, NoPreloading } from '@angular/router';

import { PreloadModulesStrategy } from './core/strategies/preload-modules.strategy';

const app_routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/customers' },
  { path: 'customers/:id', data: { preload: true }, loadChildren: () => import('./customer/customer.module').then(m => m.CustomerModule) },
  { path: 'customers', loadChildren: () => import('./customers/customers.module').then(m => m.CustomersModule) }
];

@NgModule({
  imports: [ RouterModule.forRoot(app_routes, { preloadingStrategy: PreloadModulesStrategy, /* enableTracing: true */ }) ],
  exports: [ RouterModule ],
  providers: [PreloadModulesStrategy]
})
export class AppRoutingModule { }
