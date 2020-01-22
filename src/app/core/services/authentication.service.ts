import { Injectable } from '@angular/core';
import { JwtHelperService } from "@auth0/angular-jwt";
import { TokenService } from './token.service';

@Injectable()
export class AuthenticationService {
    private helper = new JwtHelperService();

    public constructor(private tokenService: TokenService) {}

    public isLoggedIn(): boolean {
        const token = this.tokenService.getToken();
        return !this.helper.isTokenExpired(token);
    }

    public logout(): void {
        this.tokenService.clearToken();
    }
}