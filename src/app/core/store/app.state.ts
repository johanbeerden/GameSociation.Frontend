import { State, Selector, Action, StateContext } from '@ngxs/store';
import { Login, Logout, LoadAssociate } from './app.action';
import { Associate } from 'src/app/shared/models/associations/associate.model';

export interface AppStateModel {
    accountId: string;
    associate: Associate;
}

@State<AppStateModel>({
    name: 'app',
    defaults: {
        accountId: null,
        associate: null
    }
})
export class AppState {
    @Selector()
    public static accountId(model: AppStateModel): string {
        return model.accountId;
    }

    @Selector()
    public static associate(model: AppStateModel): Associate {
        return model.associate;
    }

    @Selector()
    public static tag(model: AppStateModel): string {
        return `${model.associate.tag.username}#${model.associate.tag.number}`;
    }

    @Action(Login)
    public login(ctx: StateContext<AppStateModel>, action: Login): void {
        ctx.patchState({ accountId: action.accountId });
    }

    @Action(Logout)
    public logout(ctx: StateContext<AppStateModel>): void {
        ctx.patchState({ accountId: null, associate: null });
    }

    @Action(LoadAssociate)
    public loadAssociate(ctx: StateContext<AppStateModel>, action: LoadAssociate): void {
        ctx.patchState({ associate: action.associate });
    }
}