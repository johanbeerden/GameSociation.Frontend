import {Action, Selector, State, StateContext} from '@ngxs/store';
import {LoadInvitations, LoadJoinedAssociations, LoadOwnedAssociations} from './dashboard.action';
import {Association} from "../../../shared/models/associations/association.model";
import {Invitation} from "../../../shared/models/associations/invitation.model";

export interface DashboardStateModel {
    ownedAssociations: Association[];
    joinedAssociations: Association[];
    invitations: Invitation[];
}

@State<DashboardStateModel>({
    name: 'dashboard',
    defaults: {
        joinedAssociations: [],
        ownedAssociations: [],
        invitations: []
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

    @Selector()
    public static invitations(model: DashboardStateModel): Invitation[] {
        return model.invitations;
    }

    @Action(LoadOwnedAssociations)
    public loadOwnedAssociations(ctx: StateContext<DashboardStateModel>, action: LoadOwnedAssociations): void {
        ctx.patchState({ ownedAssociations: action.ownedAssociations });
    }

    @Action(LoadJoinedAssociations)
    public loadJoinedAssociations(ctx: StateContext<DashboardStateModel>, action: LoadJoinedAssociations): void {
        ctx.patchState({ joinedAssociations: action.joinedAssociations });
    }

    @Action(LoadInvitations)
    public loadInvitations(ctx: StateContext<DashboardStateModel>, action: LoadInvitations): void {
        ctx.patchState({invitations: action.invitations});
    }
}
