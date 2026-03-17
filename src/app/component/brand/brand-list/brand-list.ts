import { CurrencyPipe } from '@angular/common';
import { Component, TemplateRef, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Brand } from '../../../model/item';
import { BrandDetailList } from '../../../constant/itemList';
import { RouterLink } from '@angular/router';
import { AddBrand } from '../add-brand/add-brand';

@Component({
  selector: 'app-brand-list',
  imports: [RouterLink,CurrencyPipe,MatTableModule,MatFormFieldModule, MatInputModule, MatPaginatorModule,MatButtonModule,MatDialogModule],
  templateUrl: './brand-list.html',
  styleUrl: './brand-list.scss',
})
export class BrandList {
    displayedBrandColumns: string[] = ['name', 'update', 'delete'];
  brandDataSource = new MatTableDataSource<Brand>(BrandDetailList);
  
  clickedBrandRows = new Set<Brand>();
    dialogRef!: MatDialogRef<any>;
    
  @ViewChild('callAPIDialog') callAPIDialog?: TemplateRef<any>;
  constructor(public dialog: MatDialog) { }
  openAddBrandDialog(brand?: any) {
    // console.log('product in openAddProductDialog', product);
    let dialogRef = this.dialog?.open(AddBrand, {
      width: '1350px',
      data: { data: brand }
    });

    dialogRef.afterClosed().subscribe((data: any) => {
      console.log('The dialog was closed', data);
      if (data?.isAddMode) {
        this.addBrand(data?.result);
      } else {
        this.updateBrand(data?.result);
      }
    });
  }
  deleteBrandDialog(brand: Brand) {
    this.dialogRef = this.dialog.open(this.callAPIDialog!, {
      width: '400px',
      data: { brand: brand  }
    });
    this.dialogRef.afterClosed().subscribe((result: any) => {
      // Note: If the user clicks outside the dialog or presses the escape key, there'll be no result
      if (result !== undefined) {
        if (result === 'yes') {
          this.deleteBrand(brand.id);
        }
      }
    })
  }
  addBrand(brand: any) {
    console.log("Adding Brand", brand);
    if (brand) {
      BrandDetailList.push(brand);
      this.brandDataSource.data = [...BrandDetailList];
    }
  }
  updateBrand(brand: any) {
    BrandDetailList.forEach((b, index) => {
      if (b.id === brand?.id) {
        BrandDetailList[index] = brand;
        this.brandDataSource.data = [...BrandDetailList];
      }
    })
  }
  deleteBrand(id: any) {
    console.log("Deleting Brand with id", id);
    const index = BrandDetailList.findIndex(o => o.id === id);
    if (index !== -1) {
      BrandDetailList.splice(index, 1);
      this.brandDataSource.data = [...BrandDetailList];
    } 
  }
}
