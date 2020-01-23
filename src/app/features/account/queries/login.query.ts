export class LoginQuery {
    public constructor(
        public email: string,
        public password: string
    ) { }
}

export interface LoginQueryResult {
    accountId: string;
    token: string;
}