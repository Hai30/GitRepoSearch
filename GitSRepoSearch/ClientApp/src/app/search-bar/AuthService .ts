import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly JWT_TOKEN = 'JWT_TOKEN';

  setToken(token: string): void {
    sessionStorage.setItem(this.JWT_TOKEN, token);
  }

  getToken(): string {
    return sessionStorage.getItem(this.JWT_TOKEN) as string;
  }


  removeToken(): void {
    sessionStorage.removeItem(this.JWT_TOKEN);
  }
}
