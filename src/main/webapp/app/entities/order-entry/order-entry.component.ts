import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IOrderEntry } from 'app/shared/model/order-entry.model';
import { Principal } from 'app/core';
import { OrderEntryService } from './order-entry.service';

@Component({
    selector: 'jhi-order-entry',
    templateUrl: './order-entry.component.html'
})
export class OrderEntryComponent implements OnInit, OnDestroy {
    orderEntries: IOrderEntry[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private orderEntryService: OrderEntryService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.orderEntryService.query().subscribe(
            (res: HttpResponse<IOrderEntry[]>) => {
                this.orderEntries = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInOrderEntries();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IOrderEntry) {
        return item.id;
    }

    registerChangeInOrderEntries() {
        this.eventSubscriber = this.eventManager.subscribe('orderEntryListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
