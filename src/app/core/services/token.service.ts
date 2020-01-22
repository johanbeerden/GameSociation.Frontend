import { Injectable } from '@angular/core';

@Injectable()
export class TokenService {
    private ACCESS_TOKEN = 'access_token';

    public setToken(token: string): void {
        localStorage.setItem(this.ACCESS_TOKEN, token);
    }

    public getToken(): string {
        return localStorage.getItem(this.ACCESS_TOKEN);
    }

    public clearToken(): void {
        localStorage.removeItem(this.ACCESS_TOKEN);
    }
}