import { Component, inject, TemplateRef, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { CustomerModel } from '../../model/customerModel';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatSort, MatSortModule, Sort } from '@angular/material/sort';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { customerDetailList } from '../../constant/customerList';
import { AddCustomer } from './add-customer/add-customer';

@Component({
  selector: 'app-customer',
  imports: [MatTableModule,MatSortModule,MatFormFieldModule, MatInputModule, MatPaginatorModule,MatButtonModule,MatDialogModule],
  templateUrl: './customer.html',
  styleUrl: './customer.scss',
})
export class Customer {
  displayedColumns: string[] = ['customerName', 'number', 'gstNo', 'openBalance', 'closeBalance', 'update', 'delete'];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  dataSource = new MatTableDataSource<CustomerModel>(customerDetailList);
  @ViewChild('callAPIDialog') callAPIDialog?: TemplateRef<any>;
  dialogRef!: MatDialogRef<any>;
  clickedRows = new Set<CustomerModel>();

  @ViewChild(MatSort) sort!: MatSort;
  private _liveAnnouncer = inject(LiveAnnouncer);
  constructor(public dialog: MatDialog) { }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  openAddCustomerDialog(customer?: any) {
    console.log('customer in openAddCustomerDialog', customer);
    let dialogRef = this.dialog?.open(AddCustomer, {
      width: '1350px',
      data: { data: customer }
    });

    dialogRef.afterClosed().subscribe((data: any) => {
      console.log('The dialog was closed', data);
      if (data?.isAddMode) {
        this.addCustomer(data?.result);
      } else {
        this.updateCustomer(data?.result);
      }
    });
  }
  deleteCustomerDialog(customer: CustomerModel) {
    this.dialogRef = this.dialog.open(this.callAPIDialog!, {
      width: '400px',
      data: { customer: customer }
    });
    this.dialogRef.afterClosed().subscribe((result: any) => {
      // Note: If the user clicks outside the dialog or presses the escape key, there'll be no result
      if (result !== undefined) {
        if (result === 'yes') {
          this.deleteCustomer(customer.id);
        }
      }
    })
  }
  addCustomer(customer: any) {
    console.log("Adding Customer", customer);
    if (customer) {
      customerDetailList.push(customer);
      this.dataSource.data = [...customerDetailList]; // Trigger table update
      this.dataSource.sort = this.sort;
    }
  }
  updateCustomer(customer: any) {
    customerDetailList.forEach((c, index) => {
      if (c.id === customer?.id) {
        customerDetailList[index] = customer;
        this.dataSource.data = [...customerDetailList];
        this.dataSource.sort = this.sort;
      }
    })
  }
  deleteCustomer(id: any) {
    console.log("Deleting Customer with id", id);
    const index = customerDetailList.findIndex(o => o.id === id);
    if (index !== -1) {
      customerDetailList.splice(index, 1);
      this.dataSource.data = [...customerDetailList];
      this.dataSource.sort = this.sort;
    } 
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

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
