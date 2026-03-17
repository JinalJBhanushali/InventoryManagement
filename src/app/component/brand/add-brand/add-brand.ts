import { Component, Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Router, RouterLink } from '@angular/router';
import { Brand } from '../../../model/item';

@Component({
  selector: 'app-add-brand',
  imports: [MatFormFieldModule, MatInputModule, MatSelectModule, MatButtonModule, RouterLink, ReactiveFormsModule, MatDialogModule],
  templateUrl: './add-brand.html',
  styleUrl: './add-brand.scss',
})
export class AddBrand {
  title?: string = 'Add';
  isAddMode: boolean = true;
  brandForm = new FormGroup({
    id: new FormControl<number | null>(null),
    name: new FormControl<string | null>(null, Validators.required),
  });
  constructor(private fb: FormBuilder, private router: Router,
    public dialogRef: MatDialogRef<AddBrand>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    if (data?.data) {
      this.title = 'Update';
      this.isAddMode = false;
      const product: Brand = data.data;
      this.brandForm.patchValue({
        id: product.id,
        name: product.name
      });
    } else {
      this.title = 'Add';
    }
  }

  saveBrand(): void {
    if (this.brandForm.valid) {
      this.dialogRef.close({ result: this.brandForm.value, isAddMode: this.isAddMode });
      this.brandForm.reset();
      //this.router.navigate(['/order']);
    }
  }
  closeDialog(): void {
    this.dialogRef.close();
  }
}
