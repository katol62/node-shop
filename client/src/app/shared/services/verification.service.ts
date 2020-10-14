import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable, Subject} from "rxjs";
import {RestService} from "./rest.service";
import {IVerificationRequest, IVerificationResponse} from "../misc/http-data";
import {environment} from "../../../environments/environment";

export interface ICode {
    code: number;
    message: string;
}

export const Codes: ICode[] = [
    {code: 1, message: 'Успешная операция'},
    {code: 2, message: 'Не найдет идентификатор ID'},
    {code: 200, message: 'Ошибка авторизации'},
    {code: 201, message: 'Не достаточно средств для выполнения операции'},
    {code: 202, message: 'Учетная запись блокирована'},
    {code: 203, message: 'Неверный формат номера телефона'},
    {code: 204, message: 'Неверный формат кода'},
    {code: 205, message: 'Неверная длина кода'},
    {code: 206, message: 'Операция уже в очереди на исполнение'},
    {code: 207, message: 'Очередь не найдена'},
    {code: 300, message: 'Шлюз отправки СМС не доступен'},
    {code: 302, message: 'СМС не отправлено'},
    {code: 304, message: 'СМС отправлено'},
    {code: 305, message: 'СМС доставлено'},
    {code: 306, message: 'Ошибка доставки СМС'},
    {code: 307, message: 'Запись о СМС не найдена'}
]

@Injectable({
    providedIn: 'root'
})
export class VerificationService {

    private phoneSubject: Subject<ICode> = new Subject();
    private codeSubject: Subject<boolean> = new Subject();

    private code: number;

    constructor(private restService: RestService) {}

    public verifyPhone(phone: string): Observable<ICode> {

        // this.code = Math.floor(1000 + Math.random() * 9000);
        this.code = 1234;

        const req: IVerificationRequest = {
            cellphone: phone,
            code: this.code.toString(),
            email: environment.verification.email,
            password: environment.verification.password,
            id: 'sendsms',
            format: 'json'
        }
        const dataStr = Object.keys(req).map(key => `${key}=${req[key]}`).join('&');
        const url = `verify?${dataStr}`;
        this.restService.get(url, req).subscribe({
            next: (res: IVerificationResponse) => {
                const code = this.getCode(res);
                this.phoneSubject.next(code);
            },
            error: (err => {
                this.phoneSubject.next(null);
            })
        })
        return this.phoneSubject.asObservable();
    }

    public verifyCode(value: string): Observable<boolean> {
        setTimeout(() => {
            const res = value === this.code.toString() ? true : false;
            this.code = null;
            this.codeSubject.next(res);
        }, 200);
        return this.codeSubject.asObservable();
    }

    private getCode(res: IVerificationResponse): ICode {
        return Codes.find((c: ICode) => c.code.toString() === res.data.status.toString());
    }

}
