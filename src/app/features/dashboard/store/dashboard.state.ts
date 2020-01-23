import { Association } from 'src/app/shared/models/associations/association.model';
import { State, Selector, Action, StateContext } from '@ngxs/store';
import { LoadJoinedAssociations, LoadOwnedAssociations } from './dashboard.action';

export interface DashboardStateModel {
    ownedAssociations: Association[];
    joinedAssociations: Association[];
}

@State<DashboardStateModel>({
    name: 'dashboard',
    defaults: {
        joinedAssociations: [],
        ownedAssociations: []
    }
})
export class DashboardState {
    @Selector()
    public static ownedAssociations(model: DashboardStateModel): Association[] {
        return model.ownedAssociations;
    }

    @Selector()
    public static joinedAssociations(model: DashboardStateModel): Association[] {
        return model.joinedAssociations;
    }

    @Action(LoadOwnedAssociations)
    public loadOwnedAssociations(ctx: StateContext<DashboardStateModel>, action: LoadOwnedAssociations): void {
        ctx.patchState({ ownedAssociations: action.ownedAssociations });
    }

    @Action(LoadJoinedAssociations)
    public loadJoinedAssociations(ctx: StateContext<DashboardStateModel>, action: LoadJoinedAssociations): void {
        ctx.patchState({ joinedAssociations: action.joinedAssociations });
    }
}