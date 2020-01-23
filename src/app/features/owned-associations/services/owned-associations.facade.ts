import { Injectable } from '@angular/core';
import { Store, Select } from '@ngxs/store';
import { AssociateService } from 'src/app/core/services/associate.service';
import { AppState } from 'src/app/core/store/app.state';
import { GetOwnedAssociationsQuery } from 'src/app/shared/queries/get-owned-associations.query';
import { tap, switchMap } from 'rxjs/operators';
import { LoadOwnedAssociations, LoadAssociation } from '../store/owned-associations.action';
import { OwnedAssociationsState } from '../store/owned-associations.state';
import { Observable } from 'rxjs';
import { Association } from 'src/app/shared/models/associations/association.model';
import { AssociationCreated } from 'src/app/shared/events/association-created.event';
import { AssociationService } from 'src/app/core/services/association.service';
import { CreateAssociationCommand } from 'src/app/features/dashboard/commands/create-association.command';
import { GetAssociationQuery } from 'src/app/shared/queries/get-association.query';

@Injectable()
export class OwnedAssociationsFacade {
    @Select(OwnedAssociationsState.associations) public associations$: Observable<Association[]>;
    @Select(OwnedAssociationsState.association) public association$: Observable<Association>;

    public constructor(private store: Store, private associateService: AssociateService, private associationService: AssociationService) { }

    public loadAssociations(): void {
        const associate = this.store.selectSnapshot(AppState.associate);
        this.associateService.getOwnedAssociations(new GetOwnedAssociationsQuery(associate.id)).pipe(
            tap((associations) => {
                const action = new LoadOwnedAssociations(associations);
                this.store.dispatch(action);
            })
        ).subscribe();
    }

    public createAssociation($event: AssociationCreated): void {
        const associate = this.store.selectSnapshot(AppState.associate);
        this.associationService.createAssociation(new CreateAssociationCommand(associate.id, $event.name)).pipe(
            switchMap(() => this.associateService.getOwnedAssociations(new GetOwnedAssociationsQuery(associate.id))),
            tap((associations) => {
                const action = new LoadOwnedAssociations(associations);
                this.store.dispatch(action);
            })
        ).subscribe();
    }

    public loadAssociation(id: string): void {
        const query = new GetAssociationQuery(id);
        this.associationService.getAssociation(query).pipe(
            tap((association) => {
                const action = new LoadAssociation(association);
                this.store.dispatch(action);
            })
        ).subscribe();
    }
}