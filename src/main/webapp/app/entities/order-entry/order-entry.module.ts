import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SimpleServiceOrderAppSharedModule } from 'app/shared';
import {
    OrderEntryComponent,
    OrderEntryDetailComponent,
    OrderEntryUpdateComponent,
    OrderEntryDeletePopupComponent,
    OrderEntryDeleteDialogComponent,
    orderEntryRoute,
    orderEntryPopupRoute
} from './';

const ENTITY_STATES = [...orderEntryRoute, ...orderEntryPopupRoute];

@NgModule({
    imports: [SimpleServiceOrderAppSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        OrderEntryComponent,
        OrderEntryDetailComponent,
        OrderEntryUpdateComponent,
        OrderEntryDeleteDialogComponent,
        OrderEntryDeletePopupComponent
    ],
    entryComponents: [OrderEntryComponent, OrderEntryUpdateComponent, OrderEntryDeleteDialogComponent, OrderEntryDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SimpleServiceOrderAppOrderEntryModule {}
