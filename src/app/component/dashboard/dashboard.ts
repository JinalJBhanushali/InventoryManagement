import { Component } from '@angular/core';
import { OrdersChart } from '../../widgets/orders-chart/orders-chart';
import { StatCard } from '../../widgets/stat-card/stat-card';

@Component({
  selector: 'app-dashboard',
  imports: [OrdersChart,StatCard],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard {}
