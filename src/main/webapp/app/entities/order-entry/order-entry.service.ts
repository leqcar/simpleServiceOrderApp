import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IOrderEntry } from 'app/shared/model/order-entry.model';

type EntityResponseType = HttpResponse<IOrderEntry>;
type EntityArrayResponseType = HttpResponse<IOrderEntry[]>;

@Injectable({ providedIn: 'root' })
export class OrderEntryService {
    private resourceUrl = SERVER_API_URL + 'api/order-entries';

    constructor(private http: HttpClient) {}

    create(orderEntry: IOrderEntry): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(orderEntry);
        return this.http
            .post<IOrderEntry>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertDateFromServer(res));
    }

    update(orderEntry: IOrderEntry): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(orderEntry);
        return this.http
            .put<IOrderEntry>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertDateFromServer(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<IOrderEntry>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertDateFromServer(res));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IOrderEntry[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    private convertDateFromClient(orderEntry: IOrderEntry): IOrderEntry {
        const copy: IOrderEntry = Object.assign({}, orderEntry, {
            transactionDate:
                orderEntry.transactionDate != null && orderEntry.transactionDate.isValid()
                    ? orderEntry.transactionDate.format(DATE_FORMAT)
                    : null
        });
        return copy;
    }

    private convertDateFromServer(res: EntityResponseType): EntityResponseType {
        res.body.transactionDate = res.body.transactionDate != null ? moment(res.body.transactionDate) : null;
        return res;
    }

    private convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
        res.body.forEach((orderEntry: IOrderEntry) => {
            orderEntry.transactionDate = orderEntry.transactionDate != null ? moment(orderEntry.transactionDate) : null;
        });
        return res;
    }
}
