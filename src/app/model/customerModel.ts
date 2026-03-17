export interface CustomerModel {
    id?: number;
    customerName: string;
    number: string;
    gstNo: string;
    openBalance?: number;
    closeBalance?: number;
}