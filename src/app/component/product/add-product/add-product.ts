import { Component, Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Router, RouterLink } from '@angular/router';
import { Brand, Item } from '../../../model/item';
import { BrandDetailList } from '../../../constant/itemList';

@Component({
  selector: 'app-add-product',
  imports: [MatFormFieldModule, MatInputModule, MatSelectModule, MatButtonModule,RouterLink, ReactiveFormsModule,MatDialogModule],
  templateUrl: './add-product.html',
  styleUrl: './add-product.scss',
})
export class AddProduct {
  title? : string = 'Add';
  isAddMode : boolean = true;
   productForm = new FormGroup({
    id : new FormControl<number | null>(null),
    brandName : new FormControl<string | null>(null, Validators.required),
    bunch : new FormControl<number | null>(null, [Validators.required, Validators.pattern('^[0-9]*$')]),
    size : new FormControl<number | null>(null, [Validators.required, Validators.pattern('^[0-9]*$')]),
    price : new FormControl<number | null>(null, [Validators.required, Validators.pattern('^[0-9]+(\.[0-9]{1,2})?$')])
});
brands: Brand[] = BrandDetailList;
  constructor(private fb: FormBuilder, private router: Router,
    public dialogRef: MatDialogRef<AddProduct>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      if(data?.data) {
        this.title = 'Update';
        this.isAddMode = false;
        const product : Item = data.data;
        this.productForm.patchValue({
          id : product.id,
          brandName : product.brandName,
          bunch : product.bunch,
          price : product.price,
          size : product.size
        });
      }else{
        this.title = 'Add';
      }
    }

 
  

 
  saveProduct() : void {
    if(this.productForm.valid) {
      this.dialogRef.close({result : this.productForm.value, isAddMode : this.isAddMode});
      this.productForm.reset();
      //this.router.navigate(['/order']);
    }
  }
  closeDialog() : void {
    this.dialogRef.close();
  }
}
