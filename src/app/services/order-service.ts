import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OrderService {

  private orderMonth = new BehaviorSubject<string>('');
  month$ = this.orderMonth.asObservable();

  setOrderMonth(month: any) {
    this.orderMonth.next(month);
  }

}
