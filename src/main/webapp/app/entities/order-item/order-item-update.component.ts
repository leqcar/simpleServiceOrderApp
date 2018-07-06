import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { IOrderItem } from 'app/shared/model/order-item.model';
import { OrderItemService } from './order-item.service';
import { IOrderEntry } from 'app/shared/model/order-entry.model';
import { OrderEntryService } from 'app/entities/order-entry';

@Component({
    selector: 'jhi-order-item-update',
    templateUrl: './order-item-update.component.html'
})
export class OrderItemUpdateComponent implements OnInit {
    private _orderItem: IOrderItem;
    isSaving: boolean;

    orderentries: IOrderEntry[];

    constructor(
        private jhiAlertService: JhiAlertService,
        private orderItemService: OrderItemService,
        private orderEntryService: OrderEntryService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ orderItem }) => {
            this.orderItem = orderItem;
        });
        this.orderEntryService.query().subscribe(
            (res: HttpResponse<IOrderEntry[]>) => {
                this.orderentries = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.orderItem.id !== undefined) {
            this.subscribeToSaveResponse(this.orderItemService.update(this.orderItem));
        } else {
            this.subscribeToSaveResponse(this.orderItemService.create(this.orderItem));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IOrderItem>>) {
        result.subscribe((res: HttpResponse<IOrderItem>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackOrderEntryById(index: number, item: IOrderEntry) {
        return item.id;
    }
    get orderItem() {
        return this._orderItem;
    }

    set orderItem(orderItem: IOrderItem) {
        this._orderItem = orderItem;
    }
}
