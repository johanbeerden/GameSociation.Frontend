import {Injectable} from "@angular/core";
import {HttpService} from './http.service';
import {CreateAssociationCommand} from 'src/app/shared/commands/associations/create-association.command';
import {Observable} from 'rxjs';
import {GetAssociationQuery} from 'src/app/shared/queries/associations/get-association.query';
import {AssociationDetail} from 'src/app/shared/models/associations/association.model';
import {InviteToAssociationCommand} from "../../shared/commands/associations/invite-to-association.command";
import {AcceptInvitationCommand} from "../../shared/commands/associations/accept-invitation.command";
import {RefuseInvitationCommand} from "../../shared/commands/associations/refuse-invitation.command";
import {LeaveAssociationCommand} from "../../shared/commands/associations/leave-association.command";
import {KickAssociateCommand} from "../../shared/commands/associations/kick-associate.command";

@Injectable()
export class AssociationService {
    public constructor(private httpService: HttpService) {
    }

    public createAssociation(command: CreateAssociationCommand): Observable<any> {
        return this.httpService.post(`association`, command);
    }

    public getAssociation(query: GetAssociationQuery): Observable<AssociationDetail> {
        return this.httpService.get(`association/${query.id}`);
    }

    public inviteToAssociation(command: InviteToAssociationCommand): Observable<any> {
        return this.httpService.post(`association/${command.associationId}/invite`, command);
    }

    public acceptInvitation(command: AcceptInvitationCommand): Observable<any> {
        return this.httpService.post(`association/${command.associateId}/membership/${command.associateId}/accept`, command);
    }

    public refuseInvitation(command: RefuseInvitationCommand): Observable<any> {
        return this.httpService.post(`association/${command.associateId}/membership/${command.associateId}/refuse`, command);
    }

    public leaveAssociation(command: LeaveAssociationCommand): Observable<any> {
        return this.httpService.post(`association/${command.associationId}/membership/${command.associateId}/leave`, command);
    }

    public kickAssociate(command: KickAssociateCommand): Observable<any> {
        return this.httpService.post(`association/${command.associationId}/membership/${command.associateId}/kick`, command);
    }
}