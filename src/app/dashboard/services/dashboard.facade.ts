import { Injectable } from '@angular/core';
import { Store, Select } from '@ngxs/store';
import { AppState } from 'src/app/core/store/app.state';
import { DashboardService } from './dashboard.service';
import { mergeMap, switchMap } from 'rxjs/operators';
import { LoadAssociate } from 'src/app/core/store/app.action';
import { GetAssociateByAccountIdQuery } from '../queries/get-associate-by-account-id.query';
import { GetOwnedAssociationsQuery } from '../../shared/queries/get-owned-associations.query';
import { forkJoin, Observable } from 'rxjs';
import { Associate } from 'src/app/shared/models/associations/associate.model';
import { GetJoinedAssociationsQuery } from '../../shared/queries/get-joined-associations.query';
import { Association } from 'src/app/shared/models/associations/association.model';
import { LoadOwnedAssociations, LoadJoinedAssociations } from '../store/dashboard.action';
import { DashboardState } from '../store/dashboard.state';
import { AssociationCreated } from '../../shared/events/association-created.event';
import { CreateAssociationCommand } from '../commands/create-association.command';
import { AssociateService } from 'src/app/core/services/associate.service';
import { AssociationService } from 'src/app/core/services/association.service';

@Injectable()
export class DashboardFacade {
    @Select(DashboardState.ownedAssociations) public ownedAssociations$: Observable<Association[]>;
    @Select(DashboardState.joinedAssociations) public joinedAssociations$: Observable<Association[]>;

    public constructor(private store: Store, private dashboardService: DashboardService, private associateService: AssociateService, private associationService: AssociationService) { }

    public loadDashboard(): void {
        const accountId = this.store.selectSnapshot(AppState.accountId);
        this.dashboardService.getAssociateByAccountId(new GetAssociateByAccountIdQuery(accountId)).pipe(
            mergeMap((result: Associate) => {
                const action = new LoadAssociate(result);
                this.store.dispatch(action);
                return forkJoin(
                    this.associateService.getOwnedAssociations(new GetOwnedAssociationsQuery(result.id)),
                    this.associateService.getJoinedAssociation(new GetJoinedAssociationsQuery(result.id))
                );
            })
        ).subscribe((result: [Association[], Association[]]) => {
            const ownedAssociations = result[0];
            this.loadOwnedAssociations(ownedAssociations);

            const joinedAssociations = result[1];
            const loadJoinedAssociations = new LoadJoinedAssociations(joinedAssociations);
            this.store.dispatch(loadJoinedAssociations);
        });
    }

    public createAssociation($event: AssociationCreated): void {
        const associate = this.store.selectSnapshot(AppState.associate);
        const createAssociationCommand = new CreateAssociationCommand(associate.id, $event.name);
        this.associationService.createAssociation(createAssociationCommand).pipe(
            switchMap(() => this.associateService.getOwnedAssociations(new GetOwnedAssociationsQuery(associate.id)))
        ).subscribe((associations: Association[]) => this.loadOwnedAssociations(associations));
    }

    private loadOwnedAssociations(associations: Association[]): void {
        const loadOwnedAssociations = new LoadOwnedAssociations(associations);
        this.store.dispatch(loadOwnedAssociations);
    }
}