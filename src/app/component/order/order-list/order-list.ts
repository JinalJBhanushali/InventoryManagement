import { CurrencyPipe } from '@angular/common';
import { Component, inject, Inject, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { OrderService } from '../../../services/order-service';
import { Subject, Subscription, takeUntil } from 'rxjs';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { Order, SubOrder } from '../../../model/order';
import {MatDialog, MAT_DIALOG_DATA,MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import { AddOrder } from '../add-order/add-order';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatSort, Sort, MatSortModule} from '@angular/material/sort';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { orderDetailList } from '../../../constant/orderList';
import { ProductList } from '../../product/product-list/product-list';
import { BrandDetailList, ItemList } from '../../../constant/itemList';
import { BrandList } from '../../brand/brand-list/brand-list';


@Component({
  selector: 'app-order-list',
  imports: [MatTableModule,MatSortModule,MatFormFieldModule, MatInputModule, MatPaginatorModule, CurrencyPipe,MatButtonModule,MatDialogModule],
  templateUrl: './order-list.html',
  styleUrl: './order-list.scss',
})
export class OrderList implements OnInit {

  displayedColumns: string[] = ['orderId', 'customerName', 'amount', 'status','view','update','delete'];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  dataSource = new MatTableDataSource<Order>(orderDetailList);
  subOrdersDataSource = new MatTableDataSource<SubOrder>([]);
   subOrdersDisplayedColumns: string[] = ['brandName','bunch','size','quantity','price','amount','update','delete'];
  
  orderMonth: string = '';
  private destroy$ = new Subject<void>();
  @ViewChild('callAPIDialog') callAPIDialog?: TemplateRef<any>;
  @ViewChild('orderDetailsDialog') orderDetailsDialog?: TemplateRef<any>;
  dialogRef!: MatDialogRef<any>;
  clickedRows = new Set<Order>();
  
  @ViewChild(MatSort) sort!: MatSort;
   private _liveAnnouncer = inject(LiveAnnouncer);
  constructor(private orderService: OrderService,public dialog: MatDialog) { }

  ngOnInit() {
    this.orderService.month$.pipe(takeUntil(this.destroy$)).subscribe((orderMonth: any) => {
      this.orderMonth = orderMonth;
      if (this.orderMonth != '') {
        this.filterOrders(this.orderMonth);
      }
    });
  }
  filterOrders(orderMonth: any) {
    if(orderMonth === '') {
      this.dataSource.data = orderDetailList;
    }else{
      const filtered = orderDetailList.filter(o => o.orderMonth === orderMonth);
      this.dataSource.data = filtered;
    }
    this.dataSource.sort = this.sort;
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  openAddOrderDialog(order? : any) {
     let dialogRef = this.dialog.open(AddOrder, {
      width: '1350px',
      data: { data: order }
    });

    dialogRef.afterClosed().subscribe((data : any) => {
      console.log('The dialog was closed', data);
      if(data?.isAddMode) {
        this.addOrder(data?.result);
      }else{
        this.updateOrder(data?.result);
      }
    });
  }
  deleteOrderDialog(id: any) {
    this.dialogRef = this.dialog.open(this.callAPIDialog!, {
        width: '400px',
        data: { orderId: id }
    });
        this.dialogRef.afterClosed().subscribe((result : any) => {
            // Note: If the user clicks outside the dialog or presses the escape key, there'll be no result
            if (result !== undefined) {
                if (result === 'yes') {
                    this.deleteOrder(id);
                } 
            }
        })
  }
  openOrderDetailsDialog(order: any) {
    let amount = 0;
    order.subOrders.forEach((so: any) => {
      const product = ItemList.find(p => p.id === so.productId);
      if(product) {
        so.brandName = BrandDetailList.find(b => b.id === product?.brandId)?.name || '';
        so.bunch = product.bunch;
        so.size = product.size;
        so.price = product.price;
        amount += (so.price * so.quantity * so.bunch);
      }
    });
    order.amount = amount;
    console.log("Order Details", order);
    this.subOrdersDataSource.data = order.subOrders || [];
    this.dialog.open(this.orderDetailsDialog!, {
      width: '1400px',
      data: { order: order }
    });
    // this.dialogRef.afterClosed().subscribe((result : any) => {
    //         // Note: If the user clicks outside the dialog or presses the escape key, there'll be no result
    //         if (result !== undefined) {
    //             if (result === 'yes') {
    //                 //this.deleteOrder(id);
    //                 console.log("Implement action for yes")
    //             } 
    //         }
    //     })
  }
  addOrder(order: any) {
    console.log("Adding Order", order);
    if (order) {
      orderDetailList.push(order);
      this.dataSource.data = [...orderDetailList]; // Trigger table update
      this.dataSource.sort = this.sort;
    }
  }
  updateOrder(order: any) {
    orderDetailList.forEach((o, index) => {
      if(o.orderId === order.orderId){
        orderDetailList[index] = order;
        this.dataSource.data = [...orderDetailList];
        this.dataSource.sort = this.sort;
      }
    })
  }
  deleteOrder(orderId: any) {
    const index = orderDetailList.findIndex(o => o.orderId === orderId);
    if (index !== -1) {
      orderDetailList.splice(index, 1);
      this.dataSource.data = [...orderDetailList];
      this.dataSource.sort = this.sort;
    }
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    // // Custom sorting for orderId to sort numerically
    // this.dataSource.sortingDataAccessor = (item: Order, property: string) => {
    //   switch (property) {
    //     case 'orderId':
    //       return parseInt(item.orderId!.replace('ORD', ''));
    //     case 'amount':
    //       return item.amount || 0;
    //     default:
    //       return (item as any)[property] || '';
    //   }
    // };
  }
  viewAllOrders() {
    this.orderService.setOrderMonth('');
    this.dataSource.data = orderDetailList;
  }
  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
    this.orderService.setOrderMonth('');
  }
  
  /** Announce the change in sort state for assistive technology. */
  announceSortChange(sortState: Sort) {
    // This example uses English messages. If your application supports
    // multiple language, you would internationalize these strings.
    // Furthermore, you can customize the message to add additional
    // details about the values being sorted.
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }
}


const orderMonths = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
];

const orderCounts = [10, 20, 15, 25, 30, 18, 22, 28, 35, 40, 38, 45];

const customerNames = [
  'John', 'Alice', 'Mark', 'Sarah', 'Sean',
  'Jorg', 'Mike', 'Jerry', 'Tom', 'Ali', 'Gen', 'Sur'
];

const statuses = [
  'Delivered', 'Pending', 'Shipped', 'Processing'
];

let orderId = 1;



// orderMonths.forEach((orderMonth, mIndex) => {

//   for (let i = 0; i < orderCounts[mIndex]; i++) {

//     orderDetailList.push({
//       orderId: `ORD${String(orderId).padStart(4, '0')}`,
//       customerName: customerNames[i % customerNames.length],
//       amount: Math.floor(Math.random() * 300) + 50,
//       status: statuses[i % statuses.length],
//       orderMonth: orderMonth
//     });

//     orderId++;

//   }
//   console.log(orderDetailList)

// });