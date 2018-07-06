import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { IOrderEntry } from 'app/shared/model/order-entry.model';
import { OrderEntryService } from './order-entry.service';
import { ICustomer } from 'app/shared/model/customer.model';
import { CustomerService } from 'app/entities/customer';

@Component({
    selector: 'jhi-order-entry-update',
    templateUrl: './order-entry-update.component.html'
})
export class OrderEntryUpdateComponent implements OnInit {
    private _orderEntry: IOrderEntry;
    isSaving: boolean;

    customers: ICustomer[];
    transactionDateDp: any;

    constructor(
        private jhiAlertService: JhiAlertService,
        private orderEntryService: OrderEntryService,
        private customerService: CustomerService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ orderEntry }) => {
            this.orderEntry = orderEntry;
        });
        this.customerService.query({ filter: 'orderentry-is-null' }).subscribe(
            (res: HttpResponse<ICustomer[]>) => {
                if (!this.orderEntry.customer || !this.orderEntry.customer.id) {
                    this.customers = res.body;
                } else {
                    this.customerService.find(this.orderEntry.customer.id).subscribe(
                        (subRes: HttpResponse<ICustomer>) => {
                            this.customers = [subRes.body].concat(res.body);
                        },
                        (subRes: HttpErrorResponse) => this.onError(subRes.message)
                    );
                }
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.orderEntry.id !== undefined) {
            this.subscribeToSaveResponse(this.orderEntryService.update(this.orderEntry));
        } else {
            this.subscribeToSaveResponse(this.orderEntryService.create(this.orderEntry));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IOrderEntry>>) {
        result.subscribe((res: HttpResponse<IOrderEntry>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }

    trackCustomerById(index: number, item: ICustomer) {
        return item.id;
    }
    get orderEntry() {
        return this._orderEntry;
    }

    set orderEntry(orderEntry: IOrderEntry) {
        this._orderEntry = orderEntry;
    }
}
