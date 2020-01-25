import {Select, Store} from "@ngxs/store";
import {AssociateService} from "../../../core/services/associate.service";
import {AppState} from "../../../core/store/app.state";
import {GetInvitationsQuery} from "../../../shared/queries/associates/get-invitations.query";
import {Invitation} from "../../../shared/models/associations/invitation.model";
import {LoadInvitations} from "../store/invitations.action";
import {InvitationsState} from "../store/invitations.state";
import {Observable} from "rxjs";
import {tap} from "rxjs/operators";
import {AssociationService} from "../../../core/services/association.service";
import {AcceptInvitationCommand} from "../../../shared/commands/associations/accept-invitation.command";
import {RefuseInvitationCommand} from "../../../shared/commands/associations/refuse-invitation.command";
import {Injectable} from "@angular/core";

@Injectable()
export class InvitationsFacade {
    @Select(InvitationsState.invitations) public invitations$: Observable<Invitation[]>;

    public constructor(private store: Store, private associateService: AssociateService, private associationService: AssociationService) {
    }

    public loadInvitations(): void {
        const associate = this.store.selectSnapshot(AppState.associate);
        this.getInvitations(associate.id).subscribe();
    }

    public acceptInvitation(associationId: string): void {
        const associate = this.store.selectSnapshot(AppState.associate);
        this.associationService.acceptInvitation(new AcceptInvitationCommand(associate.id, associationId, associate.id)).pipe(
            tap(() => this.getInvitations(associate.id))
        ).subscribe();
    }

    public refuseInvitation(associationId: string): void {
        const associate = this.store.selectSnapshot(AppState.associate);
        this.associationService.refuseInvitation(new RefuseInvitationCommand(associate.id, associationId, associate.id)).pipe(
            tap(() => this.getInvitations(associate.id))
        ).subscribe();
    }

    private getInvitations(associateId: string): Observable<Invitation[]> {
        return this.associateService.getInvitations(new GetInvitationsQuery(associateId)).pipe(
            tap((invitations: Invitation[]) => {
                const loadInvitations = new LoadInvitations(invitations);
                this.store.dispatch(loadInvitations);
            })
        );
    }
}