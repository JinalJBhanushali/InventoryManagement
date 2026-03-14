import { Component, Inject } from '@angular/core';
import { BaseChartDirective } from 'ng2-charts';
import { OrderService } from '../../services/order-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-orders-chart',
  imports: [BaseChartDirective],
  templateUrl: './orders-chart.html',
  styleUrl: './orders-chart.scss',
})
export class OrdersChart {

  months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  constructor(private orderService: OrderService, private router : Router) {}
  lineChartData = {
    labels: this.months,
    datasets: [
      {
        data: [10, 20, 15, 25, 30, 18, 22, 28, 35, 40, 38, 45],
        label: 'Orders'
      }
    ]
  };

  chartOptions = {
    responsive: true
  };

  onChartClick(event: any) {
    if (event?.active?.length > 0) {
      const index = event.active[0].index;
      var month = this.months[index];
      this.orderService.setOrderMonth(month);
      this.router.navigate(['/orders']);
      console.log("Clicked month:", month);
    }
  }
}
