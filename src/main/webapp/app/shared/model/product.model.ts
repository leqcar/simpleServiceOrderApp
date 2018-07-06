export const enum ProductCategory {
    SERVICE_WASH = 'SERVICE_WASH',
    SERVICE_DRY = 'SERVICE_DRY',
    SERVICE_FOLD = 'SERVICE_FOLD',
    CHEMICAL = 'CHEMICAL',
    SPIN_DRY = 'SPIN_DRY',
    PLASTIC = 'PLASTIC'
}

export interface IProduct {
    id?: number;
    code?: string;
    productName?: string;
    productCategory?: ProductCategory;
    unitPrice?: number;
    quantity?: number;
}

export class Product implements IProduct {
    constructor(
        public id?: number,
        public code?: string,
        public productName?: string,
        public productCategory?: ProductCategory,
        public unitPrice?: number,
        public quantity?: number
    ) {}
}
