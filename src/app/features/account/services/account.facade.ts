import {Injectable} from '@angular/core';
import {AccountService} from '../../../core/services/account.service';
import {Store} from '@ngxs/store';
import {tap} from 'rxjs/operators';
import {RegisterCommand} from '../../../shared/commands/accounts/register.command';
import {LoginQuery} from '../../../shared/queries/account/login.query';
import {TokenService} from 'src/app/core/services/token.service';
import {Router} from '@angular/router';
import {Login} from 'src/app/core/store/app.action';

@Injectable()
export class AccountFacade {
    public constructor(private store: Store, private accountService: AccountService, private tokenService: TokenService, private router: Router) { }

    public register(email: string, password: string, username: string): void {
        const command = new RegisterCommand(email, password, username);
        this.accountService.register(command).subscribe(() => this.router.navigate(['account', 'login']));
    }

    public login(email: string, password: string): void {
        const query = new LoginQuery(email, password);
        this.accountService.login(query).pipe(
            tap((result) => {
                const loginAction = new Login(result.accountId);
                this.store.dispatch(loginAction);
                this.tokenService.setToken(result.token);
            })
        ).subscribe(() => this.router.navigate(['']));
    }
}