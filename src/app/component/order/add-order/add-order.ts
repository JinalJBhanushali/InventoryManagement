import { Component, Inject, ViewChild } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterLink } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { OrderList } from '../order-list/order-list';
import { Order } from '../../../model/order';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatDialogModule} from '@angular/material/dialog';
import { customerDetailList } from '../../../constant/customerList';
@Component({
  selector: 'app-add-order',
  imports: [MatFormFieldModule, MatInputModule, MatSelectModule, MatButtonModule,RouterLink, ReactiveFormsModule,MatDialogModule ],
  templateUrl: './add-order.html',
  styleUrl: './add-order.scss',
})
export class AddOrder {
   months = [
    'Jan','Feb','Mar','Apr','May','Jun',
    'Jul','Aug','Sep','Oct','Nov','Dec'
  ];
  statusList = ['Pending', 'Shipped', 'Delivered', 'Cancelled'];
  customerList = customerDetailList;
  @ViewChild('orderList') orderList? : OrderList;
  title? : string = 'Add';
  isAddMode : boolean = true;
  
  constructor(private fb: FormBuilder, private router: Router,
    public dialogRef: MatDialogRef<AddOrder>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      if(data?.data) {
        this.title = 'Update';
        this.isAddMode = false;
        const order : Order = data.data;
        this.orderForm.patchValue({
          orderId : order.orderId,
          customerName : order.customerName,
          amount : order.amount,
          status : order.status,
          orderMonth : order.orderMonth
        });
      }else{
        this.title = 'Add';
      }
    }

  orderForm = new FormGroup({
    orderId : new FormControl<string | null>(null, Validators.required),
    customerName : new FormControl<string | null>(null, Validators.required),
    amount : new FormControl<number | null>(null, Validators.required),
    status : new FormControl<string | null>(null, Validators.required),
    orderMonth : new FormControl<string | null>(null, Validators.required)  
  });
  saveOrder() : void {
    // if(this.orderForm.valid) {
    //   debugger;
    //   this.orderList?.addOrder(this.orderForm.value);
    //   this.orderForm.reset();
    //   this.router.navigate(['/order']);
    // }
    if(this.orderForm.valid) {
      this.dialogRef.close({result : this.orderForm.value, isAddMode : this.isAddMode});
      this.orderForm.reset();
      //this.router.navigate(['/order']);
    }
  }
  closeDialog() : void {
    this.dialogRef.close();
  }
}
