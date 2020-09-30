import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable, Subject} from "rxjs";
import {IMessageItem} from "./notification.service";

@Injectable({
    providedIn: 'root'
})
export class VerificationService {

    private phoneSubject: Subject<boolean> = new Subject();

    constructor() { }

    public verifyPhone(phone: string): Observable<boolean> {
        setTimeout(() => {
            const res = phone.length === 11 ? true : false;
            this.phoneSubject.next(res);
        }, 1000);

        return this.phoneSubject.asObservable();
    }

    public verifyCode(value: string): Observable<boolean> {
        setTimeout(() => {
            const res = value.length === 4 ? true : false;
            this.phoneSubject.next(res);
        }, 1000);

        return this.phoneSubject.asObservable();
    }

}
