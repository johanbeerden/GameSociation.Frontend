import { HttpService } from 'src/app/core/services/http.service';
import { Associate } from "../../../shared/models/associations/associate.model";
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { GetAssociateByAccountIdQuery } from '../queries/get-associate-by-account-id.query';

@Injectable()
export class DashboardService {
    public constructor(private httpService: HttpService) { }

    public getAssociateByAccountId(query: GetAssociateByAccountIdQuery): Observable<Associate> {
        return this.httpService.get(`associate/account/${query.accountId}`);
    }
}