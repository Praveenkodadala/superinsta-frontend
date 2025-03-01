import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  private localStorage: any;
  private sessionStorage: any;

  constructor() {
    if (!localStorage) {
      throw new Error('Current browser does not support Local Storage');
    }
    if (!sessionStorage) {
      throw new Error('Current browser does not support Session Storage');
    }
    this.localStorage = localStorage;
    this.sessionStorage = sessionStorage;
  }

  public setLocalStorage(key: string, value: string): void {
    this.localStorage[key] = value;
  }

  public getLocalStorage(key: string): string {
    return this.localStorage[key] || false;
  }

  public setObjectLocalStorage(key: string, value: any): void {
    this.localStorage[key] = JSON.stringify(value);
  }

  public getObjectLocalStorage(key: string): any {
    return JSON.parse(this.localStorage[key] || '{}');
  }

  public removeLocalStorage(key: string): void {
    this.localStorage.removeItem(key);
  }

  public clearLocalStorage(): void {
    this.localStorage.clear();
  }

  public setSessionStorage(key: string, value: string): void {
    this.sessionStorage.setItem(key, value);
  }

  public getSessionStorage(key: string): string {
    return this.sessionStorage.getItem(key) || false;
  }

  public removeSessionStorage(key: string): void {
    this.sessionStorage.removeItem(key);
  }
}
