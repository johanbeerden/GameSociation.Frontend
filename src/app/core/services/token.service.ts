import {Injectable} from '@angular/core';

@Injectable()
export class TokenService {
    private ACCESS_TOKEN = 'access_token';

    public setToken(token: string): void {
        sessionStorage.setItem(this.ACCESS_TOKEN, token);
    }

    public getToken(): string {
        return sessionStorage.getItem(this.ACCESS_TOKEN);
    }

    public clearToken(): void {
        sessionStorage.removeItem(this.ACCESS_TOKEN);
    }
}