import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { SimpleServiceOrderAppCustomerModule } from './customer/customer.module';
import { SimpleServiceOrderAppProductModule } from './product/product.module';
import { SimpleServiceOrderAppOrderItemModule } from './order-item/order-item.module';
import { SimpleServiceOrderAppOrderEntryModule } from './order-entry/order-entry.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    // prettier-ignore
    imports: [
        SimpleServiceOrderAppCustomerModule,
        SimpleServiceOrderAppProductModule,
        SimpleServiceOrderAppOrderItemModule,
        SimpleServiceOrderAppOrderEntryModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SimpleServiceOrderAppEntityModule {}
