import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AuthService{
  private readonly JWT_TOKEN = 'JWT_TOKEN';

  constructor(private cookieService: CookieService) { }

  setToken(token: string): void {
    this.cookieService.set(this.JWT_TOKEN, token);
  }

  getToken(): string {
    return this.cookieService.get(this.JWT_TOKEN);
  }
}
