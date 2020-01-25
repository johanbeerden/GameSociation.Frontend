import {Injectable} from '@angular/core';
import {Select, Store} from '@ngxs/store';
import {AssociateService} from 'src/app/core/services/associate.service';
import {AppState} from 'src/app/core/store/app.state';
import {GetOwnedAssociationsQuery} from 'src/app/shared/queries/associates/get-owned-associations.query';
import {switchMap, tap} from 'rxjs/operators';
import {LoadAssociation, LoadAssociations} from '../store/associations.action';
import {AssociationsState} from '../store/associations.state';
import {Observable} from 'rxjs';
import {Association, AssociationDetail} from 'src/app/shared/models/associations/association.model';
import {AssociationService} from 'src/app/core/services/association.service';
import {CreateAssociationCommand} from 'src/app/shared/commands/associations/create-association.command';
import {GetAssociationQuery} from 'src/app/shared/queries/associations/get-association.query';
import {InviteToAssociationCommand} from "../../../shared/commands/associations/invite-to-association.command";
import {GetAssociationsQuery} from "../../../shared/queries/associates/get-associations.query";
import {LeaveAssociationCommand} from "../../../shared/commands/associations/leave-association.command";
import {Router} from "@angular/router";

@Injectable()
export class AssociationsFacade {
    @Select(AssociationsState.associations) public associations$: Observable<Association[]>;
    @Select(AssociationsState.association) public association$: Observable<AssociationDetail>;

    public constructor(private store: Store, private associateService: AssociateService, private associationService: AssociationService, private router: Router) {
    }

    public loadAssociations(): void {
        const associate = this.store.selectSnapshot(AppState.associate);
        this.associateService.getAssociations(new GetAssociationsQuery(associate.id)).pipe(
            tap((associations) => {
                const action = new LoadAssociations(associations);
                this.store.dispatch(action);
            })
        ).subscribe();
    }

    public createAssociation(name: string): void {
        const associate = this.store.selectSnapshot(AppState.associate);
        this.associationService.createAssociation(new CreateAssociationCommand(associate.id, name)).pipe(
            switchMap(() => this.associateService.getAssociations(new GetOwnedAssociationsQuery(associate.id))),
            tap((associations) => {
                const action = new LoadAssociations(associations);
                this.store.dispatch(action);
            })
        ).subscribe();
    }

    public loadAssociation(id: string): void {
        const query = new GetAssociationQuery(id);
        this.associationService.getAssociation(query).pipe().subscribe((association) => {
            const action = new LoadAssociation(association);
            this.store.dispatch(action);
        });
    }

    public inviteToAssociation(associationId: string, username: string, tagNumber: number): void {
        const associate = this.store.selectSnapshot(AppState.associate);
        this.associationService.inviteToAssociation(new InviteToAssociationCommand(associate.id, associationId, username, tagNumber)).pipe(
            switchMap(() => this.associationService.getAssociation(new GetAssociationQuery(associationId)))
        ).subscribe((association) => {
            const action = new LoadAssociation(association);
            this.store.dispatch(action);
        });
    }

    public leaveAssociation(associationId: string): void {
        const associate = this.store.selectSnapshot(AppState.associate);
        this.associationService.leaveAssociation(new LeaveAssociationCommand(associate.id, associationId, associate.id)).subscribe(() => {
            this.router.navigate(['associations']);
        });
    }
}