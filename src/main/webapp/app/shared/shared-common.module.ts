import { NgModule } from '@angular/core';

import { SimpleServiceOrderAppSharedLibsModule, JhiAlertComponent, JhiAlertErrorComponent } from './';

@NgModule({
    imports: [SimpleServiceOrderAppSharedLibsModule],
    declarations: [JhiAlertComponent, JhiAlertErrorComponent],
    exports: [SimpleServiceOrderAppSharedLibsModule, JhiAlertComponent, JhiAlertErrorComponent]
})
export class SimpleServiceOrderAppSharedCommonModule {}
