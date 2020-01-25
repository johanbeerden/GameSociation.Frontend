import {Association, AssociationDetail} from 'src/app/shared/models/associations/association.model';
import {Action, Selector, State, StateContext} from '@ngxs/store';
import {LoadAssociation, LoadAssociations} from './associations.action';

export interface AssociationsStateModel {
    associations: Association[]
    association: AssociationDetail;
}

@State<AssociationsStateModel>({
    name: 'associations',
    defaults: {
        associations: [],
        association: null,
    }
})
export class AssociationsState {
    @Selector()
    public static associations(model: AssociationsStateModel): Association[] {
        return model.associations;
    }

    @Selector()
    public static association(model: AssociationsStateModel): AssociationDetail {
        return model.association;
    }

    @Action(LoadAssociations)
    public loadAssociations(ctx: StateContext<AssociationsStateModel>, action: LoadAssociations): void {
        ctx.patchState({associations: action.associations});
    }

    @Action(LoadAssociation)
    public loadAssociation(ctx: StateContext<AssociationsStateModel>, action: LoadAssociation): void {
        ctx.patchState({association: action.association});
    }
}