import { CanActivate, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { Injectable } from '@angular/core';

@Injectable()
export class AuthGuard implements CanActivate {
    public constructor(private authenticationService: AuthenticationService, private router: Router) { }

    public canActivate(): boolean {
        var loggedIn = this.authenticationService.isLoggedIn();

        if (!loggedIn) {
            this.router.navigate(['/account', 'login']);
        }

        return loggedIn;
    }
}
