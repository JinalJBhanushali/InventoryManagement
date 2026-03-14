import { Routes } from '@angular/router';


export const routes: Routes = [
{
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  {
    path: 'dashboard',
    loadComponent: () => import('./component/dashboard/dashboard').then(m => m.Dashboard)
  },
  {
    path: 'order',
    loadComponent: () => import('./component/order/order-list/order-list').then(m => m.OrderList),
  },
  {
    path: 'order/add',
    loadComponent: () => import('./component/order/add-order/add-order').then(m => m.AddOrder),
  }
];
