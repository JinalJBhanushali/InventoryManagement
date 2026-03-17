import { Brand, Item } from "../model/item"

export const ItemList : Item[] = [
    { id: 1, brandId: 1,   size : 250, bunch: 35, price: 10 },
    { id: 2, brandId: 1,size: 500, bunch: 24, price: 20 },
    { id: 3, brandId: 1,  size: 750, bunch: 12, price: 30 },
    { id: 4, brandId: 1,  size: 1000, bunch: 12, price: 40 },
    { id: 5, brandId: 2, size: 250, bunch: 35, price: 20 },
    { id: 6, brandId: 2, size: 500, bunch: 24, price: 30 },
    { id: 7, brandId: 2, size: 750, bunch: 12, price: 40 },
    { id: 4, brandId: 2, size: 1000, bunch: 12, price: 50 },
    { id: 5, brandId: 3, size: 250, bunch: 35, price: 30 },
    { id: 6, brandId: 3, size: 500, bunch: 24, price: 40 },
    { id: 7, brandId: 3, size: 750, bunch: 12, price: 50 },
    { id: 4, brandId: 3, size: 1000, bunch: 12, price: 60 },
]
export const BrandDetailList : Brand[] = [
    { id: 1, name: 'Brand 1' },
    { id: 2, name: 'Brand 2' }, 
    { id: 3, name: 'Brand 3' }
]