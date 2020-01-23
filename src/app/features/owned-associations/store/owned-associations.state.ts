import { Association } from 'src/app/shared/models/associations/association.model';
import { State, Selector, Action, StateContext } from '@ngxs/store';
import { LoadOwnedAssociations, LoadAssociation } from './owned-associations.action';

export interface OwnedAssociationsStateModel {
    associations: Association[]
    association: Association;
}

@State<OwnedAssociationsStateModel>({
    name: 'ownedAssociations',
    defaults: {
        associations: [],
        association: null
    }
})
export class OwnedAssociationsState {
    @Selector()
    public static associations(model: OwnedAssociationsStateModel): Association[] {
        return model.associations;
    }

    @Selector()
    public static association(model: OwnedAssociationsStateModel): Association {
        return model.association;
    }

    @Action(LoadOwnedAssociations)
    public loadOwnedAssociations(ctx: StateContext<OwnedAssociationsStateModel>, action: LoadOwnedAssociations): void {
        ctx.patchState({ associations: action.associations });
    }

    @Action(LoadAssociation)
    public loadAssociation(ctx: StateContext<OwnedAssociationsStateModel>, action: LoadAssociation): void {
        ctx.patchState({ association: action.association });
    }
}