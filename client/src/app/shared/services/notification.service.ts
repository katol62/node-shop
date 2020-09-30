import { Injectable } from '@angular/core';
import {Subject} from 'rxjs';

export enum NotificationMessageType {
  warning = 'warning',
  normal = 'normal',
  error = 'error',
  success = 'success'
}

export interface IMessageItem {
  message: string;
  messageCode?: string;
  type?: NotificationMessageType;
}

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  private subject: Subject<IMessageItem> = new Subject();
  public notification$ = this.subject.asObservable();

  constructor() { }

  public show(message: IMessageItem): void {
    this.subject.next(message);
  }

}
