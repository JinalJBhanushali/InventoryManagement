import { CurrencyPipe } from '@angular/common';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { OrderService } from '../../../services/order-service';
import { Subject, Subscription, takeUntil } from 'rxjs';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-order-list',
  imports: [MatTableModule, MatPaginatorModule, CurrencyPipe,MatButtonModule,RouterLink],
  templateUrl: './order-list.html',
  styleUrl: './order-list.scss',
})
export class OrderList implements OnInit {

  displayedColumns: string[] = ['orderId', 'customer', 'amount', 'status'];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  dataSource = new MatTableDataSource<Order>(ELEMENT_DATA);
  orderMonth: string = '';
  private destroy$ = new Subject<void>();
  
  constructor(private orderService: OrderService) { }

  ngOnInit() {
    this.orderService.month$.pipe(takeUntil(this.destroy$)).subscribe((month: any) => {
      this.orderMonth = month;
      if (this.orderMonth != '') {
        this.filterOrders(this.orderMonth);
      }
    });

  }
  filterOrders(month: any) {
    const filtered = ELEMENT_DATA.filter(o => o.month === month);
    this.dataSource.data = filtered;
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
    this.orderService.setOrderMonth('');
  }
}

interface Order {
  orderId: string;
  customer: string;
  amount: number;
  status: string;
  month: string;
}

const months = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
];

const orderCounts = [10, 20, 15, 25, 30, 18, 22, 28, 35, 40, 38, 45];

const customers = [
  'John', 'Alice', 'Mark', 'Sarah', 'Sean',
  'Jorg', 'Mike', 'Jerry', 'Tom', 'Ali', 'Gen', 'Sur'
];

const statuses = [
  'Delivered', 'Pending', 'Shipped', 'Processing'
];

let orderId = 1;

const ELEMENT_DATA: Order[] = [];

months.forEach((month, mIndex) => {

  for (let i = 0; i < orderCounts[mIndex]; i++) {

    ELEMENT_DATA.push({
      orderId: `ORD${String(orderId).padStart(4, '0')}`,
      customer: customers[i % customers.length],
      amount: Math.floor(Math.random() * 300) + 50,
      status: statuses[i % statuses.length],
      month: month
    });

    orderId++;

  }

});