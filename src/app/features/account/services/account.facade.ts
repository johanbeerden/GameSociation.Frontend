import { Injectable } from '@angular/core';
import { AccountService } from './account.service';
import { Store } from '@ngxs/store';
import { tap } from 'rxjs/operators';
import { RegisterCommand } from '../commands/register.command';
import { LoginQuery } from '../queries/login.query';
import { TokenService } from 'src/app/core/services/token.service';
import { Router } from '@angular/router';
import { Login } from 'src/app/core/store/app.action';

@Injectable()
export class AccountFacade {
    public constructor(private store: Store, private accountService: AccountService, private tokenService: TokenService, private router: Router) { }

    public register(email: string, password: string, username: string): void {
        const command = new RegisterCommand(email, password, username);
        this.accountService.register(command).pipe(
            tap(() => this.router.navigate(['account', 'login']))
        ).subscribe();
    }

    public login(email: string, password: string): void {
        const query = new LoginQuery(email, password);
        this.accountService.login(query).pipe(
            tap((result) => {
                const loginAction = new Login(result.accountId);
                this.store.dispatch(loginAction);
                this.tokenService.setToken(result.token);
                this.router.navigate(['']);
            })
        ).subscribe();
    }
}