export interface Item {
    id: number;
    brandId: number;
    size: number;
    brandName?: string;
    bunch: number;
    price: number;
}
export interface Brand {
    id: number;
    name: string;
}