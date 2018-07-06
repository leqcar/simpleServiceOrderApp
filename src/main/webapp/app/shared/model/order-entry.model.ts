import { Moment } from 'moment';
import { IOrderItem } from 'app/shared/model//order-item.model';
import { ICustomer } from 'app/shared/model//customer.model';

export const enum ServiceType {
    PICKUP_DELIVERY = 'PICKUP_DELIVERY',
    DROPOFF = 'DROPOFF',
    SELF = 'SELF'
}

export const enum PaymentStatus {
    PAID = 'PAID',
    UNPAID = 'UNPAID'
}

export interface IOrderEntry {
    id?: number;
    serviceType?: ServiceType;
    transactionDate?: Moment;
    totalAmount?: number;
    paymentStatus?: PaymentStatus;
    orderItems?: IOrderItem[];
    customer?: ICustomer;
}

export class OrderEntry implements IOrderEntry {
    constructor(
        public id?: number,
        public serviceType?: ServiceType,
        public transactionDate?: Moment,
        public totalAmount?: number,
        public paymentStatus?: PaymentStatus,
        public orderItems?: IOrderItem[],
        public customer?: ICustomer
    ) {}
}
