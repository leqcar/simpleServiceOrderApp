import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IOrderEntry } from 'app/shared/model/order-entry.model';

@Component({
    selector: 'jhi-order-entry-detail',
    templateUrl: './order-entry-detail.component.html'
})
export class OrderEntryDetailComponent implements OnInit {
    orderEntry: IOrderEntry;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ orderEntry }) => {
            this.orderEntry = orderEntry;
        });
    }

    previousState() {
        window.history.back();
    }
}
