import { IOrderEntry } from 'app/shared/model/order-entry.model';

export interface IOrderItem {
    id?: number;
    itemCode?: string;
    itemName?: string;
    quantity?: number;
    unitAmount?: number;
    orderEntry?: IOrderEntry;
}

export class OrderItem implements IOrderItem {
    constructor(
        public id?: number,
        public itemCode?: string,
        public itemName?: string,
        public quantity?: number,
        public unitAmount?: number,
        public orderEntry?: IOrderEntry
    ) {}
}
