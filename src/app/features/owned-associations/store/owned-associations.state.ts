import {Association, AssociationDetail} from 'src/app/shared/models/associations/association.model';
import {Action, Selector, State, StateContext} from '@ngxs/store';
import {LoadAssociation, LoadOwnedAssociations} from './owned-associations.action';

export interface OwnedAssociationsStateModel {
    associations: Association[]
    association: AssociationDetail;
}

@State<OwnedAssociationsStateModel>({
    name: 'ownedAssociations',
    defaults: {
        associations: [],
        association: null,
    }
})
export class OwnedAssociationsState {
    @Selector()
    public static associations(model: OwnedAssociationsStateModel): Association[] {
        return model.associations;
    }

    @Selector()
    public static association(model: OwnedAssociationsStateModel): AssociationDetail {
        return model.association;
    }

    @Action(LoadOwnedAssociations)
    public loadOwnedAssociations(ctx: StateContext<OwnedAssociationsStateModel>, action: LoadOwnedAssociations): void {
        ctx.patchState({associations: action.associations});
    }

    @Action(LoadAssociation)
    public loadAssociation(ctx: StateContext<OwnedAssociationsStateModel>, action: LoadAssociation): void {
        ctx.patchState({association: action.association});
    }
}