import { Component, Inject, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { CustomerModel } from '../../../model/customerModel';
import { Router, RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Customer } from '../customer';
import { identity, max } from 'rxjs';

@Component({
  selector: 'app-add-customer',
  imports: [MatFormFieldModule, MatInputModule, MatSelectModule, MatButtonModule,RouterLink, ReactiveFormsModule,MatDialogModule],
  templateUrl: './add-customer.html',
  styleUrl: './add-customer.scss',
})
export class AddCustomer {
  // @ViewChild('customerList') customerList? : Customer ;
  title? : string = 'Add';
  isAddMode : boolean = true;
  
  constructor(private fb: FormBuilder, private router: Router,
    public dialogRef: MatDialogRef<AddCustomer>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      console.log('data in add customer', data);
      if(data?.data) {
        this.title = 'Update';
        this.isAddMode = false;
        const customer : CustomerModel = data.data;
        this.customerForm.patchValue({
          id : customer.id,
          customerName : customer.customerName,
          number : customer.number,
          gstNo : customer.gstNo ,
          openBalance : customer.openBalance,
          closeBalance : customer.closeBalance
        });
      }else{
        this.title = 'Add';
      }
    }

  customerForm = new FormGroup({
    id : new FormControl<number | null>(null),
    customerName : new FormControl<string | null>(null, Validators.required),
    number : new FormControl<string | null>(null, [Validators.required, Validators.maxLength(10),Validators.pattern('^[0-9]*$') ]),
    gstNo : new FormControl<string | null>(null, Validators.required),
    openBalance : new FormControl<number | null>(null),
    closeBalance : new FormControl<number | null>(null)
  });
  saveCustomer() : void {
    if(this.customerForm.valid) {
      this.dialogRef.close({result : this.customerForm.value, isAddMode : this.isAddMode});
      this.customerForm.reset();
      //this.router.navigate(['/order']);
    }
  }
  closeDialog() : void {
    this.dialogRef.close();
  }
}
