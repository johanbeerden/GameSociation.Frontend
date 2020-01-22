import { HttpService } from '../../core/services/http.service';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { LoginQueryResult, LoginQuery } from '../queries/login.query';
import { RegisterCommand } from '../commands/register.command';

@Injectable()
export class AccountService {
    public constructor(private httpService: HttpService) { }

    public register(command: RegisterCommand): Observable<any> {
        return this.httpService.post('account/register', command);
    }

    public login(query: LoginQuery): Observable<LoginQueryResult> {
        return this.httpService.post('account/login', query);
    }
}