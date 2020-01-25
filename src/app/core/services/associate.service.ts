import {Injectable} from "@angular/core";
import {HttpService} from './http.service';
import {GetOwnedAssociationsQuery} from 'src/app/shared/queries/associates/get-owned-associations.query';
import {Observable} from 'rxjs';
import {Association} from 'src/app/shared/models/associations/association.model';
import {GetJoinedAssociationsQuery} from 'src/app/shared/queries/associates/get-joined-associations.query';
import {GetAssociateByAccountIdQuery} from "../../shared/queries/associates/get-associate-by-account-id.query";
import {Associate} from "../../shared/models/associations/associate.model";
import {GetInvitationsQuery} from "../../shared/queries/associates/get-invitations.query";
import {Invitation} from "../../shared/models/associations/invitation.model";
import {GetAssociationsQuery} from "../../shared/queries/associates/get-associations.query";

@Injectable()
export class AssociateService {
    public constructor(private httpService: HttpService) {
    }

    public getAssociateByAccountId(query: GetAssociateByAccountIdQuery): Observable<Associate> {
        return this.httpService.get(`associate/account/${query.accountId}`);
    }

    public getOwnedAssociations(query: GetOwnedAssociationsQuery): Observable<Association[]> {
        return this.httpService.get(`associate/${query.associateId}/association/owned`);
    }

    public getJoinedAssociation(query: GetJoinedAssociationsQuery): Observable<Association[]> {
        return this.httpService.get(`associate/${query.associateId}/association/joined`);
    }

    public getInvitations(query: GetInvitationsQuery): Observable<Invitation[]> {
        return this.httpService.get(`associate/${query.associateId}/invitations`);
    }

    public getAssociations(query: GetAssociationsQuery): Observable<Association[]> {
        return this.httpService.get(`associate/${query.associateId}/association`);
    }
}