import {Injectable} from '@angular/core';
import {Select, Store} from '@ngxs/store';
import {AssociateService} from 'src/app/core/services/associate.service';
import {AppState} from 'src/app/core/store/app.state';
import {GetOwnedAssociationsQuery} from 'src/app/shared/queries/associates/get-owned-associations.query';
import {switchMap, tap} from 'rxjs/operators';
import {LoadAssociation, LoadOwnedAssociations} from '../store/owned-associations.action';
import {OwnedAssociationsState} from '../store/owned-associations.state';
import {Observable} from 'rxjs';
import {Association, AssociationDetail} from 'src/app/shared/models/associations/association.model';
import {AssociationService} from 'src/app/core/services/association.service';
import {CreateAssociationCommand} from 'src/app/shared/commands/associations/create-association.command';
import {GetAssociationQuery} from 'src/app/shared/queries/associations/get-association.query';
import {InviteToAssociationCommand} from "../../../shared/commands/associations/invite-to-association.command";

@Injectable()
export class OwnedAssociationsFacade {
    @Select(OwnedAssociationsState.associations) public associations$: Observable<Association[]>;
    @Select(OwnedAssociationsState.association) public association$: Observable<AssociationDetail>;

    public constructor(private store: Store, private associateService: AssociateService, private associationService: AssociationService) {
    }

    public loadAssociations(): void {
        const associate = this.store.selectSnapshot(AppState.associate);
        this.associateService.getOwnedAssociations(new GetOwnedAssociationsQuery(associate.id)).pipe(
            tap((associations) => {
                const action = new LoadOwnedAssociations(associations);
                this.store.dispatch(action);
            })
        ).subscribe();
    }

    public createAssociation(name: string): void {
        const associate = this.store.selectSnapshot(AppState.associate);
        this.associationService.createAssociation(new CreateAssociationCommand(associate.id, name)).pipe(
            switchMap(() => this.associateService.getOwnedAssociations(new GetOwnedAssociationsQuery(associate.id))),
            tap((associations) => {
                const action = new LoadOwnedAssociations(associations);
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
}