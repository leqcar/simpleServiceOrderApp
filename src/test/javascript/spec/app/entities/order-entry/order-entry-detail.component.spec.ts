/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { SimpleServiceOrderAppTestModule } from '../../../test.module';
import { OrderEntryDetailComponent } from 'app/entities/order-entry/order-entry-detail.component';
import { OrderEntry } from 'app/shared/model/order-entry.model';

describe('Component Tests', () => {
    describe('OrderEntry Management Detail Component', () => {
        let comp: OrderEntryDetailComponent;
        let fixture: ComponentFixture<OrderEntryDetailComponent>;
        const route = ({ data: of({ orderEntry: new OrderEntry(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [SimpleServiceOrderAppTestModule],
                declarations: [OrderEntryDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(OrderEntryDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(OrderEntryDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.orderEntry).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
