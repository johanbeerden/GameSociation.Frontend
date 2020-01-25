import {Action, Selector, State, StateContext} from "@ngxs/store";
import {LoadInvitations} from "./invitations.action";
import {Invitation} from "../../../shared/models/associations/invitation.model";

export interface InvitationsStateModel {
    invitations: Invitation[];
}

@State<InvitationsStateModel>({
    name: 'invitations',
    defaults: {
        invitations: []
    }
})
export class InvitationsState {
    @Selector()
    public static invitations(model: InvitationsStateModel): Invitation[] {
        return model.invitations;
    }

    @Action(LoadInvitations)
    public loadInvitations(ctx: StateContext<InvitationsStateModel>, action: LoadInvitations): void {
        ctx.patchState({invitations: action.invitations});
    }
}