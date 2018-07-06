/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { SimpleServiceOrderAppTestModule } from '../../../test.module';
import { OrderEntryComponent } from 'app/entities/order-entry/order-entry.component';
import { OrderEntryService } from 'app/entities/order-entry/order-entry.service';
import { OrderEntry } from 'app/shared/model/order-entry.model';

describe('Component Tests', () => {
    describe('OrderEntry Management Component', () => {
        let comp: OrderEntryComponent;
        let fixture: ComponentFixture<OrderEntryComponent>;
        let service: OrderEntryService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [SimpleServiceOrderAppTestModule],
                declarations: [OrderEntryComponent],
                providers: []
            })
                .overrideTemplate(OrderEntryComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(OrderEntryComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(OrderEntryService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new OrderEntry(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.orderEntries[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
