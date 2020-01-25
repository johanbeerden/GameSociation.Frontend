import {Injectable} from '@angular/core';
import {Select, Store} from '@ngxs/store';
import {AppState} from 'src/app/core/store/app.state';
import {mergeMap, switchMap} from 'rxjs/operators';
import {LoadAssociate} from 'src/app/core/store/app.action';
import {GetAssociateByAccountIdQuery} from '../../../shared/queries/associates/get-associate-by-account-id.query';
import {GetOwnedAssociationsQuery} from '../../../shared/queries/associates/get-owned-associations.query';
import {forkJoin, Observable} from 'rxjs';
import {GetJoinedAssociationsQuery} from '../../../shared/queries/associates/get-joined-associations.query';
import {LoadInvitations, LoadJoinedAssociations, LoadOwnedAssociations} from '../store/dashboard.action';
import {DashboardState} from '../store/dashboard.state';
import {CreateAssociationCommand} from '../../../shared/commands/associations/create-association.command';
import {AssociateService} from 'src/app/core/services/associate.service';
import {AssociationService} from 'src/app/core/services/association.service';
import {Associate} from "../../../shared/models/associations/associate.model";
import {Association} from "../../../shared/models/associations/association.model";
import {Invitation} from "../../../shared/models/associations/invitation.model";
import {GetInvitationsQuery} from "../../../shared/queries/associates/get-invitations.query";
import {AcceptInvitationCommand} from "../../../shared/commands/associations/accept-invitation.command";
import {RefuseInvitationCommand} from "../../../shared/commands/associations/refuse-invitation.command";

@Injectable()
export class DashboardFacade {
    @Select(DashboardState.ownedAssociations) public ownedAssociations$: Observable<Association[]>;
    @Select(DashboardState.joinedAssociations) public joinedAssociations$: Observable<Association[]>;
    @Select(DashboardState.invitations) public invitations$: Observable<Invitation[]>;

    public constructor(private store: Store, private associateService: AssociateService, private associationService: AssociationService) {
    }

    public loadDashboard(): void {
        const accountId = this.store.selectSnapshot(AppState.accountId);
        this.associateService.getAssociateByAccountId(new GetAssociateByAccountIdQuery(accountId)).pipe(
            mergeMap((result: Associate) => {
                const action = new LoadAssociate(result);
                this.store.dispatch(action);
                return forkJoin(
                    this.associateService.getOwnedAssociations(new GetOwnedAssociationsQuery(result.id)),
                    this.associateService.getJoinedAssociation(new GetJoinedAssociationsQuery(result.id)),
                    this.associateService.getInvitations(new GetInvitationsQuery(result.id))
                );
            })
        ).subscribe((result: [Association[], Association[], Invitation[]]) => {
            this.loadOwnedAssociations(result[0]);
            this.loadJoinedAssociation(result[1]);
            this.loadInvitations(result[2]);
        });
    }

    public createAssociation(name: string): void {
        const associate = this.store.selectSnapshot(AppState.associate);
        const createAssociationCommand = new CreateAssociationCommand(associate.id, name);
        this.associationService.createAssociation(createAssociationCommand).pipe(
            switchMap(() => this.associateService.getOwnedAssociations(new GetOwnedAssociationsQuery(associate.id)))
        ).subscribe((associations: Association[]) => this.loadOwnedAssociations(associations));
    }

    public acceptInvitation(associationId: string): void {
        const associate = this.store.selectSnapshot(AppState.associate);
        const command = new AcceptInvitationCommand(associate.id, associationId, associate.id);
        this.associationService.acceptInvitation(command).pipe(
            mergeMap(() => forkJoin(
                this.associateService.getJoinedAssociation(new GetJoinedAssociationsQuery(associate.id)),
                this.associateService.getInvitations(new GetInvitationsQuery(associate.id))))
        ).subscribe((result: [Association[], Invitation[]]) => {
            this.loadJoinedAssociation(result[0]);
            this.loadInvitations(result[1]);
        });
    }

    public refuseInvitation(associationId: string): void {
        const associate = this.store.selectSnapshot(AppState.associate);
        const command = new RefuseInvitationCommand(associate.id, associationId, associate.id);
        this.associationService.refuseInvitation(command).pipe(
            mergeMap(() => forkJoin(
                this.associateService.getJoinedAssociation(new GetJoinedAssociationsQuery(associate.id)),
                this.associateService.getInvitations(new GetInvitationsQuery(associate.id))))
        ).subscribe((result: [Association[], Invitation[]]) => {
            this.loadJoinedAssociation(result[0]);
            this.loadInvitations(result[1]);
        });
    }

    private loadOwnedAssociations(associations: Association[]): void {
        const loadOwnedAssociations = new LoadOwnedAssociations(associations);
        this.store.dispatch(loadOwnedAssociations);
    }

    private loadJoinedAssociation(associations: Association[]): void {
        const loadJoinedAssociations = new LoadJoinedAssociations(associations);
        this.store.dispatch(loadJoinedAssociations);
    }

    private loadInvitations(invitations: Invitation[]): void {
        const loadInvitations = new LoadInvitations(invitations);
        this.store.dispatch(loadInvitations);
    }
}