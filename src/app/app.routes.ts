import { Routes } from '@angular/router';
import { SalesInvoice } from './component/invoice/sales-invoice/sales-invoice';
import { PurchaseInvoice } from './component/invoice/purchase-invoice/purchase-invoice';
import { SalesReturn } from './component/invoice/sales-return/sales-return';
import { PurchaseReturn } from './component/invoice/purchase-return/purchase-return';
import { Quotation } from './component/invoice/quotation/quotation';
import { ChallanInvoice } from './component/invoice/challan-invoice/challan-invoice';


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
    path: 'product',
    loadComponent: () => import('./component/product/product-list/product-list').then(m => m.ProductList),
  },
   {
    path: 'brand',
    loadComponent: () => import('./component/brand/brand-list/brand-list').then(m => m.BrandList),
  },
  {
    path: 'order',
    loadComponent: () => import('./component/order/order-list/order-list').then(m => m.OrderList),
  },
  {
    path: 'order/add',
    loadComponent: () => import('./component/order/add-order/add-order').then(m => m.AddOrder),
  },
  {
    path: 'invoice',
    children: [
        { path: 'challan', component: ChallanInvoice },
        { path: 'sales', component: SalesInvoice },
        { path: 'purchase', component: PurchaseInvoice },
        { path: 'sales-return', component: SalesReturn },
        { path: 'purchase-return', component: PurchaseReturn },
        { path: 'quotation', component: Quotation }
    ]
  },
  {
    path: 'customer',
    loadComponent: () => import('./component/customer/customer').then(m => m.Customer),
  },
  {
    path: 'production',
    loadComponent: () => import('./component/production/production').then(m => m.Production),
  },
  {
    path: 'inventory',
    loadComponent: () => import('./component/inventory/inventory').then(m => m.Inventory),
  },
  {
    path: 'payment',
    loadComponent: () => import('./component/payment/payment').then(m => m.Payment),
  },
  {
    path: 'report',
    loadComponent: () => import('./component/reports/reports').then(m => m.Reports),
  }
];
