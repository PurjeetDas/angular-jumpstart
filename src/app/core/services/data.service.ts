import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { ICustomer, IOrder, IState} from '../../shared/interfaces';

@Injectable()
export class DataService {

    
    port = '4200';
    //for dev
    //baseUrl = `${this.window.location.protocol}//${this.window.location.hostname}:${this.port}`;
    baseUrl = `${this.window.location.protocol}//${this.window.location.hostname}:`+this.port;
    customersBaseUrl = this.baseUrl + '/assets/data/customers.json';
    ordersBaseUrl = this.baseUrl + '/assets/data/orders.json';
    orders: IOrder[];
    states: IState[];
    customerMap = new Map();

    constructor(private http: HttpClient, @Inject('Window') private window: Window) { 

    }

    getCustomers(): Observable<ICustomer[]> {
        
        return this.http.get<ICustomer[]>(this.customersBaseUrl)
            .pipe(
                map(customers => {
                    this.calculateCustomersOrderTotal(customers);
                    return customers;
                }),
                catchError(this.handleError)
            );
    }

    getCustomer(id: number): Observable<ICustomer> {
        //just a hack
        const customer:Observable<ICustomer> = new Observable((observer) => {
            let customer:ICustomer;
            observer.next(this.customerMap.get(id));
        });
        return customer;
        /*return this.http.get<ICustomer>(this.customersBaseUrl + '/' + id)
            .pipe(
                map(customer => {
                    this.calculateCustomersOrderTotal([customer]);
                    return customer;
                }),
                catchError(this.handleError)
        );*/
    }

    insertCustomer(customer: ICustomer): Observable<ICustomer> {
        return this.http.post<ICustomer>(this.customersBaseUrl, customer)
            .pipe(catchError(this.handleError));
    }

    updateCustomer(customer: ICustomer): Observable<boolean> {
        return null;
    }

    deleteCustomer(id: number): Observable<boolean> {
        return null;
    }

    getStates(): Observable<IState[]> {
        return this.http.get<IState[]>('/api/states')
            .pipe(catchError(this.handleError));
    }

    private handleError(error: HttpErrorResponse) {
        console.error('server error:', error);
        if (error.error instanceof Error) {
            const errMessage = error.error.message;
            return Observable.throw(errMessage);
        }
        return Observable.throw(error || 'Node.js server error');
    }

    calculateCustomersOrderTotal(customers: ICustomer[]) {
        for (const customer of customers) {
            if (customer && customer.orders) {
                let total = 0;
                this.customerMap.set(customer.id,customer)
                for (const order of customer.orders) {
                    total += order.itemCost;
                }
                customer.orderTotal = total;
            }
        }
    }

    // Not using now but leaving since they show how to create
    // and work with custom observables

    // Would need following import added:
    // import { Observer } from 'rxjs';

    // createObservable(data: any): Observable<any> {
    //     return Observable.create((observer: Observer<any>) => {
    //         observer.next(data);
    //         observer.complete();
    //     });
    // }

}