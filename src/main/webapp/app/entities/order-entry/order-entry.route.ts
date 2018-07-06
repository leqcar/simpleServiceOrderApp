import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable } from 'rxjs';
import { OrderEntry } from 'app/shared/model/order-entry.model';
import { OrderEntryService } from './order-entry.service';
import { OrderEntryComponent } from './order-entry.component';
import { OrderEntryDetailComponent } from './order-entry-detail.component';
import { OrderEntryUpdateComponent } from './order-entry-update.component';
import { OrderEntryDeletePopupComponent } from './order-entry-delete-dialog.component';
import { IOrderEntry } from 'app/shared/model/order-entry.model';

@Injectable({ providedIn: 'root' })
export class OrderEntryResolve implements Resolve<IOrderEntry> {
    constructor(private service: OrderEntryService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).map((orderEntry: HttpResponse<OrderEntry>) => orderEntry.body);
        }
        return Observable.of(new OrderEntry());
    }
}

export const orderEntryRoute: Routes = [
    {
        path: 'order-entry',
        component: OrderEntryComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'OrderEntries'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'order-entry/:id/view',
        component: OrderEntryDetailComponent,
        resolve: {
            orderEntry: OrderEntryResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'OrderEntries'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'order-entry/new',
        component: OrderEntryUpdateComponent,
        resolve: {
            orderEntry: OrderEntryResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'OrderEntries'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'order-entry/:id/edit',
        component: OrderEntryUpdateComponent,
        resolve: {
            orderEntry: OrderEntryResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'OrderEntries'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const orderEntryPopupRoute: Routes = [
    {
        path: 'order-entry/:id/delete',
        component: OrderEntryDeletePopupComponent,
        resolve: {
            orderEntry: OrderEntryResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'OrderEntries'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
