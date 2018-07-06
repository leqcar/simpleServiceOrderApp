import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IOrderEntry } from 'app/shared/model/order-entry.model';
import { OrderEntryService } from './order-entry.service';

@Component({
    selector: 'jhi-order-entry-delete-dialog',
    templateUrl: './order-entry-delete-dialog.component.html'
})
export class OrderEntryDeleteDialogComponent {
    orderEntry: IOrderEntry;

    constructor(private orderEntryService: OrderEntryService, public activeModal: NgbActiveModal, private eventManager: JhiEventManager) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.orderEntryService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'orderEntryListModification',
                content: 'Deleted an orderEntry'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-order-entry-delete-popup',
    template: ''
})
export class OrderEntryDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ orderEntry }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(OrderEntryDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
                this.ngbModalRef.componentInstance.orderEntry = orderEntry;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate([{ outlets: { popup: null } }], { replaceUrl: true, queryParamsHandling: 'merge' });
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate([{ outlets: { popup: null } }], { replaceUrl: true, queryParamsHandling: 'merge' });
                        this.ngbModalRef = null;
                    }
                );
            }, 0);
        });
    }

    ngOnDestroy() {
        this.ngbModalRef = null;
    }
}
