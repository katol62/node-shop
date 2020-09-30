import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PersistentService {

  private storage = window.localStorage;
  constructor() { }

  hasItem(type: string): boolean {
    return this.storage.getItem(type) !== null;
  }

  setItem(type: string, data: any) {
    const isString = typeof (data) === 'string' ? true : false;
    this.storage.setItem(type, isString ? data : JSON.stringify(data));
  }

  getItem(type: string): any {
    let result = null;
    if (this.hasItem(type)) {
      const item = this.storage.getItem(type);
      result = this.parse(item) ? JSON.parse(item) : item;
    }
    return result;
  }

  removeItem(type: string) {
    this.storage.removeItem(type);
  }

  clear() {
    this.storage.clear();
  }

  private parse(raw: string): any {
    try {
      return JSON.parse(raw);
    } catch (err) {
      return false;
    }
  }
}
