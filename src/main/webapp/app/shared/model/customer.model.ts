export interface ICustomer {
    id?: number;
    lastName?: string;
    firstName?: string;
    address?: string;
    contactNumber?: string;
}

export class Customer implements ICustomer {
    constructor(
        public id?: number,
        public lastName?: string,
        public firstName?: string,
        public address?: string,
        public contactNumber?: string
    ) {}
}
