import {Injectable} from '@angular/core';
import {ICode} from "./verification.service";
import {RestService} from "./rest.service";
import {Observable} from "rxjs";
import {ISmsVerifyRequest, ISmsVerifyResponse, IVerificationRequest, IVerificationResponse} from "../misc/http-data";
import {environment} from "../../../environments/environment";

export interface ISmsCode {
  code: number;
  message: string;
}

export const SmsCodes: ISmsCode[] = [
	{code: -1, message: 'Сообщение не найдено'},
	{code: 100, message: 'Запрос выполнен или сообщение находится в нашей очереди'},
	{code: 101, message: 'Сообщение передается оператору'},
	{code: 102, message: 'Сообщение отправлено (в пути)'},
	{code: 103, message: 'Сообщение доставлено'},
	{code: 104, message: 'Не может быть доставлено: время жизни истекло'},
	{code: 105, message: 'Не может быть доставлено: удалено оператором'},
	{code: 106, message: 'Не может быть доставлено: сбой в телефоне'},
	{code: 107, message: 'Не может быть доставлено: неизвестная причина'},
	{code: 108, message: 'Не может быть доставлено: отклонено'},
	{code: 110, message: 'Сообщение прочитано (для Viber, временно не работает)'},
	{code: 150, message: 'Не может быть доставлено: не найден маршрут на данный номер'},
	{code: 200, message: 'Неправильный api_id'},
	{code: 201, message: 'Не хватает средств на лицевом счету'},
	{code: 202, message: 'Неправильно указан номер телефона получателя, либо на него нет маршрута'},
	{code: 203, message: 'Нет текста сообщения'},
	{code: 204, message: 'Имя отправителя не согласовано с администрацией'},
	{code: 205, message: 'Сообщение слишком длинное (превышает 8 СМС)'},
	{code: 206, message: 'Будет превышен или уже превышен дневной лимит на отправку сообщений'},
	{code: 207, message: 'На этот номер нет маршрута для доставки сообщений'},
	{code: 208, message: 'Параметр time указан неправильно'},
	{code: 209, message: 'Вы добавили этот номер (или один из номеров) в стоп-лист'},
	{code: 210, message: 'Используется GET, где необходимо использовать POST'},
	{code: 211, message: 'Метод не найден'},
	{code: 212, message: 'Текст сообщения необходимо передать в кодировке UTF-8 (вы передали в другой кодировке)'},
	{code: 213, message: 'Указано более 100 номеров в списке получателей'},
	{code: 220, message: 'Сервис временно недоступен, попробуйте чуть позже'},
	{code: 230, message: 'Превышен общий лимит количества сообщений на этот номер в день'},
	{code: 231, message: 'Превышен лимит одинаковых сообщений на этот номер в минуту'},
	{code: 232, message: 'Превышен лимит одинаковых сообщений на этот номер в день'},
	{code: 233, message: 'Превышен лимит отправки повторных сообщений с кодом на этот номер за короткий промежуток времени ("защита от мошенников", можно отключить в разделе "Настройки")'},
	{code: 300, message: 'Неправильный token (возможно истек срок действия, либо ваш IP изменился)'},
	{code: 301, message: 'Неправильный api_id, либо логин/пароль'},
	{code: 302, message: 'Пользователь авторизован, но аккаунт не подтвержден (пользователь не ввел код, присланный в регистрационной смс)'},
	{code: 303, message: 'Код подтверждения неверен'},
	{code: 304, message: 'Отправлено слишком много кодов подтверждения. Пожалуйста, повторите запрос позднее'},
	{code: 305, message: 'Слишком много неверных вводов кода, повторите попытку позднее'},
	{code: 500, message: 'Ошибка на сервере. Повторите запрос.'},
	{code: 901, message: 'Callback: URL неверный (не начинается на http://)'},
	{code: 902, message: 'Callback: Обработчик не найден (возможно был удален ранее)'},
];

@Injectable({
	providedIn: 'root'
})
export class SmsVerificationService {

	private code: number;

	constructor( private restService: RestService ) {}

	public verifyPhone( phone: string ): Observable<ICode> {

		const observable: Observable<ICode> = new Observable<ICode>(observer => {
			// this.code = Math.floor(1000 + Math.random() * 9000);
			this.code = 1234;

			const req: ISmsVerifyRequest = {
				api_id: environment.verification.apiId,
				to: phone,
				msg: this.code.toString(),
				json: 1
			}

			const dataStr = Object.keys(req).map(key => `${key}=${req[key]}`).join('&');
			const url = `sms-verify?${dataStr}`;
			this.restService.get(url, req).subscribe({
				next: ( res: ISmsVerifyResponse ) => {
					const code = this.getCode(res);
					observer.next(code);
					observer.complete();
				},
				error: (err => {
					observer.next(null);
					observer.complete();
				})
			})
		})
		return observable;
	}

	public verifyCode( value: string ): Observable<boolean> {

		const observable: Observable<boolean> = new Observable<boolean>(observer => {
			setTimeout(() => {
				const res = value === this.code.toString() ? true : false;
				this.code = null;
				observer.next(res);
				observer.complete();
			}, 200);
		})

		return observable;
	}

	private getCode( res: ISmsVerifyResponse ): ICode {
		return SmsCodes.find(( c: ICode ) => c.code.toString() === res.data.status_code.toString());
	}
}
