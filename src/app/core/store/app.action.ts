import { Associate } from 'src/app/shared/models/associations/associate.model';

export class Login {
    public static readonly type = '[App] Login';
    public constructor(
        public accountId: string
    ) { }
}

export class Logout {
    public static readonly type = '[App] Logout';
}

export class LoadAssociate {
    public static readonly type = '[App] Load associate';
    public constructor(
        public associate: Associate
    ) { }
}