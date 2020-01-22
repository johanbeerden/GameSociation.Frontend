import { Injectable } from "@angular/core";
import { HttpService } from './http.service';
import { GetOwnedAssociationsQuery } from 'src/app/shared/queries/get-owned-associations.query';
import { Observable } from 'rxjs';
import { Association } from 'src/app/shared/models/associations/association.model';
import { GetJoinedAssociationsQuery } from 'src/app/shared/queries/get-joined-associations.query';

@Injectable()
export class AssociateService {
    public constructor(private httpService: HttpService) {}

    public getOwnedAssociations(query: GetOwnedAssociationsQuery): Observable<Association[]> {
        return this.httpService.get(`associate/${query.associateId}/association/owned`);
    }

    public getJoinedAssociation(query: GetJoinedAssociationsQuery): Observable<Association[]> {
        return this.httpService.get(`associate/${query.associateId}/association/joined`);
    }
}