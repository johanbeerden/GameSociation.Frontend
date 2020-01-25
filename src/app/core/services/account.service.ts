import {HttpService} from './http.service';
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {LoginQuery, LoginQueryResult} from '../../shared/queries/account/login.query';
import {RegisterCommand} from '../../shared/commands/accounts/register.command';

@Injectable()
export class AccountService {
    public constructor(private httpService: HttpService) {
    }

    public register(command: RegisterCommand): Observable<any> {
        return this.httpService.post('account/register', command);
    }

    public login(query: LoginQuery): Observable<LoginQueryResult> {
        return this.httpService.post('account/login', query);
    }
}