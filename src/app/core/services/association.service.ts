import { Injectable } from "@angular/core";
import { HttpService } from './http.service';
import { CreateAssociationCommand } from 'src/app/features/dashboard/commands/create-association.command';
import { Observable } from 'rxjs';
import { GetAssociationQuery } from 'src/app/shared/queries/get-association.query';
import { Association } from 'src/app/shared/models/associations/association.model';

@Injectable()
export class AssociationService {
    public constructor(private httpService: HttpService) { }

    public createAssociation(command: CreateAssociationCommand): Observable<any> {
        return this.httpService.post(`association`, command);
    }

    public getAssociation(query: GetAssociationQuery): Observable<Association> {
        return this.httpService.get(`association/${query.id}`);
    }
}