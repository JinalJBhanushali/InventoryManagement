import { AfterViewInit, Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Brand, Item } from '../../../model/item';
import { BrandDetailList, ItemList } from '../../../constant/itemList';
import { AddProduct } from '../add-product/add-product';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-product-list',
  imports: [RouterLink,CommonModule,CurrencyPipe,MatTableModule,MatFormFieldModule, MatInputModule, MatPaginatorModule,MatButtonModule,MatDialogModule],
  templateUrl: './product-list.html',
  styleUrl: './product-list.scss',
})
export class ProductList implements AfterViewInit, OnInit{
   displayedColumns: string[] = ['brandName','size','bunch', 'price', 'update', 'delete'];
 
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  dataSource = new MatTableDataSource<Item>(ItemList);
  
  @ViewChild('callAPIDialog') callAPIDialog?: TemplateRef<any>;
  dialogRef!: MatDialogRef<any>;
  clickedRows = new Set<Item>();
  constructor(public dialog: MatDialog) { }
  ngOnInit(): void {
    ItemList.forEach(item => {
      BrandDetailList.forEach((brand) => {
        if (item.brandId === brand.id) {
          item.brandName = brand.name;
        }
      });
    });
    this.dataSource.data = ItemList;
  }
 openAddProductDialog(product?: any) {
    console.log('product in openAddProductDialog', product);
    let dialogRef = this.dialog?.open(AddProduct, {
      width: '1350px',
      data: { data: product }
    });

    dialogRef.afterClosed().subscribe((data: any) => {
      console.log('The dialog was closed', data);
      if (data?.isAddMode) {
        this.addProduct(data?.result);
      } else {
        this.updateProduct(data?.result);
      }
    });
  }
  deleteProductDialog(product: Item) {
    this.dialogRef = this.dialog.open(this.callAPIDialog!, {
      width: '400px',
      data: { product: product  }
    });
    this.dialogRef.afterClosed().subscribe((result: any) => {
      // Note: If the user clicks outside the dialog or presses the escape key, there'll be no result
      if (result !== undefined) {
        if (result === 'yes') {
          this.deleteProduct(product.id);
        }
      }
    })
  }
  addProduct(product: any) {
    console.log("Adding Product", product);
    if (product) {
      ItemList.push(product);
      this.dataSource.data = [...ItemList]; 
    }
  }
  updateProduct(product: any) {
    ItemList.forEach((p, index) => {
      if (p.id === product?.id) {
        ItemList[index] = product;
        this.dataSource.data = [...ItemList];
      }
    })
  }
  deleteProduct(id: any) {
    console.log("Deleting Product with id", id);
    const index = ItemList.findIndex(o => o.id === id);
    if (index !== -1) {
      ItemList.splice(index, 1);
      this.dataSource.data = [...ItemList];
    } 
  }
 
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;

  }
}
