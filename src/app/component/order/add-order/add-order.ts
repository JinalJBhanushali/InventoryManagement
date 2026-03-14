import { Component } from '@angular/core';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-add-order',
  imports: [MatFormFieldModule, MatInputModule, MatSelectModule, MatButtonModule,RouterLink],
  templateUrl: './add-order.html',
  styleUrl: './add-order.scss',
})
export class AddOrder {
   months = [
    'Jan','Feb','Mar','Apr','May','Jun',
    'Jul','Aug','Sep','Oct','Nov','Dec'
  ];
}
