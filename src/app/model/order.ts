export class Order {
  orderId: string | null;
  customerName: string | null;
  amount: number | null ;
  status: string | null;
  orderMonth: string | null;
  subOrders?: SubOrder[];
  constructor(orderId: string | null, customerName: string | null, amount: number | null, status: string | null, orderMonth: string | null) {
    this.orderId = orderId;
    this.customerName = customerName;
    this.amount = amount ? amount : 0;
    this.status = status;
    this.orderMonth = orderMonth;
  }
}
export interface SubOrder {
  id: number;
  orderId: string;
  productId: number;
  brandname?: string;
  bunch?: string;
  size?: string;
  price?: number;
  quantity: number;
}    